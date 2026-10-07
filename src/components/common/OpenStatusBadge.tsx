import React, { useEffect, useState } from 'react';
import { getClinicTimingStatus, ClinicTimingStatus } from '../../utils/clinicTiming';

interface OpenStatusBadgeProps {
  showFullText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const OpenStatusBadge: React.FC<OpenStatusBadgeProps> = ({
  showFullText = true,
  className = '',
  variant = 'light',
}) => {
  const [status, setStatus] = useState<ClinicTimingStatus>(() => getClinicTimingStatus());

  useEffect(() => {
    // Recompute every 60 seconds
    const interval = setInterval(() => {
      setStatus(getClinicTimingStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
        status.isOpen
          ? isDark
            ? 'bg-rosewater/20 border-rosewater/40 text-enamel'
            : 'bg-rosewater/50 border-rosewater text-pomegranate'
          : isDark
            ? 'bg-clove/60 border-brass/30 text-brass'
            : 'bg-linen border-ink/15 text-muted'
      } ${className}`}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse ${
          status.isOpen ? 'bg-pomegranate' : 'bg-muted'
        }`}
        aria-hidden="true"
      />
      <span>{showFullText ? status.statusText : status.badgeLabel}</span>
    </div>
  );
};
