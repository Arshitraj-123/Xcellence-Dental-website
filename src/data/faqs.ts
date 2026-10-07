/**
 * Clinic Frequently Asked Questions.
 * Re-written adhering to all client facts and verified clinic standards.
 */

export interface FAQItem {
  id: string;
  category: 'general' | 'appointments' | 'payments' | 'services' | 'safety';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'hours-walkins',
    category: 'general',
    question: 'What are your clinic operating hours?',
    answer: 'Xcellence Dental Clinic is open daily from 10:00 AM to 9:00 PM. We welcome walk-in patients every day, especially for urgent dental pain and emergency consultations.',
  },
  {
    id: 'location-landmark',
    category: 'general',
    question: 'Where is the clinic located in Haridwar?',
    answer: 'We are located at Old Ranipur More, directly opposite Reliance Trendz in Haridwar, Uttarakhand (PIN: 249407). Convenient parking and landmark access are available.',
  },
  {
    id: 'doctors-specialties',
    category: 'general',
    question: 'Which doctors practice at Xcellence Dental Clinic?',
    answer: 'Our clinic is led by Dr Himanshi Sharma (BDS, MDS, Periodontist and Implantologist) and Dr Shailesh Sharma (Certified Laser Dentist and Implantologist), providing multi-specialty dental care under one roof.',
  },
  {
    id: 'booking-appointment',
    category: 'appointments',
    question: 'How can I schedule an appointment?',
    answer: 'You can book an appointment by calling us at +91 96433 65651, messaging us directly on WhatsApp, or completing our simple online booking request form.',
  },
  {
    id: 'first-visit-expectation',
    category: 'appointments',
    question: 'What should I expect during my first consultation?',
    answer: 'During your initial visit, our doctors will perform a gentle, thorough examination of your teeth and gums, discuss your oral health goals, and outline a clear, transparent treatment plan tailored to your needs.',
  },
  {
    id: 'payment-methods',
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, UPI (Google Pay, PhonePe, Paytm), and all major debit and credit cards. We also provide flexible payment schedules and EMI enquiry assistance for comprehensive treatments.',
  },
  {
    id: 'laser-dentistry-benefits',
    category: 'services',
    question: 'What is Laser Dentistry and how does it help?',
    answer: 'Laser dentistry uses gentle, concentrated light energy to perform soft tissue and gum procedures with minimal bleeding and swelling. Most patients experience a calmer treatment with rapid, smooth recovery.',
  },
  {
    id: 'implant-candidacy',
    category: 'services',
    question: 'How do I know if dental implants are right for me?',
    answer: 'Dental implants are suitable for most healthy adults with missing teeth. Our doctors will assess your bone structure and gum health using digital imaging to create a personalized implant plan.',
  },
  {
    id: 'gum-bleeding-care',
    category: 'services',
    question: 'Why do my gums bleed when I brush?',
    answer: 'Bleeding gums are typically an early sign of gingivitis or periodontal inflammation. Dr Himanshi Sharma specializes in diagnosing and treating gum disease to prevent bone loss and preserve natural teeth.',
  },
  {
    id: 'sterilization-standards',
    category: 'safety',
    question: 'What sterilization and infection control protocols do you follow?',
    answer: 'Patient safety is paramount. We follow rigorous medical-grade multi-stage autoclave sterilization protocols, use disposable barrier protection, and maintain strict operatory disinfection for every patient.',
  },
];

export function getFAQsByCategory(category: FAQItem['category']): FAQItem[] {
  return FAQS.filter((f) => f.category === category);
}
