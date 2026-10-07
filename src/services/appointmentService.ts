import { CLINIC } from '../data/clinic';

export interface AppointmentRequest {
  service: string;
  doctor: string;
  preferredDate?: string;
  preferredTime?: string;
  fullName: string;
  phone: string;
  email?: string;
  patientType?: 'new' | 'returning';
  notes?: string;
}

export interface ContactInquiry {
  fullName: string;
  phone: string;
  email?: string;
  serviceCategory?: string;
  message?: string;
}

export interface ServiceSubmissionResult {
  status: 'ready_for_dispatch';
  whatsappUrl: string;
  phoneUrl: string;
  message: string;
  data: AppointmentRequest | ContactInquiry;
}

/**
 * Builds a direct WhatsApp dispatch URL with pre-filled details.
 * This ensures the patient's request is directly communicated to the clinic
 * without pretending an unlinked server received it.
 */
export function buildWhatsAppAppointmentMessage(data: AppointmentRequest): string {
  const parts = [
    `*Appointment Request - ${CLINIC.name}*`,
    `--------------------------------`,
    `*Patient Name:* ${data.fullName}`,
    `*Phone:* ${data.phone}`,
    data.email ? `*Email:* ${data.email}` : null,
    `*Service:* ${data.service}`,
    `*Preferred Doctor:* ${data.doctor}`,
    data.preferredDate ? `*Preferred Date:* ${data.preferredDate}` : null,
    data.preferredTime ? `*Preferred Time:* ${data.preferredTime}` : null,
    data.patientType ? `*Patient Status:* ${data.patientType === 'new' ? 'New Patient' : 'Existing Patient'}` : null,
    data.notes ? `*Notes:* ${data.notes}` : null,
  ].filter(Boolean);

  const rawText = parts.join('\n');
  return `https://wa.me/919643365651?text=${encodeURIComponent(rawText)}`;
}

/**
 * Service handler for appointment requests.
 * Structured so that swapping to a backend API (e.g. POST /api/appointments)
 * is as simple as replacing this function body in one place.
 */
export async function submitAppointment(data: AppointmentRequest): Promise<ServiceSubmissionResult> {
  // In frontend-only mode, we generate direct action endpoints
  const whatsappUrl = buildWhatsAppAppointmentMessage(data);

  return {
    status: 'ready_for_dispatch',
    whatsappUrl,
    phoneUrl: CLINIC.phoneTel,
    message: 'Your appointment details are prepared.',
    data,
  };
}

/**
 * Service handler for general inquiries.
 */
export async function submitContactInquiry(data: ContactInquiry): Promise<ServiceSubmissionResult> {
  const parts = [
    `*Inquiry - ${CLINIC.name}*`,
    `--------------------------------`,
    `*Name:* ${data.fullName}`,
    `*Phone:* ${data.phone}`,
    data.email ? `*Email:* ${data.email}` : null,
    data.serviceCategory ? `*Service Interested:* ${data.serviceCategory}` : null,
    data.message ? `*Message:* ${data.message}` : null,
  ].filter(Boolean);

  const rawText = parts.join('\n');
  const whatsappUrl = `https://wa.me/919643365651?text=${encodeURIComponent(rawText)}`;

  return {
    status: 'ready_for_dispatch',
    whatsappUrl,
    phoneUrl: CLINIC.phoneTel,
    message: 'Your message is ready to send.',
    data,
  };
}
