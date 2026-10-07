import React from 'react';

interface EyebrowProps {
  children: React.ReactNode;
  /** Use 'dark' when on clove backgrounds */
  variant?: 'default' | 'dark';
  className?: string;
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const colorClass = variant === 'dark'
    ? 'text-brass'
    : 'text-pomegranate';

  return (
    <span
      className={`block font-sans text-fluid-xs font-bold uppercase tracking-[0.15em] ${colorClass} ${className}`}
    >
      {children}
    </span>
  );
};
