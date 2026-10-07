# 🦷 Xcellence Dental Clinic — Official Website

<div align="center">

**Modern, high-performance dental clinic website for Xcellence Dental Clinic, Haridwar**

Built with **React 18** · **TypeScript** · **Vite** · **TailwindCSS** · **Framer Motion**

[Live Preview](#deployment) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Customization Guide](#-how-to-edit-content)

</div>

---

## ✨ Features

| Feature | Description |
|:---|:---|
| ⚡ **Blazing Fast** | Vite-powered dev server with HMR, optimized production builds |
| 📱 **Fully Responsive** | Pixel-perfect from 320px phones to 1440px+ desktops |
| 🎨 **Premium Design** | Custom design system with dental-themed tokens (clove, brass, enamel, pomegranate) |
| 🦷 **10 Motion Animations** | Hardware-accelerated Framer Motion — tooth loader, shade guide, enamel shine, smile dividers |
| ♿ **Accessible** | ARIA landmarks, keyboard navigation, screen reader support, reduced motion toggle |
| 🔍 **SEO Optimized** | React Helmet for meta tags, semantic HTML, sitemap.xml, robots.txt |
| 📋 **Smart Forms** | WhatsApp/Email/Call fallback (no fake submissions), ready for backend API |
| 🗺️ **Interactive Tooth Map** | SVG dental arch — tap a tooth to discover matching treatments |
| 🖼️ **Before/After Gallery** | Touch, pointer, and keyboard-accessible comparison slider |
| 📝 **Blog Engine** | Data-driven articles with reading time, categories, and key takeaways |

---

## 🏥 Clinic Information

| Detail | Value |
|:---|:---|
| **Clinic** | Xcellence Dental Clinic |
| **Location** | Old Ranipur More, Opp. Reliance Trendz, Haridwar – 249407, Uttarakhand |
| **Phone** | +91 96433 65651 |
| **Email** | xcellencedentalharidwar@gmail.com |
| **Hours** | 10:00 AM – 9:00 PM (Open daily) |
| **Heritage** | 45+ years caring for Haridwar families |

### Clinical Leadership

| Doctor | Credentials | Specialties |
|:---|:---|:---|
| **Dr Himanshi Sharma** | BDS, MDS | Periodontist & Implantologist |
| **Dr Shailesh Sharma** | Certified Laser Dentist | Laser Dentistry & Implantology |

**Flagship Specialties:** Laser Dentistry · Dental Implants · Periodontics

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x ([Download](https://nodejs.org/))
- **npm** ≥ 9.x (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Arshitraj-123/Xcellence-Dental-website.git
cd Xcellence-Dental-website

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The dev server starts at **http://localhost:3000** with hot module replacement.

### Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Generate sitemap + TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run audit:content` | Scan for banned/legacy terms in source code |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |
| `npm run placeholders` | Generate SVG placeholder images |

### Environment Variables (Optional)

Copy `.env.example` to `.env.local` to customize:

```bash
cp .env.example .env.local
```

| Variable | Default | Purpose |
|:---|:---|:---|
| `VITE_WHATSAPP_NUMBER` | `919643365651` | WhatsApp business number for form fallback |
| `VITE_FORM_ENDPOINT` | *(empty)* | Set to API URL to enable direct form submission |
| `VITE_GA_ID` | *(empty)* | Google Analytics measurement ID |

> **Note:** When `VITE_FORM_ENDPOINT` is not set, forms open a "Review & Send" dialog with WhatsApp, Email, and Call options — no fake submissions.

---

## 📁 Project Structure

```
├── public/
│   ├── _redirects              # Netlify SPA routing
│   ├── robots.txt              # Crawler directives + sitemap
│   ├── sitemap.xml             # Auto-generated XML sitemap
│   ├── favicon.svg             # Tooth favicon
│   ├── icons/                  # App icons
│   └── images/                 # All static images
│       ├── doctors/            # Doctor portraits (.jpg)
│       ├── cases/              # Before/after gallery photos
│       └── ...                 # Hero, clinic, team photos
│
├── scripts/
│   ├── audit-content.js        # Banned term scanner
│   ├── generate-sitemap.js     # Sitemap generator
│   └── generate-placeholders.js# SVG placeholder generator
│
├── src/
│   ├── App.tsx                 # Routes, code-splitting, redirects
│   ├── main.tsx                # React root mount
│   ├── components/
│   │   ├── common/             # Logo, Badge, Button, SEO
│   │   ├── forms/              # Booking, contact, patient forms
│   │   ├── gallery/            # Before/After slider
│   │   ├── layout/             # Header, Footer, Drawer, Loader
│   │   ├── motion/             # 10 animation components
│   │   ├── sections/           # Reusable page sections
│   │   ├── services/           # ToothMap, service templates
│   │   └── ui/                 # Accordion, Card, Container, Img
│   ├── data/                   # ⭐ All clinic content lives here
│   │   ├── clinic.ts           # Address, phone, hours, map
│   │   ├── doctors.ts          # Doctor profiles & credentials
│   │   ├── services.ts         # 10 dental services + FAQs
│   │   ├── gallery.ts          # Smile gallery cases
│   │   ├── blog.ts             # Patient education articles
│   │   └── nav.ts              # Navigation structure
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities (format, form, motion)
│   ├── pages/                  # Route pages
│   │   ├── Home.tsx            # Homepage
│   │   ├── NotFoundPage.tsx    # Custom 404
│   │   ├── about/              # About, Doctors, Gallery, Blog
│   │   ├── services/           # Services overview + detail
│   │   ├── patients/           # Forms, Pay Later/EMI
│   │   └── contact/            # Contact, Book Appointment
│   └── styles/                 # Tailwind config, CSS variables
│
├── .env.example                # Environment variable template
├── tailwind.config.js          # Custom dental theme tokens
├── vite.config.ts              # Vite configuration
├── vercel.json                 # Vercel SPA routing
└── package.json
```

---

## 🗺️ Routes

| Route | Page | Description |
|:---|:---|:---|
| `/` | Home | Hero, trust strip, services, doctors, CTAs |
| `/about` | About Us | Clinic story, values, first visit guide |
| `/doctors` | Our Doctors | Doctor profiles with animated switcher |
| `/smile-gallery` | Smile Gallery | Before/after slider with filter chips |
| `/blog` | Blog | Dental wellness articles |
| `/blog/:slug` | Article | Individual blog post |
| `/services` | All Services | Interactive ToothMap + service grid |
| `/services/:slug` | Service Detail | Rich service page with FAQs |
| `/patient-forms` | Patient Forms | Pre-visit intake form |
| `/pay-later` | Pay Later / EMI | Payment plan enquiry |
| `/contact` | Contact | Map, directions, contact form |
| `/book-appointment` | Book Appointment | Multi-step booking wizard |
| `*` | 404 | Branded not-found page |

> Legacy `.html` URLs from the old website automatically redirect to their new routes.

---

## ✏️ How to Edit Content

All clinic content is in **typed TypeScript data files** under `src/data/`. You never need to touch JSX templates to update text.

### Quick Edits

| What to change | File to edit |
|:---|:---|
| Address, phone, hours, email | `src/data/clinic.ts` |
| Doctor names, bios, photos | `src/data/doctors.ts` |
| Add/edit/disable services | `src/data/services.ts` |
| Gallery cases | `src/data/gallery.ts` |
| Blog articles | `src/data/blog.ts` |
| Navigation links | `src/data/nav.ts` |

### Swapping Doctor Photos

1. Save the new photo as `public/images/doctors/himanshi-sharma.jpg` or `shailesh-sharma.jpg`
2. The `<Img />` component automatically picks up the new photo
3. Recommended: 3:4 aspect ratio, face centered in upper third

### Adding a New Service

1. Add a new entry in `src/data/services.ts` with `enabled: true`
2. The service automatically appears in navigation, routes, sitemap, and service pages
3. Set `flagship: true` for featured placement

### After Editing Content

Always run the content audit to catch any mistakes:

```bash
npm run audit:content
```

---

## 🎭 Motion & Animation

The site features **10 custom motion components**, all hardware-accelerated (GPU only: `transform` + `opacity`):

1. **ToothLoader** — Branded SVG splash with stroke-draw and sparkle
2. **EnamelShine** — Diagonal gloss sweep on hero headlines and buttons
3. **ShadeGuide** — Interactive dental shade picker (keyboard + touch)
4. **SmileDivider** — Scroll-driven smile curve section dividers
5. **FlossProgress** — Header scroll indicator with travelling tooth
6. **ServiceIconMotion** — Per-service micro-animations (laser beam, implant post, gum wave)
7. **ToothMap** — Interactive SVG dental arch
8. **AppointmentProgressTeeth** — Booking wizard step indicator
9. **Utility Animations** — CountUp, StaggerReveal, MagneticButton, ParallaxImage
10. **PageTransition** — Curved smile wipe between routes

### Reduced Motion Support

- Automatically respects OS `prefers-reduced-motion: reduce`
- Global **"Reduce motion"** toggle in the footer
- All animations gracefully fall back to static states

---

## 🔧 Backend Integration

The site is **100% functional today** without a backend. Forms use a "Review & Send" dialog with real communication channels.

### Connecting a Backend (When Ready)

Only **2 files** need to change:

**Step 1:** Set the environment variable:
```env
VITE_FORM_ENDPOINT=https://your-api.com/v1/appointments
```

**Step 2:** (Optional) Customize headers in `src/lib/submitForm.ts`:
```typescript
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY, // if needed
  },
  body: JSON.stringify(payload),
});
```

Works with **Formspree**, **Web3Forms**, **Supabase**, **Express**, or any JSON API.

---

## 🚢 Deployment

### Netlify
- `public/_redirects` is pre-configured for SPA routing
- Set build command: `npm run build`
- Set publish directory: `dist`

### Vercel
- `vercel.json` is pre-configured for SPA routing
- Auto-detects Vite framework

### Any Static Host
- Run `npm run build` → upload the `dist/` folder
- Ensure all routes redirect to `index.html` for client-side routing

---

## 📊 Quality Checks

| Check | Status |
|:---|:---|
| TypeScript strict mode | ✅ Zero errors |
| Content audit (banned terms) | ✅ Zero violations |
| Responsive (320px–1440px) | ✅ Verified |
| Accessibility (ARIA, keyboard) | ✅ Audited |
| 60fps animations | ✅ GPU-only transforms |
| SEO (meta, sitemap, robots) | ✅ Complete |

---

## 📄 License

Private project for Xcellence Dental Clinic, Haridwar. All rights reserved.

---

<div align="center">

**Built with ❤️ for Haridwar families**

*Xcellence Dental Clinic · 45+ years of caring smiles*

</div>
