import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const FILE_RE = /\.(tsx?|jsx?|html|vue|svelte|mdx?|css|scss)$/i;
const BAD_PATTERNS = [
  /\.\.\.\s*other services/i,                     // the fallback you see
  /categories\.otherServices\.title/i,            // typical leaked key
  /categories\.[A-Za-z0-9_.-]+\.title/i,
  /categories\.[A-Za-z0-9_.-]+\.description/i,
  /top\.[^\s'"]+\.title/i,                        // any other leaked top.* keys
  /top\.[^\s'"]+\.description/i,
];

function walk(dir: string, out: string[] = []) {
  try {
    for (const entry of fs.readdirSync(dir)) {
      const p = path.join(dir, entry);
      const stat = fs.statSync(p);
      if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules' && entry !== 'dist') {
        walk(p, out);
      } else if (FILE_RE.test(p)) {
        out.push(p);
      }
    }
  } catch (err) {
    // Skip directories we can't read
  }
  return out;
}

const files = walk(ROOT);
let hits = 0;

for (const f of files) {
  try {
    const txt = fs.readFileSync(f, 'utf8');
    for (const re of BAD_PATTERNS) {
      if (re.test(txt)) {
        console.log(`[i18n-leak] ${f} matches ${re}`);
        hits++;
      }
    }
  } catch (err) {
    // Skip files we can't read
  }
}

if (hits > 0) {
  console.error(`Found ${hits} potential i18n leaks/fallbacks.`);
  process.exit(1);
} else {
  console.log('No i18n leaks/fallbacks found ✅');
}
