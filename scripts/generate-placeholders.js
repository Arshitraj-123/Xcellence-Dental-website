import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const casesDir = path.join(__dirname, '..', 'public', 'images', 'cases');
if (!fs.existsSync(casesDir)) {
  fs.mkdirSync(casesDir, { recursive: true });
}

const cases = [
  { name: 'whitening', label: 'Teeth Whitening Case', beforeColor: '#EADBBE', afterColor: '#FFFFFF' },
  { name: 'veneers', label: 'Porcelain Veneers Case', beforeColor: '#E8D4B4', afterColor: '#FAF6EE' },
  { name: 'bonding', label: 'Composite Bonding Case', beforeColor: '#EADBBE', afterColor: '#FCF7E8' },
  { name: 'implants', label: 'Dental Implants Case', beforeColor: '#DFD5C4', afterColor: '#FFFFFF' },
  { name: 'crowns', label: 'Ceramic Crowns Case', beforeColor: '#E2D3B8', afterColor: '#FAF6EE' },
  { name: 'rehab', label: 'Full Smile Rehabilitation', beforeColor: '#DAC7A4', afterColor: '#FFFFFF' },
];

function generateSvgPlaceholder(title, subtitle, toothFill, isBefore) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A1620"/>
      <stop offset="100%" stop-color="#1A0D14"/>
    </linearGradient>
    <filter id="drop" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="600" height="450" fill="url(#bg)"/>

  <!-- Decorative arch frame -->
  <path d="M 50 400 L 50 160 A 250 250 0 0 1 550 160 L 550 400 Z" fill="#FBF8F2" fill-opacity="0.04" stroke="#C19A5B" stroke-width="1.5" stroke-opacity="0.3"/>

  <!-- Badge -->
  <rect x="230" y="45" width="140" height="30" rx="15" fill="${isBefore ? '#8C2F4B' : '#C19A5B'}" filter="url(#drop)"/>
  <text x="300" y="65" text-anchor="middle" fill="#FFFFFF" font-family="'Hanken Grotesk', sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">${isBefore ? 'BEFORE TREATMENT' : 'AFTER OUTCOME'}</text>

  <!-- Illustrated teeth row -->
  <g transform="translate(180, 130)" filter="url(#drop)">
    <rect x="0" y="40" width="240" height="40" rx="10" fill="#F3DFDA" opacity="0.6"/>
    <!-- Tooth 1 -->
    <path d="M 20 20 C 20 60 25 80 40 85 C 55 80 60 60 60 20 Z" fill="${toothFill}" stroke="#6B6168" stroke-width="2"/>
    <!-- Tooth 2 -->
    <path d="M 70 15 C 70 65 78 90 95 95 C 112 90 120 65 120 15 Z" fill="${toothFill}" stroke="#6B6168" stroke-width="2"/>
    <!-- Tooth 3 -->
    <path d="M 125 15 C 125 65 133 90 150 95 C 167 90 175 65 175 15 Z" fill="${toothFill}" stroke="#6B6168" stroke-width="2"/>
    <!-- Tooth 4 -->
    <path d="M 185 20 C 185 60 190 80 205 85 C 220 80 225 60 225 20 Z" fill="${toothFill}" stroke="#6B6168" stroke-width="2"/>
    <!-- Smile arc line -->
    <path d="M 15 55 Q 120 110 230 55" fill="none" stroke="#A67C3A" stroke-width="3.5" stroke-linecap="round"/>
  </g>

  <!-- Labels -->
  <text x="300" y="320" text-anchor="middle" fill="#FBF8F2" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="700">${title}</text>
  <text x="300" y="355" text-anchor="middle" fill="#C19A5B" font-family="'Hanken Grotesk', sans-serif" font-size="13" font-weight="500">${subtitle}</text>
  <text x="300" y="385" text-anchor="middle" fill="#6B6168" font-family="'Hanken Grotesk', sans-serif" font-size="11">Clinical Photo Placeholder · Xcellence Dental Clinic Haridwar</text>
</svg>`;
}

cases.forEach((c) => {
  const beforeSvg = generateSvgPlaceholder(c.label, 'Pre-Procedure Clinical Evaluation', c.beforeColor, true);
  const afterSvg = generateSvgPlaceholder(c.label, 'Post-Treatment Clinical Result', c.afterColor, false);

  // Write placeholder names ending in -placeholder
  fs.writeFileSync(path.join(casesDir, `${c.name}-before-placeholder.svg`), beforeSvg);
  fs.writeFileSync(path.join(casesDir, `${c.name}-after-placeholder.svg`), afterSvg);

  // Also write default paths matching gallery.ts references
  fs.writeFileSync(path.join(casesDir, `${c.name}-before.svg`), beforeSvg);
  fs.writeFileSync(path.join(casesDir, `${c.name}-after.svg`), afterSvg);
  fs.writeFileSync(path.join(casesDir, `${c.name}-before.jpg`), beforeSvg);
  fs.writeFileSync(path.join(casesDir, `${c.name}-after.jpg`), afterSvg);
});

// Doctor and Clinic Placeholders ending in -placeholder
const doctorsDir = path.join(__dirname, '..', 'public', 'images', 'doctors');
function generateDoctorPlaceholder(name, credentials) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600" width="100%" height="100%">
  <defs>
    <linearGradient id="docBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A1620"/>
      <stop offset="100%" stop-color="#1A0D14"/>
    </linearGradient>
  </defs>
  <rect width="500" height="600" fill="url(#docBg)"/>
  <circle cx="250" cy="220" r="100" fill="#FBF8F2" fill-opacity="0.1" stroke="#C19A5B" stroke-width="2"/>
  <path d="M 170 460 C 170 340 330 340 330 460 Z" fill="#FBF8F2" fill-opacity="0.15" stroke="#C19A5B" stroke-width="2"/>
  <text x="250" y="510" text-anchor="middle" fill="#FBF8F2" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="700">${name}</text>
  <text x="250" y="540" text-anchor="middle" fill="#C19A5B" font-family="'Hanken Grotesk', sans-serif" font-size="13">${credentials}</text>
  <text x="250" y="570" text-anchor="middle" fill="#6B6168" font-family="'Hanken Grotesk', sans-serif" font-size="11">Official Portrait Placeholder · Xcellence Dental Clinic</text>
</svg>`;
}

fs.writeFileSync(path.join(doctorsDir, 'himanshi-sharma-placeholder.svg'), generateDoctorPlaceholder('Dr. Himanshi Sharma', 'BDS, MDS (Periodontics & Implantology)'));
fs.writeFileSync(path.join(doctorsDir, 'shailesh-sharma-placeholder.svg'), generateDoctorPlaceholder('Dr. Shailesh Sharma', 'BDS, Certified Laser Dentistry & Implantology'));

const imagesDir = path.join(__dirname, '..', 'public', 'images');
function generateClinicPlaceholder(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#2A1620"/>
  <rect x="20" y="20" width="760" height="460" rx="16" fill="#FBF8F2" fill-opacity="0.05" stroke="#C19A5B" stroke-width="1.5"/>
  <text x="400" y="240" text-anchor="middle" fill="#FBF8F2" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="700">${title}</text>
  <text x="400" y="280" text-anchor="middle" fill="#C19A5B" font-family="'Hanken Grotesk', sans-serif" font-size="16">${subtitle}</text>
  <text x="400" y="320" text-anchor="middle" fill="#6B6168" font-family="'Hanken Grotesk', sans-serif" font-size="12">Clinic Interior & Facility Placeholder</text>
</svg>`;
}

fs.writeFileSync(path.join(imagesDir, 'clinic-interior-placeholder.svg'), generateClinicPlaceholder('Clinic Operatory & Facility', 'Ranipur More, Haridwar'));
fs.writeFileSync(path.join(imagesDir, 'hero-family-placeholder.svg'), generateClinicPlaceholder('Family Smile & Specialist Care', '45+ Years Caring for Haridwar'));

console.log('✅ Generated all dental case, doctor, and clinic placeholder images ending in -placeholder');

