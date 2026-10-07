import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://xcellencedentalharidwar.com';

const STATIC_ROUTES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/doctors', priority: '0.9', changefreq: 'monthly' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/smile-gallery', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.7', changefreq: 'weekly' },
  { url: '/patient-forms', priority: '0.6', changefreq: 'monthly' },
  { url: '/pay-later', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/book-appointment', priority: '0.9', changefreq: 'weekly' },
];

const ENABLED_SERVICES = [
  'laser-dentistry',
  'implantology',
  'periodontics',
  'emergency-care',
  'cosmetic-dentistry',
  'restorative-dentistry',
  'oral-surgery',
  'endodontics',
  'general-dentistry',
  'other-specialties',
];

const BLOG_SLUGS = [
  'understanding-gum-health',
  'laser-dentistry-explained',
  'dental-implants-guide',
  'emergency-dental-care-tips',
];

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const route of STATIC_ROUTES) {
  xml += `  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
}

for (const slug of ENABLED_SERVICES) {
  xml += `  <url>
    <loc>${BASE_URL}/services/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

for (const slug of BLOG_SLUGS) {
  xml += `  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

xml += `</urlset>
`;

const publicDir = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`✅ Generated sitemap.xml with ${STATIC_ROUTES.length + ENABLED_SERVICES.length + BLOG_SLUGS.length} URLs at ${sitemapPath}`);
