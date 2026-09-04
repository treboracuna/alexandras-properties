#!/usr/bin/env node
// verify-packet.js <file> [expectedBytes] — packet/work-order transport check.
// Prints byte count; verifies END OF WORK ORDER marker when the file is a WO
// (filename starts with wo-); fails on byte mismatch when expectedBytes given.
// Exit 0 = pass. Exit 1 = fail.
const fs = require('fs'), path = require('path');
const f = process.argv[2], expected = process.argv[3] ? parseInt(process.argv[3], 10) : null;
if (!f) { console.error('usage: node verify-packet.js <file> [expectedBytes]'); process.exit(2); }
const b = fs.readFileSync(f);
console.log(`file=${f} bytes=${b.length}`);
let ok = true;
if (expected !== null) {
  const m = b.length === expected;
  console.log(`expected=${expected} match=${m}`);
  if (!m) ok = false;
}
if (path.basename(f).toLowerCase().startsWith('wo-')) {
  const hasMarker = b.toString('utf8').trimEnd().endsWith('END OF WORK ORDER');
  console.log(`end_marker_present=${hasMarker}`);
  if (!hasMarker) ok = false;
}
console.log(ok ? 'RESULT: pass' : 'RESULT: FAIL — do not act on this file');
process.exit(ok ? 0 : 1);
