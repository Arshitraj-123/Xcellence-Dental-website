import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'rosewater' | 'brass' | 'clove' | 'linen' | 'pomegranate';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'rosewater',
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5',
    md: 'text-xs sm:text-sm px-3.5 py-1',
  }[size];

  const variantClasses = {
    rosewater: 'bg-rosewater text-pomegranate font-medium',
    brass: 'bg-brass/20 text-brass-deep font-semibold border border-brass/30',
    clove: 'bg-clove text-enamel font-medium',
    linen: 'bg-linen text-ink font-medium border border-ink/10',
    pomegranate: 'bg-pomegranate text-pearl font-medium',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none tracking-wide ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
};
