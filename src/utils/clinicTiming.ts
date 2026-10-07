import { CLINIC } from '../data/clinic';

export interface ClinicTimingStatus {
  isOpen: boolean;
  statusText: string;
  badgeLabel: string;
  currentDayName: string;
  currentKolkataTime: string;
  displayHours: string;
  displayDays: string;
}

/**
 * Computes whether the clinic is currently open strictly using the Asia/Kolkata time zone,
 * ignoring the visitor's local system time zone.
 */
export function getClinicTimingStatus(referenceDate: Date = new Date()): ClinicTimingStatus {
  const timeZone = CLINIC.timing.timeZone; // "Asia/Kolkata"

  // Extract hours, minutes, and weekday in Asia/Kolkata
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'long',
  });

  const parts = formatter.formatToParts(referenceDate);
  const hourPart = parts.find((p) => p.type === 'hour')?.value || '0';
  const minutePart = parts.find((p) => p.type === 'minute')?.value || '0';
  const weekday = parts.find((p) => p.type === 'weekday')?.value || 'Monday';

  // Handle midnight 24 edge case in some Intl implementations
  const hour = parseInt(hourPart, 10) % 24;
  const minute = parseInt(minutePart, 10);
  const currentMinutes = hour * 60 + minute;

  const openMinutes = CLINIC.timing.openHour * 60 + CLINIC.timing.openMinute; // 10:00 AM = 600
  const closeMinutes = CLINIC.timing.closeHour * 60 + CLINIC.timing.closeMinute; // 9:00 PM = 1260

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  // Format 12-hour display time in Kolkata for transparency
  const timeDisplayFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const currentKolkataTime = timeDisplayFormatter.format(referenceDate);

  let statusText = '';
  if (isOpen) {
    statusText = `Open now · until 9:00 PM (IST)`;
  } else if (currentMinutes < openMinutes) {
    statusText = `Closed now · opens today at 10:00 AM (IST)`;
  } else {
    statusText = `Closed now · opens tomorrow at 10:00 AM (IST)`;
  }

  return {
    isOpen,
    statusText,
    badgeLabel: isOpen ? 'Open Now' : 'Closed Now',
    currentDayName: weekday,
    currentKolkataTime,
    displayHours: CLINIC.timing.displayHours,
    displayDays: CLINIC.timing.displayDays,
  };
}
