import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'pomegranate' | 'brass' | 'success' | 'muted';
  /** Render as a small dot indicator instead of text */
  dot?: boolean;
  className?: string;
}

const variantStyles = {
  pomegranate: 'bg-pomegranate text-pearl',
  brass:       'bg-brass-deep text-pearl',
  success:     'bg-emerald-600 text-pearl',
  muted:       'bg-linen text-muted',
} as const;

const dotVariantStyles = {
  pomegranate: 'bg-pomegranate',
  brass:       'bg-brass-deep',
  success:     'bg-emerald-500',
  muted:       'bg-muted',
} as const;

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pomegranate',
  dot = false,
  className = '',
}) => {
  if (dot) {
    return (
      <span
        className={`inline-block w-2.5 h-2.5 rounded-full ${dotVariantStyles[variant]} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-sans text-[0.6875rem] font-bold leading-tight uppercase tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
