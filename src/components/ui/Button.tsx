import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'onDark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  to?: never;
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  as?: 'link';
  to: string;
  onClick?: never;
  type?: never;
  href?: never;
  target?: never;
  rel?: never;
}

interface ButtonAsAnchor extends ButtonBaseProps {
  as?: 'anchor';
  href: string;
  target?: string;
  rel?: string;
  to?: never;
  onClick?: never;
  type?: never;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-fluid-xs px-4 py-2 gap-1.5',
  md: 'text-fluid-sm px-6 py-3 gap-2',
  lg: 'text-fluid-base px-8 py-4 gap-2.5',
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-pomegranate hover:bg-pomegranate-dark text-pearl shadow-sm hover:shadow focus-visible:ring-pomegranate',
  outline:
    'border-2 border-pomegranate text-pomegranate hover:bg-rosewater/40 focus-visible:ring-pomegranate',
  ghost:
    'text-pomegranate hover:bg-rosewater/30 focus-visible:ring-pomegranate',
  onDark:
    'border-2 border-pearl/80 text-pearl hover:bg-pearl/15 focus-visible:ring-brass',
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon,
    iconRight,
    fullWidth = false,
    disabled = false,
  } = props;

  const baseStyles =
    'group relative inline-flex items-center justify-center font-sans font-semibold rounded-full ' +
    'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'active:scale-[0.98] select-none text-center overflow-hidden';

  const combined = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Enamel shine hover sweep – CSS-only, respects prefers-reduced-motion */
  const shine = (
    <span
      aria-hidden="true"
      className={
        'pointer-events-none absolute inset-0 -translate-x-full ' +
        'bg-gradient-to-r from-transparent via-pearl/20 to-transparent ' +
        'group-hover:animate-shine-sweep motion-reduce:hidden'
      }
    />
  );

  const inner = (
    <>
      {shine}
      {icon && <span className="relative z-10 flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && <span className="relative z-10 flex-shrink-0">{iconRight}</span>}
    </>
  );

  /* Render as React Router Link */
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={combined}>
        {inner}
      </Link>
    );
  }

  /* Render as anchor */
  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        className={combined}
        target={props.target}
        rel={props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)}
      >
        {inner}
      </a>
    );
  }

  /* Render as button */
  const { type = 'button', onClick } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combined}>
      {inner}
    </button>
  );
};
