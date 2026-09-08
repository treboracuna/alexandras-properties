// Behavioural test for the #074 tracking gate.
// Reads the tag-074 block straight out of the live index.html and runs it in a
// context where `window` IS the global object, the way a browser does. A harness
// that passes `window` in as a plain parameter reports a false failure, because
// `window.dataLayer=[]` then never creates the bare global that Google's own
// snippet relies on. Run: node scripts/gate-test.js
const fs = require('fs'), vm = require('vm'), path = require('path');

const ROOT = path.join(__dirname, '..');
const GA4 = 'G-SMVYSPDR8R';
const PIXEL = '1590700245773257';

const page = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const m = page.match(/<script id="tag-074">([\s\S]*?)<\/script>/);
if (!m) { console.error('gate-test: FAIL - no tag-074 block in index.html'); process.exit(1); }
const CODE = m[1];

function run(opts) {
  const appended = [];
  const firstScript = { parentNode: { insertBefore: (t) => appended.push(t.src) } };
  const doc = {
    createElement: () => ({}),
    head: { appendChild: (e) => appended.push(e.src) },
    getElementsByTagName: () => [firstScript]
  };
  const store = opts.stored ? { acuna_optout: '1' } : {};
  const ctx = vm.createContext({});
  vm.runInContext('globalThis.window=globalThis;', ctx);
  ctx.document = doc;
  ctx.navigator = opts.gpc ? { globalPrivacyControl: true } : {};
  ctx.localStorage = { getItem: (k) => (k in store ? store[k] : null) };
  vm.runInContext(CODE, ctx);
  return {
    scripts: appended,
    gaDisabled: ctx['ga-disable-' + GA4] === true,
    dataLayer: ctx.dataLayer ? ctx.dataLayer.map((a) => Array.from(a)[0]) : [],
    ga4id: ctx.dataLayer ? (Array.from(ctx.dataLayer[1] || [])[1] || '') : '',
    fbq: ctx.fbq && ctx.fbq.queue ? ctx.fbq.queue.map((a) => Array.from(a).join(' ')) : []
  };
}

let fail = 0, total = 0;
function check(label, cond) { total++; console.log((cond ? '  PASS  ' : '  FAIL  ') + label); if (!cond) fail++; }

const CASES = [
  ['Global Privacy Control on', { gpc: true, stored: false }],
  ['opted out via localStorage', { gpc: false, stored: true }],
  ['default, measurement allowed', { gpc: false, stored: false }]
];

for (const [name, o] of CASES) {
  const r = run(o);
  console.log('\n[' + name + ']');
  console.log('  external scripts requested: ' + r.scripts.length + '  ' + JSON.stringify(r.scripts));
  console.log('  ga-disable flag: ' + r.gaDisabled);
  console.log('  dataLayer commands: ' + JSON.stringify(r.dataLayer) + '   ga4 id: ' + r.ga4id);
  console.log('  fbq calls: ' + JSON.stringify(r.fbq));
  if (o.gpc || o.stored) {
    check('no external script requested', r.scripts.length === 0);
    check('ga-disable set true', r.gaDisabled === true);
    check('no dataLayer commands', r.dataLayer.length === 0);
    check('fbq never called', r.fbq.length === 0);
  } else {
    check('two external scripts requested', r.scripts.length === 2);
    check('gtag.js requested', r.scripts.some((s) => s && s.indexOf('googletagmanager.com/gtag/js?id=' + GA4) > -1));
    check('fbevents.js requested', r.scripts.some((s) => s && s.indexOf('connect.facebook.net') > -1));
    check('gtag js + config queued', r.dataLayer.join(',') === 'js,config');
    check('config carries the right GA4 id', r.ga4id === GA4);
    check('fbq init + PageView', r.fbq.join('|') === 'init ' + PIXEL + '|track PageView');
    check('ga-disable not set', r.gaDisabled === false);
  }
}

console.log('\nGATE SUITE: ' + (total - fail) + '/' + total + (fail ? ' - ' + fail + ' FAILING' : ' GREEN'));
process.exit(fail ? 1 : 0);
