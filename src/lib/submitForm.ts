/**
 * Form submission infrastructure for Xcellence Dental Clinic.
 *
 * Requirements:
 * - If VITE_FORM_ENDPOINT is set: POST JSON with timeout (10s) and error handling.
 * - If VITE_FORM_ENDPOINT is NOT set (frontend-only now):
 *   Prepares a "Review and send" payload with 3 real actions:
 *   1. Send on WhatsApp (wa.me link with pre-filled message)
 *   2. Email us (mailto: xcellencedentalharidwar@gmail.com with subject and body)
 *   3. Call now (tel: link)
 *   Note: "Your request is sent when you tap Send."
 * - Shared validation:
 *   - Name required (min 2 chars, trimmed)
 *   - Indian mobile validation: 10 digits, optional +91/91/0 prefix, starts with 6-9
 *   - Optional email format
 *   - Text trim and sanitation
 *   - Hidden honeypot field
 * - Offline or failure fallback: provides clinic phone & WhatsApp links.
 */

import { CLINIC } from '@/data/clinic';

export interface FormPayload {
  formType: 'appointment' | 'contact' | 'emi';
  name: string;
  phone: string;
  email?: string;
  service?: string;
  doctor?: string;
  preferredDate?: string;
  preferredTime?: string;
  reason?: string;
  notes?: string;
  treatmentCost?: number;
  downPayment?: number;
  months?: number;
  monthlyEstimate?: number;
  botField?: string; // honeypot
  [key: string]: unknown;
}

export interface SummaryItem {
  label: string;
  value: string;
}

export interface ReviewActionData {
  title: string;
  summaryItems: SummaryItem[];
  whatsappUrl: string;
  mailtoUrl: string;
  callUrl: string;
  note: string;
  rawMessage: string;
}

export interface SubmitFormResult {
  success: boolean;
  mode?: 'endpoint' | 'review';
  message?: string;
  error?: string;
  isOffline?: boolean;
  reviewData?: ReviewActionData;
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  doctor?: string;
  preferredDate?: string;
  preferredTime?: string;
  [key: string]: string | undefined;
}

/**
 * Strips HTML tags and trims leading/trailing whitespace.
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .trim();
}

/**
 * Validates an Indian mobile phone number:
 * Accepts:
 * - 10 digits starting with 6, 7, 8, 9
 * - Optional +91, 91, or 0 prefix
 * - Spaces and hyphens allowed during typing
 */
export function validateIndianMobile(rawPhone: string): {
  isValid: boolean;
  cleaned: string;
  error?: string;
} {
  if (!rawPhone || !rawPhone.trim()) {
    return { isValid: false, cleaned: '', error: 'Mobile number is required.' };
  }

  // Remove common punctuation: spaces, hyphens, brackets
  const cleanedPunctuation = rawPhone.replace(/[\s\-()]/g, '');

  // Extract 10-digit number removing prefix
  let tenDigitNumber = cleanedPunctuation;
  if (tenDigitNumber.startsWith('+91')) {
    tenDigitNumber = tenDigitNumber.slice(3);
  } else if (tenDigitNumber.startsWith('91') && tenDigitNumber.length === 12) {
    tenDigitNumber = tenDigitNumber.slice(2);
  } else if (tenDigitNumber.startsWith('0') && tenDigitNumber.length === 11) {
    tenDigitNumber = tenDigitNumber.slice(1);
  }

  // Must be exactly 10 digits and start with 6, 7, 8, or 9
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!indianMobileRegex.test(tenDigitNumber)) {
    return {
      isValid: false,
      cleaned: tenDigitNumber,
      error: 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).',
    };
  }

  return {
    isValid: true,
    cleaned: `+91 ${tenDigitNumber.slice(0, 5)} ${tenDigitNumber.slice(5)}`,
  };
}

/**
 * Validates full name.
 */
export function validateName(rawName: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeText(rawName);
  if (!sanitized) {
    return { isValid: false, error: 'Full name is required.' };
  }
  if (sanitized.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }
  return { isValid: true };
}

/**
 * Validates optional email.
 */
export function validateEmail(rawEmail?: string): { isValid: boolean; error?: string } {
  if (!rawEmail || !rawEmail.trim()) {
    return { isValid: true }; // optional
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawEmail.trim())) {
    return { isValid: false, error: 'Please enter a valid email address (or leave empty).' };
  }
  return { isValid: true };
}

/**
 * Runs common form validation.
 */
export function validateCommonFields(payload: Partial<FormPayload>): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  const nameCheck = validateName(payload.name || '');
  if (!nameCheck.isValid) {
    errors.name = nameCheck.error;
  }

  const phoneCheck = validateIndianMobile(payload.phone || '');
  if (!phoneCheck.isValid) {
    errors.phone = phoneCheck.error;
  }

  if (payload.email) {
    const emailCheck = validateEmail(payload.email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds formatted text and links for WhatsApp, Email (mailto), and Call.
 */
function buildCommunicationLinks(payload: FormPayload): {
  whatsappUrl: string;
  mailtoUrl: string;
  callUrl: string;
  summaryItems: SummaryItem[];
  rawMessage: string;
} {
  const summaryItems: SummaryItem[] = [];

  const add = (label: string, value?: string | number) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      summaryItems.push({ label, value: String(value) });
    }
  };

  add('Name', payload.name);
  add('Phone', payload.phone);
  if (payload.email) add('Email', payload.email);

  if (payload.formType === 'appointment') {
    add('Service Requested', payload.service);
    add('Preferred Doctor', payload.doctor);
    add('Preferred Date', payload.preferredDate);
    add('Preferred Time', payload.preferredTime);
    if (payload.notes) add('Notes', payload.notes);
  } else if (payload.formType === 'contact') {
    if (payload.reason) add('Reason / Service', payload.reason);
    if (payload.notes) add('Message', payload.notes);
  } else if (payload.formType === 'emi') {
    if (payload.treatmentCost) add('Estimated Treatment Cost', `₹${payload.treatmentCost.toLocaleString('en-IN')}`);
    if (payload.downPayment !== undefined) add('Down Payment', `${payload.downPayment}%`);
    if (payload.months) add('Repayment Duration', `${payload.months} Months`);
    if (payload.monthlyEstimate) add('Estimated Monthly EMI', `₹${payload.monthlyEstimate.toLocaleString('en-IN')}/mo`);
    if (payload.notes) add('Patient Note', payload.notes);
  }

  // Format WhatsApp message
  const titleMap = {
    appointment: 'Dental Appointment Request',
    contact: 'General Clinic Inquiry',
    emi: 'Payment & EMI Financing Inquiry',
  };
  const title = titleMap[payload.formType] || 'Patient Inquiry';

  const waLines = [
    `*${title} — ${CLINIC.name}*`,
    `--------------------------------`,
    ...summaryItems.map((item) => `*${item.label}:* ${item.value}`),
    `--------------------------------`,
    `_Sent via official website request_`,
  ];
  const rawMessage = waLines.join('\n');
  const whatsappUrl = `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

  // Format mailto link
  const emailSubject = `${title}: ${payload.name}`;
  const emailBody = [
    `Hello ${CLINIC.name} Team,`,
    '',
    `I am submitting a ${title.toLowerCase()} through your clinic website:`,
    '',
    ...summaryItems.map((item) => `${item.label}: ${item.value}`),
    '',
    'Please get in touch with me to confirm.',
    '',
    'Thank you,',
    payload.name,
    payload.phone,
  ].join('\n');

  const mailtoUrl = `mailto:${CLINIC.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const callUrl = CLINIC.phoneTel;

  return {
    whatsappUrl,
    mailtoUrl,
    callUrl,
    summaryItems,
    rawMessage,
  };
}

/**
 * Primary form submission dispatcher.
 */
export async function submitForm(payload: FormPayload): Promise<SubmitFormResult> {
  // 1. Honeypot security check: bot detected
  if (payload.botField && payload.botField.trim() !== '') {
    // Silently drop spam submissions without giving bots feedback
    return {
      success: true,
      mode: 'review',
      message: 'Request processed.',
    };
  }

  // 2. Sanitize payload text inputs
  const sanitized: FormPayload = {
    ...payload,
    name: sanitizeText(payload.name),
    phone: sanitizeText(payload.phone),
    email: payload.email ? sanitizeText(payload.email) : undefined,
    service: payload.service ? sanitizeText(payload.service) : undefined,
    doctor: payload.doctor ? sanitizeText(payload.doctor) : undefined,
    notes: payload.notes ? sanitizeText(payload.notes) : undefined,
    reason: payload.reason ? sanitizeText(payload.reason) : undefined,
  };

  // 3. Check for external backend endpoint
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

  if (endpoint && typeof endpoint === 'string' && endpoint.trim() !== '') {
    // Mode A: Post to actual endpoint (Formspree, Web3Forms, or future backend)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(endpoint.trim(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(sanitized),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      return {
        success: true,
        mode: 'endpoint',
        message: 'Your request has been received by our clinic desk. We will call you shortly to confirm.',
      };
    } catch (err: unknown) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError';
      const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

      return {
        success: false,
        isOffline,
        error: isAbort
          ? 'Request timed out. Please send directly via WhatsApp or call our desk.'
          : 'Unable to reach the server. Please contact us directly via WhatsApp or phone.',
      };
    }
  }

  // Mode B: Honest Frontend Mode (VITE_FORM_ENDPOINT is not set)
  // Instead of pretending to send, open the "Review and send" Dialog with real dispatch actions.
  const { whatsappUrl, mailtoUrl, callUrl, summaryItems, rawMessage } = buildCommunicationLinks(sanitized);

  const titleMap = {
    appointment: 'Appointment Request',
    contact: 'Contact Inquiry',
    emi: 'Payment & EMI Enquiry',
  };

  return {
    success: true,
    mode: 'review',
    reviewData: {
      title: titleMap[sanitized.formType] || 'Patient Request',
      summaryItems,
      whatsappUrl,
      mailtoUrl,
      callUrl,
      note: 'Your request is sent when you tap Send.',
      rawMessage,
    },
  };
}
