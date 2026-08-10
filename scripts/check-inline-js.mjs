// Syntax-checks every inline <script> block in index.html without executing it.
// This catches typos/parse errors that html-validate cannot see inside <script>.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];

if (scripts.length === 0) {
  console.error('ERROR: no <script> block found in index.html');
  process.exit(1);
}

let failed = 0;
for (const [i, match] of scripts.entries()) {
  try {
    new vm.Script(match[1], { filename: `index.html#script-${i + 1}` });
    console.log(`OK  script #${i + 1}`);
  } catch (err) {
    failed = 1;
    console.error(`FAIL script #${i + 1}: ${err.message}`);
  }
}

if (failed) process.exit(1);
console.log(`All ${scripts.length} inline script block(s) parse cleanly.`);
