/**
 * Patient Journey Steps.
 * Re-written adhering to all client facts and verified clinic standards.
 */

export interface PatientStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const PATIENT_STEPS: PatientStep[] = [
  {
    stepNumber: 1,
    title: 'Warm Welcome & Check-In',
    subtitle: 'Streamlined Arrival',
    description: 'We welcome you into our calm, modern clinic. Our front desk assists you with quick digital check-in so your appointment starts on time without waiting-room stress.',
    iconName: 'UserCheck',
  },
  {
    stepNumber: 2,
    title: 'Comprehensive Examination',
    subtitle: 'Thorough Diagnostics',
    description: 'Our doctors conduct a gentle examination of your teeth, gums, and oral structures. Low-radiation digital imaging is taken if clinically indicated for precise diagnostics.',
    iconName: 'Search',
  },
  {
    stepNumber: 3,
    title: 'Personalized Treatment Plan',
    subtitle: 'Transparent Guidance',
    description: 'We discuss all findings openly, explaining your options in plain terms. You receive clear details on procedures, timelines, and transparent pricing before any care begins.',
    iconName: 'FileText',
  },
  {
    stepNumber: 4,
    title: 'Gentle Clinical Care',
    subtitle: 'Comfort-Centered Treatment',
    description: 'Using advanced instruments, gentle numbing, and modern laser techniques, our doctors perform your procedure with meticulous focus on your comfort and peace of mind.',
    iconName: 'HeartHandshake',
  },
  {
    stepNumber: 5,
    title: 'Aftercare & Ongoing Support',
    subtitle: 'Smooth Recovery',
    description: 'We provide simple home-care instructions and schedule any necessary review visits. Our team remains accessible via phone and WhatsApp if questions arise after you leave.',
    iconName: 'ShieldCheck',
  },
];
