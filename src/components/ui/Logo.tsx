import React from 'react';
import { Link } from 'react-router-dom';
import { CLINIC } from '@/data/clinic';

/* ─── Logo Variants ─── */
export type LogoVariant = 'full' | 'compact' | 'mark-only';
export type LogoColorScheme = 'default' | 'dark' | 'mono-white';

interface LogoProps {
  /** Force a specific variant. If omitted, the component auto-switches responsively. */
  forceVariant?: LogoVariant;
  /** Colour scheme */
  colorScheme?: LogoColorScheme;
  /** Custom tooth colour (overrides colorScheme) */
  toothColor?: string;
  /** Custom smile colour (overrides colorScheme) */
  smileColor?: string;
  /** Link to home page */
  linkToHome?: boolean;
  className?: string;
}

/* Theme colour presets */
const colorPresets: Record<LogoColorScheme, { tooth: string; smile: string; title: string; tagline: string }> = {
  default: {
    tooth:   '#8C2F4B', // pomegranate
    smile:   '#A67C3A', // brass-deep
    title:   'text-clove',
    tagline: 'text-pomegranate',
  },
  dark: {
    tooth:   '#FBF8F2', // enamel
    smile:   '#C19A5B', // brass
    title:   'text-enamel',
    tagline: 'text-brass',
  },
  'mono-white': {
    tooth:   '#FFFFFF',
    smile:   '#FFFFFF',
    title:   'text-white',
    tagline: 'text-white/80',
  },
};

/* SVG Tooth Mark */
const ToothMark: React.FC<{ tooth: string; smile: string }> = ({ tooth, smile }) => (
  <svg
    viewBox="0 0 48 52"
    className="h-full w-auto overflow-visible"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z"
      fill={tooth}
    />
    <path
      d="M14 20c6 7 14 7 20 0"
      fill="none"
      stroke={smile}
      strokeWidth="4.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  forceVariant,
  colorScheme = 'default',
  toothColor,
  smileColor,
  linkToHome = true,
  className = '',
}) => {
  const preset = colorPresets[colorScheme];
  const tooth = toothColor || preset.tooth;
  const smile = smileColor || preset.smile;

  const content = (
    <div
      className={`inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 select-none ${className}`}
      /* min 44x44 tap area for accessibility guidelines */
      style={{ minWidth: 44, minHeight: 44 }}
    >
      {/* Mark — always visible, fluid height: 32px on 320px, 36px on mobile, 42px on desktop */}
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{ height: 'clamp(32px, 2.5vw + 24px, 42px)' }}
      >
        <ToothMark tooth={tooth} smile={smile} />
      </div>

      {/* ─── 1. Forced Variant: Full ─── */}
      {forceVariant === 'full' && (
        <div className="flex flex-col text-left leading-none min-w-0">
          <span
            className={`font-serif font-bold tracking-tight ${preset.title} truncate`}
            style={{ fontSize: 'clamp(0.95rem, 0.82rem + 0.45vw, 1.25rem)' }}
          >
            {CLINIC.name}
          </span>
          <span
            className={`font-sans font-medium tracking-wide mt-0.5 ${preset.tagline} truncate`}
            style={{ fontSize: 'clamp(0.58rem, 0.52rem + 0.18vw, 0.72rem)' }}
          >
            All specialties in one location
          </span>
        </div>
      )}

      {/* ─── 2. Forced Variant: Compact ─── */}
      {forceVariant === 'compact' && (
        <div className="flex flex-col text-left leading-none min-w-0">
          <span
            className={`font-serif font-bold tracking-tight ${preset.title} whitespace-nowrap`}
            style={{ fontSize: 'clamp(0.88rem, 0.8rem + 0.35vw, 1.1rem)' }}
          >
            Xcellence Dental
          </span>
        </div>
      )}

      {/* ─── 3. Auto-Responsive Variant (when forceVariant is omitted) ─── */}
      {!forceVariant && (
        <>
          {/* Desktop (>= 1024px): Full Wordmark with Tagline */}
          <div className="hidden lg:flex flex-col text-left leading-none min-w-0">
            <span
              className={`font-serif font-bold tracking-tight ${preset.title}`}
              style={{ fontSize: 'clamp(1.1rem, 0.95rem + 0.4vw, 1.3rem)' }}
            >
              {CLINIC.name}
            </span>
            <span
              className={`font-sans font-medium tracking-wide mt-0.5 ${preset.tagline}`}
              style={{ fontSize: 'clamp(0.62rem, 0.55rem + 0.2vw, 0.75rem)' }}
            >
              All specialties in one location
            </span>
          </div>

          {/* Mobile & Tablet (< 1024px): Compact Wordmark down to 320px, no awkward hiding */}
          <div className="flex lg:hidden flex-col text-left leading-none min-w-0">
            <span
              className={`font-serif font-bold tracking-tight ${preset.title} whitespace-nowrap`}
              style={{ fontSize: 'clamp(0.82rem, 0.74rem + 0.3vw, 1.05rem)' }}
            >
              Xcellence Dental
            </span>
          </div>
        </>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-lg group inline-flex items-center"
        aria-label="Xcellence Dental Clinic"
      >
        {content}
      </Link>
    );
  }

  return (
    <div aria-label="Xcellence Dental Clinic" role="img" className="inline-flex items-center">
      {content}
    </div>
  );
};
