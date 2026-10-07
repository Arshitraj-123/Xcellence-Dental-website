/**
 * Services data for Xcellence Dental Clinic.
 *
 * Rules:
 * - Flagship first: Laser Dentistry (Dr Shailesh Sharma), Implantology (both), Periodontics (Dr Himanshi Sharma)
 * - Kept from legacy site: confirmed: false (for doctor review), both doctors assigned
 * - same-day-dentistry: enabled: false
 * - other-specialties: general wording only, no unconfirmed treatments, includes 'ask us' line
 * - Old slug redirects provided in SERVICE_REDIRECTS
 */

export interface TreatmentItem {
  id?: string;
  name: string;
  tag?: string;
  description: string;
  duration?: string;
  visits?: string;
  idealFor?: string;
}

export interface ServiceStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  long: string;
  bullets: string[];
  treatments: TreatmentItem[];
  steps: ServiceStep[];
  faqs: ServiceFAQ[];
  doctors: string[];
  related: string[];
  enabled: boolean;
  confirmed: boolean;
  icon: string;
  flagship?: boolean;

  // Compatibility fields for existing views
  id: string;
  title: string;
  badge?: string;
  category?: string;
  featured?: boolean;
  shortDescription?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  overviewHeading?: string;
  overviewText?: string[];
  ticks?: string[];
  stats?: { value: string; label: string }[];
  process?: ServiceStep[];
  quiz?: {
    question: string;
    options: { label: string; recommendationTitle: string; recommendationText: string }[];
  };
  leadDoctorSlot?: 'himanshi-sharma' | 'shailesh-sharma';
  relatedServiceIds?: string[];
}

export type ServiceData = Service;

export const SERVICE_REDIRECTS: Record<string, string> = {
  'implant-dentistry': 'implantology',
  periodontists: 'periodontics',
  'same-day-dentistry': '/services',
};

export const SERVICES: Service[] = [
  /* ─── 1. Laser Dentistry (FLAGSHIP – NEW) ─── */
  {
    slug: 'laser-dentistry',
    id: 'laser-dentistry',
    name: 'Laser Dentistry',
    title: 'Laser Dentistry',
    flagship: true,
    featured: true,
    enabled: true,
    confirmed: true,
    icon: 'Sparkles',
    leadDoctorSlot: 'shailesh-sharma',
    doctors: ['shailesh-sharma'],
    short: 'Gentle, minimally invasive laser-assisted dental care for soft tissue procedures and gum health.',
    shortDescription: 'Gentle, minimally invasive laser-assisted dental care for soft tissue procedures and gum health.',
    heroHeadline: 'Advanced Laser Dental Care in Haridwar',
    heroSubtitle: 'Precise, gentle treatments designed to maximize patient comfort and support smooth recovery.',
    long: 'Laser dentistry uses focused dental energy to perform delicate soft tissue treatments with precision. By minimizing mechanical vibration and physical pressure, laser-assisted care offers a comfortable experience with reduced tissue trauma and smooth healing.',
    overviewHeading: 'Modern Laser Technology for Gentle Treatment',
    overviewText: [
      'Laser dentistry offers a calm, modern approach to soft tissue and periodontal procedures.',
      'By focusing energy precisely where treatment is needed, surrounding healthy areas remain undisturbed.',
      'Patients often experience minimal discomfort during and after procedures, with reduced bleeding and shorter healing periods.',
    ],
    bullets: [
      'Minimally invasive soft tissue procedures',
      'Gentle periodontal decontamination',
      'Comfort-focused clinical approach',
      'Reduced post-procedure tenderness',
    ],
    ticks: [
      'Minimally invasive soft tissue procedures',
      'Gentle periodontal decontamination',
      'Comfort-focused clinical approach',
      'Reduced post-procedure tenderness',
    ],
    stats: [
      { value: 'Gentle', label: 'Patient Experience' },
      { value: 'Precision', label: 'Tissue Care' },
      { value: 'Rapid', label: 'Comfort Recovery' },
    ],
    treatments: [
      {
        id: 'laser-gum-therapy',
        name: 'Laser-Assisted Gum Therapy',
        tag: 'Periodontal Care',
        description: 'Targeted laser treatment to gently reduce bacterial colonies in periodontal pockets and support tissue recovery.',
      },
      {
        id: 'laser-soft-tissue-contouring',
        name: 'Soft Tissue Contouring',
        tag: 'Aesthetic & Functional',
        description: 'Precise shaping of uneven gum margins to create balanced gum lines and improve access for restoration.',
      },
      {
        id: 'frenectomy-laser',
        name: 'Laser Frenectomy',
        tag: 'Minor Oral Surgery',
        description: 'Gentle release of restrictive tissue attachments (tongue-tie or lip-tie) with minimal bleeding and prompt healing.',
      },
      {
        id: 'aphthous-care',
        name: 'Canker Sore & Ulcer Comfort',
        tag: 'Palliative Care',
        description: 'Non-contact laser application to ease discomfort from oral ulcers and accelerate natural surface recovery.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Clinical Evaluation',
        description: 'Comprehensive examination of the oral tissues and assessment of treatment suitability.',
      },
      {
        stepNumber: 2,
        title: 'Personalized Plan',
        description: 'Clear discussion of the recommended laser-assisted procedure and comfort measures.',
      },
      {
        stepNumber: 3,
        title: 'Gentle Procedure',
        description: 'Careful application of laser energy with continuous attention to patient comfort.',
      },
      {
        stepNumber: 4,
        title: 'Aftercare & Review',
        description: 'Simple home-care instructions and routine check to verify healthy healing.',
      },
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Clinical Evaluation',
        description: 'Comprehensive examination of the oral tissues and assessment of treatment suitability.',
      },
      {
        stepNumber: 2,
        title: 'Personalized Plan',
        description: 'Clear discussion of the recommended laser-assisted procedure and comfort measures.',
      },
      {
        stepNumber: 3,
        title: 'Gentle Procedure',
        description: 'Careful application of laser energy with continuous attention to patient comfort.',
      },
      {
        stepNumber: 4,
        title: 'Aftercare & Review',
        description: 'Simple home-care instructions and routine check to verify healthy healing.',
      },
    ],
    faqs: [
      {
        question: 'Is laser dental treatment painful?',
        answer: 'Most patients report significantly less discomfort with laser procedures compared to conventional methods. Local numbing is available when needed to ensure you remain completely comfortable.',
      },
      {
        question: 'Who performs laser treatments at Xcellence Dental Clinic?',
        answer: 'Laser treatments are conducted by Dr Shailesh Sharma, our Certified Laser Dentist and Implantologist.',
      },
      {
        question: 'How quickly does tissue heal after laser treatment?',
        answer: 'Because laser energy seals tissue edges gently as it works, patients typically experience minimal swelling, reduced bleeding, and smoother recovery.',
      },
    ],
    related: ['periodontics', 'implantology', 'general-dentistry'],
    relatedServiceIds: ['periodontics', 'implantology', 'general-dentistry'],
  },

  /* ─── 2. Implantology (FLAGSHIP – RENAMED) ─── */
  {
    slug: 'implantology',
    id: 'implantology',
    name: 'Implantology',
    title: 'Implantology',
    flagship: true,
    featured: true,
    enabled: true,
    confirmed: true,
    icon: 'Anchor',
    leadDoctorSlot: 'himanshi-sharma',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Permanent, lifelike dental implants to replace single, multiple, or full arches of missing teeth.',
    shortDescription: 'Permanent, lifelike dental implants to replace single, multiple, or full arches of missing teeth.',
    heroHeadline: 'Comprehensive Dental Implantology in Haridwar',
    heroSubtitle: 'Restore natural chewing function, smile aesthetics, and long-term jawbone stability.',
    long: 'Dental implants provide a secure, biocompatible foundation that replaces the natural tooth root. Whether replacing a single missing tooth or anchoring a full dental bridge, our doctors combine surgical precision and restorative skill for durable outcomes.',
    overviewHeading: 'Lifelong Solutions for Tooth Replacement',
    overviewText: [
      'A dental implant is a titanium post placed securely in the jawbone, where it integrates naturally with bone tissue.',
      'Unlike removable dentures, implants prevent bone deterioration and restore natural bite strength.',
      'Dr Himanshi Sharma and Dr Shailesh Sharma work collaboratively to ensure anatomical accuracy and natural aesthetics.',
    ],
    bullets: [
      'Single and multiple tooth replacement',
      'Implant-supported bridges and overdentures',
      'Bone preservation and anatomical planning',
      'Natural appearance and full chewing power',
    ],
    ticks: [
      'Single and multiple tooth replacement',
      'Implant-supported bridges and overdentures',
      'Bone preservation and anatomical planning',
      'Natural appearance and full chewing power',
    ],
    stats: [
      { value: 'Natural', label: 'Bite & Appearance' },
      { value: 'Durable', label: 'Bone Integration' },
      { value: 'Permanent', label: 'Tooth Replacement' },
    ],
    treatments: [
      {
        id: 'single-tooth-implant',
        name: 'Single Tooth Replacement',
        tag: 'Restorative Implant',
        description: 'An individual implant post and custom ceramic crown that restores tooth function without altering adjacent teeth.',
      },
      {
        id: 'implant-bridge',
        name: 'Implant-Supported Bridge',
        tag: 'Multi-Tooth Solution',
        description: 'Two or more implants supporting a stable ceramic bridge to replace several consecutive missing teeth.',
      },
      {
        id: 'full-arch-implants',
        name: 'Full Arch Restoration',
        tag: 'Complete Rehabilitation',
        description: 'Strategically positioned implants that anchor a full arch prosthesis for secure function and aesthetic restoration.',
      },
      {
        id: 'bone-grafting',
        name: 'Bone Preservation & Augmentation',
        tag: 'Pre-Implant Care',
        description: 'Careful bone augmentation procedures to ensure adequate bone volume and support for stable implant integration.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Consultation & Diagnostics',
        description: 'Comprehensive digital imaging and clinical assessment of bone structure and oral health.',
      },
      {
        stepNumber: 2,
        title: 'Precision Placement',
        description: 'Gentle surgical placement of the biocompatible implant post under local anaesthesia.',
      },
      {
        stepNumber: 3,
        title: 'Osseointegration',
        description: 'A healing period during which the implant post integrates securely with the surrounding bone.',
      },
      {
        stepNumber: 4,
        title: 'Final Restoration',
        description: 'Placement of the custom-shaded crown or bridge, restoring natural appearance and bite strength.',
      },
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Consultation & Diagnostics',
        description: 'Comprehensive digital imaging and clinical assessment of bone structure and oral health.',
      },
      {
        stepNumber: 2,
        title: 'Precision Placement',
        description: 'Gentle surgical placement of the biocompatible implant post under local anaesthesia.',
      },
      {
        stepNumber: 3,
        title: 'Osseointegration',
        description: 'A healing period during which the implant post integrates securely with the surrounding bone.',
      },
      {
        stepNumber: 4,
        title: 'Final Restoration',
        description: 'Placement of the custom-shaded crown or bridge, restoring natural appearance and bite strength.',
      },
    ],
    faqs: [
      {
        question: 'Am I a suitable candidate for dental implants?',
        answer: 'Most adults in good general health with sufficient bone density are strong candidates. Our doctors will evaluate your oral health and recommend any preparatory steps needed.',
      },
      {
        question: 'How long do dental implants last?',
        answer: 'With proper daily oral hygiene and regular professional cleanings, dental implants are designed to provide long-lasting, often lifetime function.',
      },
      {
        question: 'Does implant placement hurt?',
        answer: 'Implant placement is performed with effective local anaesthesia. Most patients report only mild tenderness in the days following surgery, manageable with standard pain medication.',
      },
    ],
    related: ['periodontics', 'laser-dentistry', 'restorative-dentistry'],
    relatedServiceIds: ['periodontics', 'laser-dentistry', 'restorative-dentistry'],
  },

  /* ─── 3. Periodontics (FLAGSHIP – RENAMED) ─── */
  {
    slug: 'periodontics',
    id: 'periodontics',
    name: 'Periodontics',
    title: 'Periodontics',
    flagship: true,
    featured: true,
    enabled: true,
    confirmed: true,
    icon: 'ShieldCheck',
    leadDoctorSlot: 'himanshi-sharma',
    doctors: ['himanshi-sharma'],
    short: 'Specialized diagnosis, treatment, and ongoing care for gum disease, bone support, and soft tissues.',
    shortDescription: 'Specialized diagnosis, treatment, and ongoing care for gum disease, bone support, and soft tissues.',
    heroHeadline: 'Specialized Periodontal & Gum Care in Haridwar',
    heroSubtitle: 'Led by Dr Himanshi Sharma (BDS, MDS), protecting the biological foundations of your teeth.',
    long: 'Periodontics focuses on the structures that support your teeth: gums, periodontal ligament, and alveolar bone. Left untreated, gum disease is the leading cause of adult tooth loss. Dr Himanshi Sharma provides evidence-based periodontal therapy to eliminate infection and preserve natural dentition.',
    overviewHeading: 'Protecting the Foundations of Your Smile',
    overviewText: [
      'Healthy gums fit snugly around teeth and provide a biological barrier against oral bacteria.',
      'Gingivitis and periodontitis can develop silently without severe initial pain, making specialized care vital.',
      'Our periodontal therapies restore tissue health, arrest bone resorption, and prevent premature tooth loss.',
    ],
    bullets: [
      'Comprehensive periodontal screening and charting',
      'Deep cleaning (scaling and root planing)',
      'Regenerative and pocket reduction procedures',
      'Supportive periodontal maintenance therapy',
    ],
    ticks: [
      'Comprehensive periodontal screening and charting',
      'Deep cleaning (scaling and root planing)',
      'Regenerative and pocket reduction procedures',
      'Supportive periodontal maintenance therapy',
    ],
    stats: [
      { value: 'Specialized', label: 'MDS Periodontist' },
      { value: 'Foundational', label: 'Tooth Support' },
      { value: 'Preventive', label: 'Bone Protection' },
    ],
    treatments: [
      {
        id: 'scaling-root-planing',
        name: 'Scaling & Root Planing',
        tag: 'Non-Surgical Care',
        description: 'Meticulous removal of calculus and bacterial plaque below the gumline to encourage tissue reattachment.',
      },
      {
        id: 'pocket-reduction',
        name: 'Periodontal Pocket Management',
        tag: 'Surgical Periodontics',
        description: 'Targeted procedures to reduce deep periodontal pockets and eliminate hard-to-reach bacterial reservoirs.',
      },
      {
        id: 'gum-grafting',
        name: 'Gingival Recession Care',
        tag: 'Soft Tissue Surgery',
        description: 'Soft tissue techniques to cover exposed tooth roots, protect sensitive surfaces, and restore gum symmetry.',
      },
      {
        id: 'periodontal-maintenance',
        name: 'Supportive Periodontal Maintenance',
        tag: 'Ongoing Health',
        description: 'Specialized maintenance appointments to monitor pocket depths and prevent recurrent periodontal disease.',
      },
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Periodontal Assessment',
        description: 'Comprehensive 6-point pocket charting, bleeding index, and radiographic bone evaluation.',
      },
      {
        stepNumber: 2,
        title: 'Deep Decontamination',
        description: 'Gentle ultrasonic and hand scaling to cleanse root surfaces and disinfect periodontal pockets.',
      },
      {
        stepNumber: 3,
        title: 'Tissue Healing Review',
        description: 'Follow-up assessment to verify reduction in pocket depths and evaluate tissue response.',
      },
      {
        stepNumber: 4,
        title: 'Maintenance Schedule',
        description: 'Personalized interval maintenance visits to sustain gum health and safeguard tooth foundations.',
      },
    ],
    process: [
      {
        stepNumber: 1,
        title: 'Periodontal Assessment',
        description: 'Comprehensive 6-point pocket charting, bleeding index, and radiographic bone evaluation.',
      },
      {
        stepNumber: 2,
        title: 'Deep Decontamination',
        description: 'Gentle ultrasonic and hand scaling to cleanse root surfaces and disinfect periodontal pockets.',
      },
      {
        stepNumber: 3,
        title: 'Tissue Healing Review',
        description: 'Follow-up assessment to verify reduction in pocket depths and evaluate tissue response.',
      },
      {
        stepNumber: 4,
        title: 'Maintenance Schedule',
        description: 'Personalized interval maintenance visits to sustain gum health and safeguard tooth foundations.',
      },
    ],
    faqs: [
      {
        question: 'What are the early warning signs of gum disease?',
        answer: 'Common early signs include bleeding when brushing, persistent bad breath, tender or swollen gums, and slight gum recession.',
      },
      {
        question: 'Can gum disease be cured?',
        answer: 'Early gingivitis is completely reversible. Advanced periodontitis can be successfully arrested and managed with professional periodontal care and consistent maintenance.',
      },
      {
        question: 'How does gum health affect general well-being?',
        answer: 'Clinical evidence demonstrates strong links between chronic periodontal inflammation and systemic health conditions including cardiovascular disease and diabetes management.',
      },
    ],
    related: ['laser-dentistry', 'implantology', 'general-dentistry'],
    relatedServiceIds: ['laser-dentistry', 'implantology', 'general-dentistry'],
  },

  /* ─── 4. General Dentistry (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'general-dentistry',
    id: 'general-dentistry',
    name: 'General Dentistry',
    title: 'General Dentistry',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'Stethoscope',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Preventive cleanings, comprehensive dental examinations, and routine care for the entire family.',
    shortDescription: 'Preventive cleanings, comprehensive dental examinations, and routine care for the entire family.',
    heroHeadline: 'Comprehensive Family Dental Care in Haridwar',
    heroSubtitle: 'Thorough examinations, preventive treatments, and patient-centered everyday care.',
    long: 'General dentistry forms the cornerstone of lifelong oral health. We focus on routine preventive care, early detection of dental issues, and conservative restorative treatments to keep your natural teeth strong and healthy.',
    bullets: [
      'Comprehensive dental examinations and diagnostics',
      'Professional ultrasonic cleanings and polishing',
      'Digital x-ray imaging with minimal radiation',
      'Tooth-colored composite fillings',
    ],
    ticks: [
      'Comprehensive dental examinations and diagnostics',
      'Professional ultrasonic cleanings and polishing',
      'Digital x-ray imaging with minimal radiation',
      'Tooth-colored composite fillings',
    ],
    treatments: [
      {
        id: 'dental-exam',
        name: 'Comprehensive Dental Examination',
        tag: 'Preventive',
        description: 'Complete checkup of teeth, gums, and oral tissues with personalized recommendations.',
      },
      {
        id: 'dental-cleaning',
        name: 'Professional Teeth Cleaning',
        tag: 'Hygiene',
        description: 'Ultrasonic removal of plaque and tartar deposits followed by surface polishing.',
      },
      {
        id: 'composite-fillings',
        name: 'Tooth-Colored Fillings',
        tag: 'Restorative',
        description: 'Conservative composite restorations to repair minor decay and maintain tooth strength.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Checkup', description: 'Detailed examination of your teeth and gums.' },
      { stepNumber: 2, title: 'Hygiene Care', description: 'Gentle ultrasonic cleaning and plaque removal.' },
      { stepNumber: 3, title: 'Plan & Advice', description: 'Preventive guidance and home oral hygiene tips.' },
    ],
    faqs: [
      {
        question: 'How often should I visit the dentist?',
        answer: 'We recommend routine checkups and cleanings every six months for optimal oral health.',
      },
      {
        question: 'Are dental cleanings painful?',
        answer: 'Our professional cleanings are performed gently using modern ultrasonic instruments to ensure patient comfort.',
      },
    ],
    related: ['laser-dentistry', 'periodontics', 'cosmetic-dentistry'],
    relatedServiceIds: ['laser-dentistry', 'periodontics', 'cosmetic-dentistry'],
  },

  /* ─── 5. Emergency Care (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'emergency-care',
    id: 'emergency-care',
    name: 'Emergency Dental Care',
    title: 'Emergency Dental Care',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'AlertCircle',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Prompt relief for severe tooth pain, fractured teeth, oral swellings, and dental trauma.',
    shortDescription: 'Prompt relief for severe tooth pain, fractured teeth, oral swellings, and dental trauma.',
    heroHeadline: 'Urgent Dental Relief in Haridwar',
    heroSubtitle: 'Open daily with rapid assistance to relieve dental pain and treat acute oral conditions.',
    long: 'Dental emergencies require rapid attention to relieve distress and prevent further damage. Whether facing acute toothache, a chipped or dislodged tooth, or facial swelling, our clinic provides focused emergency triage and gentle care.',
    bullets: [
      'Prompt evaluation for severe tooth pain',
      'Treatment for chipped, broken, or knocked-out teeth',
      'Management of acute abscesses and facial swelling',
      'Walk-ins welcome daily during operating hours',
    ],
    ticks: [
      'Prompt evaluation for severe tooth pain',
      'Treatment for chipped, broken, or knocked-out teeth',
      'Management of acute abscesses and facial swelling',
      'Walk-ins welcome daily during operating hours',
    ],
    treatments: [
      {
        id: 'pain-relief',
        name: 'Acute Toothache Management',
        tag: 'Urgent Relief',
        description: 'Immediate diagnostic assessment and targeted treatment to alleviate severe oral pain.',
      },
      {
        id: 'broken-tooth-care',
        name: 'Chipped or Broken Tooth Repair',
        tag: 'Trauma Care',
        description: 'Stabilization and aesthetic repair of fractured teeth to protect the dental pulp.',
      },
      {
        id: 'abscess-treatment',
        name: 'Infection & Abscess Care',
        tag: 'Infection Control',
        description: 'Safe drainage, antimicrobial therapy, and pulp assessment to resolve dangerous infections.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Rapid Triage', description: 'Immediate assessment to identify the source of discomfort.' },
      { stepNumber: 2, title: 'Pain Relief', description: 'Prompt interventions to alleviate acute pain.' },
      { stepNumber: 3, title: 'Definitive Plan', description: 'Clear guidance on next restorative steps.' },
    ],
    faqs: [
      {
        question: 'What should I do if a tooth is completely knocked out?',
        answer: 'Handle the tooth only by the crown, gently rinse it with milk or clean water without scrubbing, place it back into the socket if possible or store in milk, and reach our clinic immediately.',
      },
      {
        question: 'Do you accept walk-in emergencies?',
        answer: 'Yes, walk-ins are welcomed every day between 10:00 AM and 9:00 PM for urgent dental concerns.',
      },
    ],
    related: ['endodontics', 'general-dentistry', 'oral-surgery'],
    relatedServiceIds: ['endodontics', 'general-dentistry', 'oral-surgery'],
  },

  /* ─── 6. Cosmetic Dentistry (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'cosmetic-dentistry',
    id: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    title: 'Cosmetic Dentistry',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'Sparkle',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Smile enhancement through professional whitening, porcelain veneers, and composite bonding.',
    shortDescription: 'Smile enhancement through professional whitening, porcelain veneers, and composite bonding.',
    heroHeadline: 'Artistic Smile Transformations in Haridwar',
    heroSubtitle: 'Harmonious aesthetics designed to highlight the natural beauty of your smile.',
    long: 'Cosmetic dentistry combines clinical precision with artistic eye to improve the appearance of teeth, alignment, and smile symmetry. From conservative composite bonding to custom ceramic veneers, we create balanced, natural-looking results.',
    bullets: [
      'In-clinic professional teeth whitening',
      'Custom ceramic veneers for smile refinement',
      'Direct composite bonding for chipped edges and gaps',
      'Comprehensive smile design consultations',
    ],
    ticks: [
      'In-clinic professional teeth whitening',
      'Custom ceramic veneers for smile refinement',
      'Direct composite bonding for chipped edges and gaps',
      'Comprehensive smile design consultations',
    ],
    treatments: [
      {
        id: 'teeth-whitening',
        name: 'Professional Teeth Whitening',
        tag: 'Smile Brightening',
        description: 'Safe, clinical enamel brightening to remove deep surface stains and lighten shade.',
      },
      {
        id: 'porcelain-veneers',
        name: 'Ceramic Veneers',
        tag: 'Aesthetic Refinement',
        description: 'Ultra-thin custom ceramic facings bonded to front teeth to refine shape, color, and alignment.',
      },
      {
        id: 'composite-bonding',
        name: 'Direct Composite Bonding',
        tag: 'Conservative Care',
        description: 'Direct tooth-colored resin sculpting to repair small fractures and close minor spaces.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Smile Consultation', description: 'Discussion of your aesthetic goals and facial harmony.' },
      { stepNumber: 2, title: 'Treatment Design', description: 'Detailed planning and shade matching.' },
      { stepNumber: 3, title: 'Refined Placement', description: 'Artistic application and precise finishing of your restorations.' },
    ],
    faqs: [
      {
        question: 'Will veneers look natural?',
        answer: 'Yes, modern dental ceramics replicate the natural translucency, texture, and light reflection of real tooth enamel.',
      },
      {
        question: 'Does teeth whitening damage enamel?',
        answer: 'When performed under professional dental supervision, whitening is a safe procedure that does not damage healthy tooth enamel.',
      },
    ],
    related: ['restorative-dentistry', 'periodontics', 'general-dentistry'],
    relatedServiceIds: ['restorative-dentistry', 'periodontics', 'general-dentistry'],
  },

  /* ─── 7. Restorative Dentistry (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'restorative-dentistry',
    id: 'restorative-dentistry',
    name: 'Restorative Dentistry',
    title: 'Restorative Dentistry',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'Hammer',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Custom dental crowns, fixed bridges, and durable tooth restorations for damaged dentition.',
    shortDescription: 'Custom dental crowns, fixed bridges, and durable tooth restorations for damaged dentition.',
    heroHeadline: 'Restoring Tooth Strength and Natural Form',
    heroSubtitle: 'Durable restorations engineered to renew chewing function and dental integrity.',
    long: 'Restorative dentistry focuses on rebuilding teeth damaged by wear, trauma, or deep decay. We use durable materials and precise impressions to create comfortable restorations that blend seamlessly with your natural dentition.',
    bullets: [
      'Custom ceramic and zirconia crowns',
      'Fixed dental bridges to span missing spaces',
      'Tooth-colored inlays and onlays',
      'Full mouth functional rehabilitation',
    ],
    ticks: [
      'Custom ceramic and zirconia crowns',
      'Fixed dental bridges to span missing spaces',
      'Tooth-colored inlays and onlays',
      'Full mouth functional rehabilitation',
    ],
    treatments: [
      {
        id: 'dental-crowns',
        name: 'Custom Dental Crowns',
        tag: 'Full Coverage',
        description: 'Protective custom ceramic cap designed to encase a weakened tooth and restore strength.',
      },
      {
        id: 'dental-bridges',
        name: 'Fixed Dental Bridges',
        tag: 'Tooth Replacement',
        description: 'Fixed prosthetic unit anchored by adjacent supportive teeth to replace missing teeth.',
      },
      {
        id: 'inlays-onlays',
        name: 'Ceramic Inlays & Onlays',
        tag: 'Conservative Restoration',
        description: 'Precision indirect restorations for teeth requiring more support than standard fillings.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Tooth Preparation', description: 'Careful removal of decay and shaping for optimal crown fit.' },
      { stepNumber: 2, title: 'Detailed Impression', description: 'Precise records taken for custom fabrication.' },
      { stepNumber: 3, title: 'Final Bonding', description: 'Secure cementation and bite adjustment for lasting comfort.' },
    ],
    faqs: [
      {
        question: 'When is a dental crown necessary?',
        answer: 'A crown is typically recommended after root canal therapy, for teeth with extensive fractures, or when a large filling leaves minimal natural tooth structure.',
      },
      {
        question: 'How do I care for dental crowns and bridges?',
        answer: 'Maintain daily brushing and flossing, use interdental brushes under bridges, and attend routine dental checkups.',
      },
    ],
    related: ['endodontics', 'implantology', 'cosmetic-dentistry'],
    relatedServiceIds: ['endodontics', 'implantology', 'cosmetic-dentistry'],
  },

  /* ─── 8. Oral Surgery (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'oral-surgery',
    id: 'oral-surgery',
    name: 'Oral Surgery',
    title: 'Oral Surgery',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'Scissors',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Gentle tooth extractions, wisdom tooth management, and minor oral surgical care.',
    shortDescription: 'Gentle tooth extractions, wisdom tooth management, and minor oral surgical care.',
    heroHeadline: 'Gentle Minor Oral Surgical Care in Haridwar',
    heroSubtitle: 'Careful surgical techniques focused on patient comfort, safety, and rapid healing.',
    long: 'When a tooth cannot be saved or impacted wisdom teeth threaten surrounding alignment, oral surgery provides gentle removal and alveolar preservation. Our doctors employ atraumatic techniques to protect bone contours.',
    bullets: [
      'Gentle extractions of non-restorable teeth',
      'Impacted wisdom tooth management',
      'Socket preservation and bone grafting',
      'Comfort-centered local anaesthesia',
    ],
    ticks: [
      'Gentle extractions of non-restorable teeth',
      'Impacted wisdom tooth management',
      'Socket preservation and bone grafting',
      'Comfort-centered local anaesthesia',
    ],
    treatments: [
      {
        id: 'routine-extraction',
        name: 'Gentle Tooth Extraction',
        tag: 'General Extraction',
        description: 'Careful tooth removal performed with minimal pressure to protect the underlying jawbone.',
      },
      {
        id: 'wisdom-tooth-removal',
        name: 'Wisdom Tooth Management',
        tag: 'Surgical Extraction',
        description: 'Evaluation and removal of impacted or partially erupted third molars causing pain or crowding.',
      },
      {
        id: 'socket-preservation',
        name: 'Socket Bone Preservation',
        tag: 'Pre-Implant Care',
        description: 'Placement of bone graft material in the extraction socket to maintain ridge height for future implants.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Imaging & Evaluation', description: 'Digital assessment of root anatomy and proximity to nerves.' },
      { stepNumber: 2, title: 'Gentle Surgery', description: 'Comfort-focused procedure using effective local anaesthesia.' },
      { stepNumber: 3, title: 'Healing Guidance', description: 'Clear post-operative instructions for swift, uncomplicated recovery.' },
    ],
    faqs: [
      {
        question: 'Will I feel pain during an extraction?',
        answer: 'No. Local anaesthesia thoroughly numbs the entire treatment area so you will feel gentle pressure but no pain during the procedure.',
      },
      {
        question: 'How long does healing take after wisdom tooth removal?',
        answer: 'Initial soft tissue healing typically occurs within 5 to 7 days, with complete comfort returning shortly thereafter.',
      },
    ],
    related: ['implantology', 'periodontics', 'emergency-care'],
    relatedServiceIds: ['implantology', 'periodontics', 'emergency-care'],
  },

  /* ─── 9. Endodontics (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'endodontics',
    id: 'endodontics',
    name: 'Endodontics (Root Canal Therapy)',
    title: 'Endodontics (Root Canal Therapy)',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'Activity',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Gentle root canal therapy to eliminate tooth pain and preserve your natural tooth.',
    shortDescription: 'Gentle root canal therapy to eliminate tooth pain and preserve your natural tooth.',
    heroHeadline: 'Gentle Root Canal Therapy in Haridwar',
    heroSubtitle: 'Relieve tooth pain, resolve deep dental infection, and save your natural tooth.',
    long: 'Endodontic therapy treats the dental pulp inside the tooth when it becomes inflamed or infected by deep decay. Modern root canal treatment is comfortable, highly effective, and allows you to keep your natural tooth for years to come.',
    bullets: [
      'Gentle root canal treatment under local numbing',
      'Advanced instrumentation and disinfection',
      'Relief from acute pulpitis and abscess pain',
      'Preservation of natural tooth structure',
    ],
    ticks: [
      'Gentle root canal treatment under local numbing',
      'Advanced instrumentation and disinfection',
      'Relief from acute pulpitis and abscess pain',
      'Preservation of natural tooth structure',
    ],
    treatments: [
      {
        id: 'root-canal-therapy',
        name: 'Root Canal Treatment',
        tag: 'Pulp Therapy',
        description: 'Careful removal of infected pulp tissue, thorough canal cleaning, and hermetic biocompatible sealing.',
      },
      {
        id: 'endodontic-retreatment',
        name: 'Endodontic Retreatment',
        tag: 'Specialized Care',
        description: 'Evaluation and re-cleaning of previously treated canals to resolve persistent irritation.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Diagnosis & Anaesthesia', description: 'Targeted imaging and complete numbing of the affected tooth.' },
      { stepNumber: 2, title: 'Cleaning & Shaping', description: 'Gentle cleansing and disinfection of the root canal system.' },
      { stepNumber: 3, title: 'Sealing & Protection', description: 'Biocompatible canal sealing followed by preparation for a protective crown.' },
    ],
    faqs: [
      {
        question: 'Does root canal treatment hurt?',
        answer: 'Modern root canal therapy is no more uncomfortable than having a standard filling placed. The procedure actually relieves the severe pain caused by infection.',
      },
      {
        question: 'Why not simply pull the tooth?',
        answer: 'Saving your natural tooth maintains your original bite alignment and avoids the need for more complex replacement procedures.',
      },
    ],
    related: ['restorative-dentistry', 'emergency-care', 'laser-dentistry'],
    relatedServiceIds: ['restorative-dentistry', 'emergency-care', 'laser-dentistry'],
  },

  /* ─── 10. Other Specialties (KEPT – CONFIRMED: FALSE) ─── */
  {
    slug: 'other-specialties',
    id: 'other-specialties',
    name: 'Other Specialties',
    title: 'Other Specialties',
    flagship: false,
    featured: false,
    enabled: true,
    confirmed: false,
    icon: 'Layers',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'Comprehensive specialty dental consultations and customized multi-disciplinary oral healthcare.',
    shortDescription: 'Comprehensive specialty dental consultations and customized multi-disciplinary oral healthcare.',
    heroHeadline: 'Multi-Disciplinary Dental Specialties in Haridwar',
    heroSubtitle: 'Collaborative dental solutions tailored to your unique clinical requirements.',
    long: 'At Xcellence Dental Clinic, our practitioners offer collaborative dental solutions across diverse fields of dentistry. Whether you have questions regarding specialized restorative plans, bite balance, or pediatric care, please ask us during your consultation.',
    bullets: [
      'Pediatric dental examinations and preventive care',
      'Occlusal assessments and night guards for grinding',
      'Multi-disciplinary treatment planning',
      'Personalized clinical advice — ask us about any dental concern',
    ],
    ticks: [
      'Pediatric dental examinations and preventive care',
      'Occlusal assessments and night guards for grinding',
      'Multi-disciplinary treatment planning',
      'Personalized clinical advice — ask us about any dental concern',
    ],
    treatments: [
      {
        id: 'pediatric-care',
        name: 'Children’s Dental Care',
        tag: 'Pediatric Care',
        description: 'Gentle examinations, preventive sealants, and positive dental experiences for young patients.',
      },
      {
        id: 'nightguards',
        name: 'Occlusal Splints & Nightguards',
        tag: 'Preventive Care',
        description: 'Custom nightguards to protect teeth from nocturnal grinding and alleviate jaw joint stress.',
      },
      {
        id: 'custom-inquiry',
        name: 'Specialized Consultations',
        tag: 'Collaborative Care',
        description: 'Comprehensive evaluations for unique dental cases. Ask us about any specific oral care needs.',
      },
    ],
    steps: [
      { stepNumber: 1, title: 'Inquiry & Consultation', description: 'Discussion of your specific dental concerns and questions.' },
      { stepNumber: 2, title: 'Specialized Evaluation', description: 'Comprehensive examination and diagnostic assessment.' },
      { stepNumber: 3, title: 'Tailored Solution', description: 'A personalized clinical roadmap to meet your oral health goals.' },
    ],
    faqs: [
      {
        question: 'Do you treat children at the clinic?',
        answer: 'Yes, we welcome children and provide gentle, reassuring preventive checkups and treatments.',
      },
      {
        question: 'What if my dental condition is not listed here?',
        answer: 'We provide comprehensive dental care under one roof. Please contact us or schedule a consultation, and ask us about your specific needs.',
      },
    ],
    related: ['general-dentistry', 'laser-dentistry', 'periodontics'],
    relatedServiceIds: ['general-dentistry', 'laser-dentistry', 'periodontics'],
  },

  /* ─── 11. Same-Day Dentistry (REMOVED – ENABLED: FALSE) ─── */
  {
    slug: 'same-day-dentistry',
    id: 'same-day-dentistry',
    name: 'Same-Day Dentistry',
    title: 'Same-Day Dentistry',
    flagship: false,
    featured: false,
    enabled: false,
    confirmed: false,
    icon: 'Clock',
    doctors: ['himanshi-sharma', 'shailesh-sharma'],
    short: 'This service is currently disabled.',
    shortDescription: 'This service is currently disabled.',
    heroHeadline: 'Service Not Available',
    heroSubtitle: 'Please visit our other specialized services.',
    long: 'This service is no longer offered. Please consult our restorative dentistry or implantology services.',
    bullets: [],
    treatments: [],
    steps: [],
    faqs: [],
    related: ['restorative-dentistry'],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  const targetSlug = SERVICE_REDIRECTS[slug] || slug;
  return SERVICES.find((s) => s.slug === targetSlug || s.id === targetSlug);
}

export const getServiceById = getServiceBySlug;

export function getEnabledServices(): Service[] {
  return SERVICES.filter((s) => s.enabled);
}

export function getFlagshipServices(): Service[] {
  return SERVICES.filter((s) => s.enabled && s.flagship);
}
