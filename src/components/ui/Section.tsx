import React from 'react';

type SectionVariant = 'enamel' | 'linen' | 'rose' | 'clove';

interface SectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
  /** Adds vertical section padding */
  padded?: boolean;
}

const variantStyles: Record<SectionVariant, string> = {
  enamel: 'bg-enamel text-ink',
  linen:  'bg-linen text-ink',
  rose:   'bg-rosewater text-ink',
  clove:  'bg-clove text-enamel',
};

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'enamel',
  className = '',
  id,
  padded = true,
}) => {
  const isDark = variant === 'clove';

  return (
    <section
      id={id}
      className={`${variantStyles[variant]} ${padded ? 'py-section' : ''} ${className}`}
      data-section-theme={isDark ? 'dark' : 'light'}
    >
      {children}
    </section>
  );
};
