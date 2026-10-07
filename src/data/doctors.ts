/**
 * Doctors data for Xcellence Dental Clinic.
 * CLIENT FACTS:
 * - Dr Himanshi Sharma, BDS, MDS (Periodontist and Implantologist)
 * - Dr Shailesh Sharma, Certified Laser Dentist and Implantologist
 * Never invent degrees, awards, or years.
 */

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  qualifications: string;
  role: string;
  photo: string;
  image: string; // compatibility
  imageAlt: string;
  bio: string;
  focusAreas: string[];
  quote?: {
    text: string;
    author: string;
  };
  slotId: string;
  doctor: Doctor;
}

const docHimanshi: Doctor = {
  id: 'himanshi-sharma',
  slug: 'himanshi-sharma',
  slotId: 'himanshi-sharma',
  name: 'Dr Himanshi Sharma',
  qualifications: 'BDS, MDS (Periodontist and Implantologist)',
  role: 'Periodontist and Implantologist',
  photo: '/images/doctors/himanshi-sharma.jpg',
  image: '/images/doctors/himanshi-sharma.jpg',
  imageAlt: 'Dr Himanshi Sharma – Periodontist and Implantologist at Xcellence Dental Clinic',
  bio: 'Dr Himanshi Sharma (BDS, MDS) is a Periodontist and Implantologist with specialized training in gum health and dental implants. She focuses on diagnosing and managing periodontal conditions, restoring bone and tissue support, and placing precision dental implants. Her practice emphasizes gentle, thorough patient care to preserve natural teeth and support lasting oral health.',
  focusAreas: ['Periodontics', 'Implantology'],
  quote: {
    text: 'Preserving the natural foundation of your teeth and gums with gentle, evidence-based care.',
    author: 'Dr Himanshi Sharma',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doctor: null as any,
};
docHimanshi.doctor = docHimanshi;

const docShailesh: Doctor = {
  id: 'shailesh-sharma',
  slug: 'shailesh-sharma',
  slotId: 'shailesh-sharma',
  name: 'Dr Shailesh Sharma',
  qualifications: 'Certified Laser Dentist and Implantologist',
  role: 'Certified Laser Dentist and Implantologist',
  photo: '/images/doctors/shailesh-sharma.jpg',
  image: '/images/doctors/shailesh-sharma.jpg',
  imageAlt: 'Dr Shailesh Sharma – Certified Laser Dentist and Implantologist at Xcellence Dental Clinic',
  bio: 'Dr Shailesh Sharma is a Certified Laser Dentist and Implantologist offering modern, minimally invasive dental procedures. He utilizes laser dental techniques for soft tissue therapies and patient comfort, alongside comprehensive implant placement. His clinical focus is on delivering precise, gentle treatments tailored to each patient.',
  focusAreas: ['Laser Dentistry', 'Implantology'],
  quote: {
    text: 'Modern dental techniques make treatment gentler and recovery smoother for every patient.',
    author: 'Dr Shailesh Sharma',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  doctor: null as any,
};
docShailesh.doctor = docShailesh;

export const DOCTORS: Doctor[] = [docHimanshi, docShailesh];

export type DoctorSlot = Doctor;

export function getDoctorBySlug(slug?: string): Doctor | undefined {
  if (!slug) return undefined;
  return DOCTORS.find((d) => d.slug === slug || d.id === slug);
}

export function getDoctorBySlot(slotId?: string): Doctor | undefined {
  if (!slotId) return DOCTORS[0];
  return DOCTORS.find((d) => d.slug === slotId || d.id === slotId) || DOCTORS[0];
}
