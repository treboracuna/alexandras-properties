import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

// Injects the deploying commit SHA into every page at build time.
// Vercel sets VERCEL_GIT_COMMIT_SHA automatically on every deployment.
// Run locally and it stamps "local", which is itself a useful signal.

const SHA = process.env.VERCEL_GIT_COMMIT_SHA || 'local';
const PLACEHOLDER = '__BUILD_SHA__';

const files = readdirSync('.').filter(f => f.endsWith('.html'));
if (files.length === 0) {
  console.error('stamp: FAIL - no .html files at repo root');
  process.exit(1);
}

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const hits = src.split(PLACEHOLDER).length - 1;
  if (hits !== 1) {
    // Fail the build rather than deploy a page whose stamp cannot be trusted.
    console.error(`stamp: FAIL - ${f} has ${hits} ${PLACEHOLDER} placeholder(s), expected exactly 1`);
    process.exit(1);
  }
  writeFileSync(f, src.split(PLACEHOLDER).join(SHA), 'utf8');
  console.log(`stamp: ${f} -> ${SHA.slice(0, 7)}`);
}
console.log(`stamp: OK - ${files.length} file(s) stamped with ${SHA}`);
