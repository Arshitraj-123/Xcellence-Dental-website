import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'artifacts-screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: '320_portrait', width: 320, height: 640 },
  { name: '360_portrait', width: 360, height: 740 },
  { name: '390_portrait', width: 390, height: 844 },
  { name: '844_landscape', width: 844, height: 390 },
  { name: '414_portrait', width: 414, height: 896 },
  { name: '896_landscape', width: 896, height: 414 },
  { name: '768_tablet', width: 768, height: 1024 },
  { name: '1024_desktop', width: 1024, height: 768 },
  { name: '1280_desktop', width: 1280, height: 800 },
  { name: '1440_desktop', width: 1440, height: 900 },
];

const ROUTES = [
  '/',
  '/about',
  '/doctors',
  '/services',
  '/services/laser-dentistry',
  '/smile-gallery',
  '/blog',
  '/patient-forms',
  '/pay-later',
  '/contact',
  '/book-appointment',
  '/404',
];

async function runAudit() {
  console.log('🚀 Starting Comprehensive Responsive & Quality Audit...\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  const issues = [];
  const linkCheckResults = { checked: 0, broken: [] };

  // 1. Audit viewports on Home
  console.log('📱 Auditing Breakpoints on Homepage (/)...');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 15000 });

    // Check horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalOverflow) {
      issues.push(`Homepage has horizontal overflow at ${vp.width}x${vp.height}`);
    }

    // Check Logo size & tap target
    const logoMetrics = await page.evaluate(() => {
      const logoLink = document.querySelector('header a[href="/"]');
      if (!logoLink) return null;
      const rect = logoLink.getBoundingClientRect();
      const img = logoLink.querySelector('img, svg');
      return {
        tapWidth: rect.width,
        tapHeight: rect.height,
        imgWidth: img ? img.getBoundingClientRect().width : null,
        imgHeight: img ? img.getBoundingClientRect().height : null,
      };
    });

    if (logoMetrics) {
      if (logoMetrics.tapWidth < 44 || logoMetrics.tapHeight < 44) {
        issues.push(`Logo tap target is under 44px at ${vp.width}px (${Math.round(logoMetrics.tapWidth)}x${Math.round(logoMetrics.tapHeight)}px)`);
      }
    }

    // Check hero fold position on phones (<= 414px)
    if (vp.width <= 414 && vp.height > vp.width) {
      const heroMetrics = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const cta = document.querySelector('a[href="/book-appointment"]');
        return {
          h1Top: h1 ? h1.getBoundingClientRect().top : null,
          ctaTop: cta ? cta.getBoundingClientRect().top : null,
          windowHeight: window.innerHeight,
        };
      });

      if (heroMetrics.h1Top && heroMetrics.h1Top > heroMetrics.windowHeight) {
        issues.push(`H1 is pushed below the fold at ${vp.width}x${vp.height} (top: ${heroMetrics.h1Top}px vs viewport: ${heroMetrics.windowHeight}px)`);
      }
      if (heroMetrics.ctaTop && heroMetrics.ctaTop > heroMetrics.windowHeight) {
        issues.push(`Primary CTA is pushed below the fold at ${vp.width}x${vp.height} (top: ${heroMetrics.ctaTop}px vs viewport: ${heroMetrics.windowHeight}px)`);
      }
    }

    // Capture screenshot
    const shotPath = path.join(SCREENSHOTS_DIR, `home_${vp.name}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
  }

  // 2. Audit routes at 390px (mobile) and 1280px (desktop)
  console.log('\n📄 Auditing All Routes & Capturing Screenshots...');
  for (const route of ROUTES) {
    const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');

    // Mobile 390px
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('h1', { timeout: 4000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${slug}_mobile_390.png`), fullPage: false });

    // Desktop 1280px
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('h1', { timeout: 4000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${slug}_desktop_1280.png`), fullPage: false });

    // Accessibility & SEO checks on route
    const a11yChecks = await page.evaluate((r) => {
      const errs = [];
      const h1Count = document.querySelectorAll('h1').length;
      if (h1Count === 0) errs.push(`Route ${r} is missing an <h1> element`);
      if (h1Count > 1) errs.push(`Route ${r} has multiple (${h1Count}) <h1> elements`);

      const hasMain = !!document.querySelector('main, [role="main"]');
      if (!hasMain) errs.push(`Route ${r} is missing a <main> landmark`);

      const imgs = Array.from(document.querySelectorAll('img:not([aria-hidden="true"])'));
      imgs.forEach((img) => {
        if (!img.hasAttribute('alt')) {
          errs.push(`Image without alt attribute on route ${r}: ${img.src}`);
        }
      });
      return errs;
    }, route);

    issues.push(...a11yChecks);

    // Check images for overflow or broken sizing
    const imageIssues = await page.evaluate((r) => {
      const list = [];
      const imgs = Array.from(document.querySelectorAll('img'));
      imgs.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.width > window.innerWidth + 2) {
          list.push(`Image ${img.src} overflows viewport width on route ${r}`);
        }
      });
      return list;
    }, route);

    issues.push(...imageIssues);
  }

  // 3. Test Drawer Open/Close on mobile (390px)
  console.log('\n🍔 Testing Mobile Drawer Navigation...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });

  const drawerButton = await page.$('header button[aria-label*="menu" i], header button[aria-label*="drawer" i], header button[aria-label*="navigation" i]');
  if (drawerButton) {
    await drawerButton.click();
    await new Promise((r) => setTimeout(r, 600)); // wait for transition
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'drawer_open_mobile_390.png') });
    console.log('   Captured mobile drawer open state.');
  } else {
    console.log('   Note: Drawer toggle button selector check.');
  }

  // 4. Test Internal Links
  console.log('\n🔗 Auditing Internal Links...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const internalHrefs = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href]'));
    const hrefs = new Set();
    links.forEach((a) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#')) {
        hrefs.add(href.split('#')[0]);
      }
    });
    return Array.from(hrefs);
  });

  for (const href of internalHrefs) {
    linkCheckResults.checked++;
    const response = await page.goto(`${BASE_URL}${href}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    const is404 = await page.evaluate(() => {
      return document.title.includes('404') || document.body.innerText.includes('Page Not Found');
    });

    if (response.status() >= 400 || (is404 && href !== '/404' && href !== '/404.html')) {
      linkCheckResults.broken.push({ href, status: response.status() });
      issues.push(`Broken link found: ${href} (Status: ${response.status()}, 404 text: ${is404})`);
    }
  }

  await browser.close();

  console.log('\n=============================================');
  console.log('📊 AUDIT SUMMARY');
  console.log('=============================================');
  console.log(`Internal Links Checked: ${linkCheckResults.checked}`);
  console.log(`Broken Links: ${linkCheckResults.broken.length}`);
  console.log(`Responsive/Quality Issues: ${issues.length}`);

  if (issues.length > 0) {
    console.log('\nIssues detected:');
    issues.forEach((iss) => console.log(`  ⚠️  ${iss}`));
  } else {
    console.log('\n✅ ALL RESPONSIVE, LOGO, IMAGE, AND LINK CHECKS PASSED PERFECTLY!');
  }

  console.log(`\nScreenshots saved to: ${SCREENSHOTS_DIR}`);
}

runAudit().catch((err) => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
