/**
 * Content Audit Script for Xcellence Dental Clinic.
 *
 * Scans all source files in src/ for banned terms from Prompt 0 removal rules:
 * - Insurance references (insurance, PPO, Medicaid)
 * - Lab / in-house milling claims (Sirona, CEREC, milled on site, no lab, same-day crown, etc.)
 * - Old US clinic legacy content (Bethesda, Laurel, Cedar Lane, Maryland, MSDA, Samad, Zebe, HIPAA, 24/7, Invisalign, $ prices, old phones)
 *
 * Exits with code 1 if any banned term is found; 0 if all clean.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.resolve(__dirname, '../src');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const INDEX_HTML = path.resolve(__dirname, '../index.html');

const BANNED_PATTERNS = [
  { name: 'insurance', regex: /\binsurance\b/i },
  { name: 'PPO', regex: /\bppo\b/i },
  { name: 'Medicaid', regex: /\bmedicaid\b/i },
  { name: 'Sirona', regex: /\bsirona\b/i },
  { name: 'CEREC', regex: /\bcerec\b/i },
  { name: 'milled on site', regex: /\bmilled\s+on\s*site\b/i },
  { name: 'no lab', regex: /\bno\s+lab\b/i },
  { name: 'same-day crown', regex: /\bsame-?day\s+crown\b/i },
  { name: 'single-visit crown', regex: /\bsingle-?visit\s+crown\b/i },
  { name: 'same-day veneer', regex: /\bsame-?day\s+veneer\b/i },
  { name: 'no temporary crown', regex: /\bno\s+temporary\s+crown\b/i },
  { name: 'scan, design, mill', regex: /scan,\s*design,\s*mill/i },
  { name: 'Bethesda', regex: /\bbethesda\b/i },
  { name: 'Laurel', regex: /\blaurel\b/i },
  { name: 'Cedar Lane', regex: /\bcedar\s+lane\b/i },
  { name: 'Maryland', regex: /\bmaryland\b/i },
  { name: 'MSDA', regex: /\bmsda\b/i },
  { name: 'Samad', regex: /\bsamad\b/i },
  { name: 'Zebe', regex: /\bzebe\b/i },
  { name: 'University of Maryland', regex: /university\s+of\s+maryland/i },
  { name: '5 stars claim', regex: /\b5\s+stars\b/i },
  { name: 'Se habla', regex: /se\s+habla/i },
  { name: 'Español', regex: /español|espanol/i },
  { name: 'HIPAA', regex: /\bhipaa\b/i },
  { name: '24/7 claim', regex: /\b24\/7\b/i },
  { name: 'Invisalign', regex: /\binvisalign\b/i },
  { name: 'Dollar price ($)', regex: /\$[0-9]+/ },
  { name: 'Old US phone (301)', regex: /\b301-[0-9]{3}/ },
  { name: 'Old US phone (240)', regex: /\b240-[0-9]{3}/ },
];

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(ts|tsx|js|jsx|css|html|xml|txt|json)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

console.log('🔍 Running Content Audit on src/, public/, and index.html...\n');

let files = getFiles(SRC_DIR).concat(getFiles(PUBLIC_DIR));
if (fs.existsSync(INDEX_HTML)) {
  files.push(INDEX_HTML);
}
let totalViolations = 0;
const violationsByFile = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.regex.test(line)) {
        totalViolations++;
        violationsByFile.push({
          file: path.relative(SRC_DIR, file),
          line: lineNum + 1,
          rule: pattern.name,
          preview: line.trim().slice(0, 100),
        });
      }
    }
  }
}

if (totalViolations > 0) {
  console.error(`❌ Content Audit FAILED with ${totalViolations} violation(s):\n`);
  for (const v of violationsByFile) {
    console.error(`  [${v.rule}] ${v.file}:${v.line} -> "${v.preview}"`);
  }
  console.error('\nPlease remove all banned terms from src/ before proceeding.');
  process.exit(1);
} else {
  console.log(`✅ Content Audit PASSED! (${files.length} files scanned in src/, 0 violations found)`);
  console.log('   All banned terms from Prompt 0 removal rules are completely absent from src/.');
  process.exit(0);
}
