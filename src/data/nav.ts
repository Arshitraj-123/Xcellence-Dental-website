/**
 * Navigation tree for Xcellence Dental Clinic.
 * Structure:
 * - Home
 * - About (About us, Our doctors, Smile gallery, Blog)
 * - Services (Flagship first, then supporting)
 * - Patients (Patient forms, Pay later or EMI enquiry)
 * - Contact
 * - Book a visit (Action)
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
  isAction?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
    children: [
      {
        label: 'About Us',
        href: '/about',
        description: 'Our philosophy, clinic history, and compassionate patient care.',
      },
      {
        label: 'Our Doctors',
        href: '/doctors',
        description: 'Meet Dr Himanshi Sharma and Dr Shailesh Sharma.',
      },
      {
        label: 'Smile Gallery',
        href: '/smile-gallery',
        description: 'Case examples showcasing aesthetic and restorative smiles.',
      },
      {
        label: 'Blog',
        href: '/blog',
        description: 'Educational dental articles and oral wellness guides.',
      },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      /* Flagship services first */
      {
        label: 'Laser Dentistry',
        href: '/services/laser-dentistry',
        description: 'Gentle, minimally invasive light-assisted soft tissue care.',
      },
      {
        label: 'Implantology',
        href: '/services/implantology',
        description: 'Permanent titanium tooth replacement and restorations.',
      },
      {
        label: 'Periodontics',
        href: '/services/periodontics',
        description: 'Specialized gum disease treatment and foundation care.',
      },
      /* Supporting services */
      {
        label: 'General Dentistry',
        href: '/services/general-dentistry',
        description: 'Cleanings, exams, and routine preventive care.',
      },
      {
        label: 'Emergency Care',
        href: '/services/emergency-care',
        description: 'Urgent relief for tooth pain, fractures, and trauma.',
      },
      {
        label: 'Cosmetic Dentistry',
        href: '/services/cosmetic-dentistry',
        description: 'Teeth whitening, composite bonding, and porcelain veneers.',
      },
      {
        label: 'Restorative Dentistry',
        href: '/services/restorative-dentistry',
        description: 'Ceramic crowns, fixed bridges, and inlays/onlays.',
      },
      {
        label: 'Oral Surgery',
        href: '/services/oral-surgery',
        description: 'Gentle extractions and wisdom tooth management.',
      },
      {
        label: 'Endodontics',
        href: '/services/endodontics',
        description: 'Root canal therapy to resolve pain and save natural teeth.',
      },
      {
        label: 'Other Specialties',
        href: '/services/other-specialties',
        description: 'Pediatric visits, nightguards, and custom consultations.',
      },
    ],
  },
  {
    label: 'Patients',
    href: '/patient-forms',
    children: [
      {
        label: 'Patient Forms',
        href: '/patient-forms',
        description: 'Convenient pre-visit forms for streamlined arrival.',
      },
      {
        label: 'Pay Later or EMI Enquiry',
        href: '/pay-later',
        description: 'Flexible payment plans and interest-free EMI options.',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Book a Visit',
    href: '/book-appointment',
    isAction: true,
  },
];

export const FOOTER_NAV = {
  services: [
    { label: 'Laser Dentistry', href: '/services/laser-dentistry' },
    { label: 'Implantology', href: '/services/implantology' },
    { label: 'Periodontics', href: '/services/periodontics' },
    { label: 'General Dentistry', href: '/services/general-dentistry' },
    { label: 'Emergency Care', href: '/services/emergency-care' },
    { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
    { label: 'Restorative Dentistry', href: '/services/restorative-dentistry' },
    { label: 'Oral Surgery', href: '/services/oral-surgery' },
    { label: 'Endodontics', href: '/services/endodontics' },
    { label: 'Other Specialties', href: '/services/other-specialties' },
  ],
  clinic: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    { label: 'Smile Gallery', href: '/smile-gallery' },
    { label: 'Blog & Articles', href: '/blog' },
    { label: 'Contact & Location', href: '/contact' },
    { label: 'Book Appointment', href: '/book-appointment' },
  ],
  patients: [
    { label: 'Patient Forms', href: '/patient-forms' },
    { label: 'Pay Later & EMI Options', href: '/pay-later' },
  ],
};
