import React from 'react';

interface CardProps {
  children: React.ReactNode;
  /** Visual style */
  variant?: 'pearl' | 'linen' | 'rose' | 'outline';
  /** Border radius */
  radius?: 'sm' | 'default' | 'lg';
  /** Apply elevation shadow */
  elevated?: boolean;
  /** Hover lift effect */
  hoverable?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles = {
  pearl:   'bg-pearl border border-linen/60',
  linen:   'bg-linen border border-linen',
  rose:    'bg-rosewater/50 border border-rosewater',
  outline: 'bg-transparent border-2 border-pomegranate/20',
} as const;

const radiusStyles = {
  sm:      'rounded-card-sm',
  default: 'rounded-card',
  lg:      'rounded-card-lg',
} as const;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'pearl',
  radius = 'default',
  elevated = false,
  hoverable = false,
  className = '',
  as: Tag = 'div',
}) => {
  return (
    <Tag
      className={[
        variantStyles[variant],
        radiusStyles[radius],
        elevated ? 'shadow-soft' : '',
        hoverable
          ? 'transition-all duration-200 hover:shadow-card-elevated hover:-translate-y-1 motion-reduce:hover:translate-y-0'
          : '',
        'overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
};
