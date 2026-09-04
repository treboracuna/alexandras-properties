#!/usr/bin/env node
// check-crlf.js <file> — byte-level line-ending audit. MSYS grep/file are unreliable
// for this on Windows (text-mode CR stripping); this is the authoritative check.
// Exit 0 = clean CRLF throughout. Exit 1 = mixed or bare-LF (details printed).
const fs = require('fs');
const f = process.argv[2];
if (!f) { console.error('usage: node check-crlf.js <file>'); process.exit(2); }
const b = fs.readFileSync(f);
let lf = 0, crlf = 0, bareLf = 0, bareCr = 0;
for (let i = 0; i < b.length; i++) {
  if (b[i] === 0x0a) { lf++; if (i > 0 && b[i-1] === 0x0d) crlf++; else bareLf++; }
  else if (b[i] === 0x0d && b[i+1] !== 0x0a) bareCr++;
}
const endsNewline = b.length > 0 && b[b.length-1] === 0x0a;
console.log(`file=${f} bytes=${b.length}`);
console.log(`LF_total=${lf} CRLF=${crlf} bare_LF=${bareLf} bare_CR=${bareCr} ends_with_newline=${endsNewline}`);
if (bareLf === 0 && bareCr === 0 && endsNewline) { console.log('RESULT: clean CRLF'); process.exit(0); }
console.log('RESULT: NOT clean CRLF'); process.exit(1);
