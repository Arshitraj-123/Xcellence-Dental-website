/**
 * Formatting helpers for currency, phone, and IST clinic timing.
 * Adheres strictly to CLIENT FACTS:
 * - Currency: Indian Rupee (₹), formatted with en-IN.
 * - Phone: +91 96433 65651 (tel:+919643365651).
 * - Operating hours: 10:00 AM – 9:00 PM, computed in Asia/Kolkata (IST).
 */

import { CLINIC } from '@/data/clinic';

/**
 * Format a number into Indian Rupee currency (₹) using en-IN locale.
 * Example: formatRupees(1500) -> "₹1,500"
 */
export function formatRupees(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a raw number into Indian numbering system (e.g., 1,50,000).
 */
export function formatIndianNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Standard phone display string helper.
 */
export function formatDisplayPhone(phone: string = CLINIC.phone.display): string {
  return phone.trim();
}

/**
 * Formats a telephone URL scheme (tel:).
 */
export function formatTelLink(phone: string = CLINIC.phone.tel): string {
  const clean = phone.replace(/[^+\d]/g, '');
  return clean.startsWith('tel:') ? clean : `tel:${clean}`;
}

/**
 * Builds a direct WhatsApp chat link with optional pre-filled message.
 */
export function formatWhatsAppLink(
  phone: string = CLINIC.whatsappNumber,
  message?: string
): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const base = `https://wa.me/${cleanPhone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export interface OpenNowStatus {
  isOpen: boolean;
  statusText: string;
  nextChangeText: string;
  istTime: string;
}

/**
 * Computes whether the clinic is currently open strictly using the Asia/Kolkata time zone,
 * ignoring the visitor's local system time zone.
 */
export function isOpenNow(referenceDate: Date = new Date()): OpenNowStatus {
  const { open, close, tz } = CLINIC.hours;

  // Extract hours, minutes, and weekday in Asia/Kolkata
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'long',
  });

  const parts = formatter.formatToParts(referenceDate);
  const hourPart = parts.find((p) => p.type === 'hour')?.value || '0';
  const minutePart = parts.find((p) => p.type === 'minute')?.value || '0';

  const hour = parseInt(hourPart, 10) % 24;
  const minute = parseInt(minutePart, 10);
  const currentMinutes = hour * 60 + minute;

  const openMinutes = open * 60; // 10:00 AM = 600
  const closeMinutes = close * 60; // 9:00 PM = 1260

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  const timeDisplayFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const istTime = timeDisplayFormatter.format(referenceDate);

  let statusText = '';
  let nextChangeText = '';

  if (isOpen) {
    statusText = 'Open Now';
    nextChangeText = 'Closes at 9:00 PM IST';
  } else if (currentMinutes < openMinutes) {
    statusText = 'Closed';
    nextChangeText = 'Opens today at 10:00 AM IST';
  } else {
    statusText = 'Closed';
    nextChangeText = 'Opens tomorrow at 10:00 AM IST';
  }

  return {
    isOpen,
    statusText,
    nextChangeText,
    istTime,
  };
}
