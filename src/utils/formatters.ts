import { CLINIC } from '../data/clinic';

/**
 * Format a number into Indian Rupee currency (₹) using en-IN locale
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CLINIC.currency.locale, {
    style: 'currency',
    currency: CLINIC.currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format raw number with Indian numbering system (e.g., 1,50,000)
 */
export function formatIndianNumber(value: number): string {
  return new Intl.NumberFormat(CLINIC.currency.locale).format(value);
}

/**
 * Format a 10-digit or international phone number
 */
export function formatPhoneNumber(phone: string): string {
  return phone.trim();
}
