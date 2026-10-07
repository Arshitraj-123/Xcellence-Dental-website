import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
  fullWidth = false,
  target,
  rel,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] select-none text-center enamel-btn-shine';

  const sizeStyles = {
    sm: 'text-xs sm:text-sm px-4 py-2 gap-1.5',
    md: 'text-sm sm:text-base px-6 py-3 gap-2',
    lg: 'text-base sm:text-lg px-8 py-4 gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-pomegranate hover:bg-pomegranate-dark text-pearl shadow-sm hover:shadow focus-visible:ring-pomegranate',
    secondary:
      'bg-brass hover:bg-brass-deep text-clove shadow-sm hover:shadow focus-visible:ring-brass',
    outline:
      'border-2 border-pomegranate text-pomegranate hover:bg-rosewater/40 focus-visible:ring-pomegranate',
    ghost:
      'border-2 border-pearl/80 text-pearl hover:bg-pearl/15 focus-visible:ring-pearl',
    subtle:
      'bg-rosewater/70 hover:bg-rosewater text-pomegranate focus-visible:ring-pomegranate',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
  }`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
