/**
 * Single source of truth for Xcellence Dental Clinic.
 * CLIENT FACTS ALWAYS override anything found elsewhere.
 * Never hardcode these values in other components.
 */

export interface ClinicHours {
  label: string;
  days: string;
  open: number;
  close: number;
  tz: string;
}

export interface ClinicAddress {
  lines: string[];
  single: string;
  street?: string;
  city?: string;
  pincode?: string;
  state?: string;
  full?: string;
}

export interface ClinicPhone {
  display: string;
  tel: string;
}

export interface ClinicSocial {
  instagram: string;
  facebook: string;
  youtube: string;
}

const whatsappEnv = typeof import.meta !== 'undefined'
  ? ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_WHATSAPP_NUMBER)
  : undefined;

const whatsappNumberValue = whatsappEnv || '919643365651';

export const CLINIC = {
  name: 'Xcellence Dental Clinic',
  tagline: 'All specialties in one location',
  experience: '45+ years caring for Haridwar',
  experienceHeadline: '45+ years caring for Haridwar',

  phone: {
    display: '+91 96433 65651',
    tel: '+919643365651',
  },
  // Backward compatibility convenience accessors
  phoneTel: 'tel:+919643365651',

  email: 'xcellencedentalharidwar@gmail.com',
  emailMailto: 'mailto:xcellencedentalharidwar@gmail.com',

  address: {
    lines: [
      'Haridwar, Old Ranipur More',
      'Opp. Reliance Trendz',
      'Haridwar – 249407, Uttarakhand',
    ],
    single: 'Haridwar, Old Ranipur More, Opp. Reliance Trendz, Haridwar – 249407, Uttarakhand',
    street: 'Old Ranipur More, Opp. Reliance Trendz',
    city: 'Haridwar',
    pincode: '249407',
    state: 'Uttarakhand',
    full: 'Haridwar, Old Ranipur More, Opp. Reliance Trendz, Haridwar – 249407, Uttarakhand',
    googleMapsEmbedUrl: 'https://www.google.com/maps?q=Haridwar,+Old+Ranipur+More,+Opp.+Reliance+Trendz,+Haridwar+-+249407,+Uttarakhand&output=embed',
    googleMapsDirectionsUrl: 'https://maps.google.com/?q=Haridwar,+Old+Ranipur+More,+Opp.+Reliance+Trendz,+Haridwar+-+249407,+Uttarakhand',
  },

  mapEmbedUrl: 'https://www.google.com/maps?q=Haridwar,+Old+Ranipur+More,+Opp.+Reliance+Trendz,+Haridwar+-+249407,+Uttarakhand&output=embed',
  directionsUrl: 'https://maps.google.com/?q=Haridwar,+Old+Ranipur+More,+Opp.+Reliance+Trendz,+Haridwar+-+249407,+Uttarakhand',

  hours: {
    label: '10:00 AM – 9:00 PM',
    days: 'Open daily',
    open: 10,
    close: 21,
    tz: 'Asia/Kolkata',
  } as ClinicHours,

  // Backward compatibility timing object
  timing: {
    openHour: 10,
    openMinute: 0,
    closeHour: 21,
    closeMinute: 0,
    displayDays: 'Open daily',
    displayHours: '10:00 AM – 9:00 PM',
    timeZone: 'Asia/Kolkata',
    daysList: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
  },

  whatsappNumber: whatsappNumberValue,
  whatsappUrl: `https://wa.me/${whatsappNumberValue}`,

  social: {
    instagram: 'https://instagram.com/xcellencedental',
    facebook: 'https://facebook.com/xcellencedental',
    youtube: 'https://youtube.com/@xcellencedental',
  } as ClinicSocial,

  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },

  theme: {
    colors: {
      enamel: '#FBF8F2',
      pearl: '#FFFFFF',
      linen: '#F1EBE1',
      ink: '#1E1A1D',
      muted: '#6B6168',
      pomegranate: '#8C2F4B',
      pomegranateDark: '#6F2339',
      rosewater: '#F3DFDA',
      clove: '#2A1620',
      brass: '#C19A5B',
      brassDeep: '#A67C3A',
    },
  },
} as const;
