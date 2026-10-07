import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'pomegranate' | 'brass';
  /** Makes the chip interactive (clickable) */
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default:     'bg-linen text-ink border border-linen',
  pomegranate: 'bg-rosewater/60 text-pomegranate border border-rosewater',
  brass:       'bg-brass/10 text-brass-deep border border-brass/30',
} as const;

const activeStyles = {
  default:     'bg-ink text-pearl border-ink',
  pomegranate: 'bg-pomegranate text-pearl border-pomegranate',
  brass:       'bg-brass-deep text-pearl border-brass-deep',
} as const;

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  active = false,
  onClick,
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans text-fluid-xs font-medium transition-colors';

  const colorClasses = active ? activeStyles[variant] : variantStyles[variant];
  const interactive = onClick
    ? 'cursor-pointer hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate focus-visible:ring-offset-1'
    : '';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${colorClasses} ${interactive} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <span className={`${baseClasses} ${colorClasses} ${className}`}>
      {children}
    </span>
  );
};
