import React, { useEffect, useState } from 'react';
import { CLINIC } from '../../data/clinic';

export const PageLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show smooth intro splash loader on initial site load
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Xcellence Dental Clinic"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-enamel text-ink transition-opacity duration-500"
    >
      <div className="relative w-20 h-24 mb-4 animate-pulse">
        <svg viewBox="0 0 48 52" className="w-full h-full" aria-hidden="true">
          <path
            d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z"
            fill="#8C2F4B"
          />
          <path
            d="M14 20c6 7 14 7 20 0"
            fill="none"
            stroke="#A67C3A"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-bold text-clove tracking-tight">
          {CLINIC.name}
        </h2>
        <p className="text-xs font-sans text-pomegranate font-medium tracking-wide">
          All specialties in one location
        </p>
      </div>

      <div className="w-48 h-1 bg-rosewater rounded-full overflow-hidden">
        <div className="w-full h-full bg-pomegranate animate-[shimmer_1s_infinite] origin-left" />
      </div>
      <p className="text-xs text-muted mt-2 font-sans">Haridwar, Uttarakhand</p>
    </div>
  );
};
