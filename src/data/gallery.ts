/**
 * Smile Gallery cases for Xcellence Dental Clinic.
 * Six cases: whitening, veneers, composite bonding, implants, ceramic crowns, full smile rehabilitation.
 * Includes before/after image paths under /images/cases/ and consent note field.
 * Until real photos arrive, renders illustrated SVG comparison with caption:
 * "Illustrated example. Individual results vary."
 */

export interface GalleryCase {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  service: string;
  beforeImage: string;
  afterImage: string;
  consentNote: string;
  caption: string;
  isPhoto: boolean;
  typicalVisits?: string;
  beforeSvgDef?: {
    color?: string;
    def?: Record<number, { short?: number; gap?: number; chip?: number; miss?: number; wide?: number; col?: string }>;
  };
  afterSvgDef?: {
    color?: string;
  };
}

export const GALLERY_CASES: GalleryCase[] = [
  {
    id: 'whitening',
    slug: 'teeth-whitening',
    category: 'Whitening',
    title: 'Teeth Whitening',
    description: 'Enamel discolouration and tea/coffee surface stains lifted multiple shades for a brighter, fresher smile.',
    service: 'Cosmetic Dentistry',
    beforeImage: '/images/cases/whitening-before.jpg',
    afterImage: '/images/cases/whitening-after.jpg',
    consentNote: 'Illustrated example. Individual results vary.',
    caption: 'Illustrated example. Individual results vary.',
    isPhoto: false,
    typicalVisits: '1 to 2 visits',
    beforeSvgDef: {
      color: '#E4CB8A',
    },
    afterSvgDef: {
      color: '#FFFFFF',
    },
  },
  {
    id: 'veneers',
    slug: 'porcelain-veneers',
    category: 'Veneers',
    title: 'Porcelain Veneers',
    description: 'Uneven edges, chipped incisors, and minor gaps transformed into a symmetrical, natural-looking smile line.',
    service: 'Cosmetic Dentistry',
    beforeImage: '/images/cases/veneers-before.jpg',
    afterImage: '/images/cases/veneers-after.jpg',
    consentNote: 'Illustrated example. Individual results vary.',
    caption: 'Illustrated example. Individual results vary.',
    isPhoto: false,
    typicalVisits: '2 visits',
    beforeSvgDef: {
      color: '#F6EBCB',
      def: {
        2: { short: 16, gap: 20 },
        3: { short: 8 },
        4: { short: 22, chip: 16 },
        5: { gap: 22, short: 10 },
      },
    },
    afterSvgDef: {
      color: '#FFFFFF',
    },
  },
  {
    id: 'bonding',
    slug: 'composite-bonding',
    category: 'Bonding',
    title: 'Composite Bonding',
    description: 'Targeted resin sculpting to close midline spacing and restore chipped enamel with conservative preservation.',
    service: 'Cosmetic Dentistry',
    beforeImage: '/images/cases/bonding-before.jpg',
    afterImage: '/images/cases/bonding-after.jpg',
    consentNote: 'Illustrated example. Individual results vary.',
    caption: 'Illustrated example. Individual results vary.',
    isPhoto: false,
    typicalVisits: '1 visit',
    beforeSvgDef: {
      color: '#F1E6D0',
      def: {
        3: { gap: 26 },
        4: { chip: 18 },
      },
    },
    afterSvgDef: {
      color: '#FFFFFF',
    },
  },
  {
    id: 'implants',
    slug: 'dental-implants',
    category: 'Implants',
    title: 'Dental Implants',
    description: 'Replacement of missing teeth with stable titanium implants and custom ceramic crowns, restoring full bite function.',
    service: 'Implantology',
    beforeImage: '/images/cases/implants-before.jpg',
    afterImage: '/images/cases/implants-after.jpg',
    consentNote: 'Illustrated example. Individual results vary.',
    caption: 'Illustrated example. Individual results vary.',
    isPhoto: false,
    typicalVisits: 'Multi-stage care',
    beforeSvgDef: {
      color: '#EDE2D0',
      def: {
        4: { miss: 1 },
      },
    },
    afterSvgDef: {
      color: '#FFFFFF',
    },
  },
  {
    id: 'crowns',
    slug: 'ceramic-crowns',
    category: 'Crowns',
    title: 'Ceramic Crowns',
    description: 'Extensively worn and fractured molars protected and rebuilt with durable, anatomical ceramic crowns.',
    service: 'Restorative Dentistry',
    beforeImage: '/images/cases/crowns-before.jpg',
    afterImage: '/images/cases/crowns-after.jpg',
    consentNote: 'Illustrated example. Individual results vary.',
    caption: 'Illustrated example. Individual results vary.',
    isPhoto: false,
    typicalVisits: '2 visits',
    beforeSvgDef: {
      color: '#D8C6A7',
      def: {
        2: { chip: 24, short: 14 },
        5: { chip: 20 },
      },
    },
    afterSvgDef: {
      color: '#FFFFFF',
    },
  },
  {
    id: 'rehab',
    slug: 'full-smile-rehabilitation',
    category: 'Rehabilitation',
    title: 'Full Smile Rehabilitation',
    description: 'Comprehensive restorative care combining periodontal stabilization, crowns, and implants for total oral renewal.',
    service: 'Specialty Care',
    beforeImage: '/images/cases/rehab-before.jpg',
    afterImage: '/images/cases/rehab-after.jpg',
    consentNote: 'Illustrated example. Individual results vary.',
    caption: 'Illustrated example. Individual results vary.',
    isPhoto: false,
    typicalVisits: 'Comprehensive plan',
    beforeSvgDef: {
      color: '#DCC39A',
      def: {
        1: { short: 12 },
        2: { short: 20, gap: 14 },
        3: { miss: 1 },
        4: { chip: 22 },
        5: { short: 18 },
      },
    },
    afterSvgDef: {
      color: '#FFFFFF',
    },
  },
];

export const SMILE_CASES = GALLERY_CASES;
