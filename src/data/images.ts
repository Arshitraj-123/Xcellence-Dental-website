/**
 * Central image registry.
 * All image references throughout the app MUST use this map.
 * Slots are named semantically; swap files in public/images/ to update.
 */

export interface ImageSlot {
  src: string;
  alt: string;
  ratio: string;
  focal?: {
    mobile?: string;
    desktop?: string;
  };
}

export const IMAGES: Record<string, ImageSlot> = {
  /* ─── Heroes ─── */
  'hero-family': {
    src: '/images/hero-family.webp',
    alt: 'A happy family smiling together at Xcellence Dental Clinic',
    ratio: '16/9',
    focal: {
      mobile: 'center 30%',
      desktop: 'center 40%',
    },
  },

  /* ─── Clinic photos ─── */
  'clinic-wide': {
    src: '/images/clinic-wide.jpg',
    alt: 'Xcellence Dental Clinic exterior and surroundings in Haridwar',
    ratio: '16/9',
    focal: {
      mobile: 'center center',
      desktop: 'center 45%',
    },
  },

  'clinic-team': {
    src: '/images/clinic-team.jpg',
    alt: 'The caring dental team at Xcellence Dental Clinic',
    ratio: '4/3',
    focal: {
      mobile: 'center 30%',
      desktop: 'center center',
    },
  },

  'clinic-interior': {
    src: '/images/clinic-interior.jpeg',
    alt: 'Modern treatment room at Xcellence Dental Clinic',
    ratio: '4/3',
    focal: {
      mobile: 'center center',
      desktop: 'center center',
    },
  },

  /* ─── Doctors ─── */
  'doctor-himanshi-sharma': {
    src: '/images/doctors/doctor-a.png',
    alt: 'Dr Himanshi Sharma – Periodontist and Implantologist at Xcellence Dental Clinic',
    ratio: '4/5',
    focal: {
      mobile: 'center 20%',
      desktop: 'center 25%',
    },
  },

  'doctor-shailesh-sharma': {
    src: '/images/doctors/doctor-b.png',
    alt: 'Dr Shailesh Sharma – Certified Laser Dentist and Implantologist at Xcellence Dental Clinic',
    ratio: '4/5',
    focal: {
      mobile: 'center 20%',
      desktop: 'center 25%',
    },
  },

  /* ─── Unused (downloaded but not rendered — news section removed) ─── */
  'news-feature': {
    src: '/images/news-feature.jpg',
    alt: 'News feature',
    ratio: '16/9',
  },
} as const;

/**
 * Get an image slot by key. Returns undefined if not found.
 */
export function getImage(key: string): ImageSlot | undefined {
  return IMAGES[key];
}
