import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface ServiceIconMotionProps {
  slug: string;
  className?: string;
  size?: number;
}

/**
 * ServiceIconMotion:
 * Micro-animations on hover and focus:
 * - Laser: a thin beam sweeping across
 * - Implantology: an implant post lowering into a gum line
 * - Periodontics: a gentle gum-line wave
 * - General icons: outline stroke draw
 */
export const ServiceIconMotion: React.FC<ServiceIconMotionProps> = ({
  slug,
  className = '',
  size = 40,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isReducedMotion } = useReducedMotionPreference();

  const handleEnter = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  // 1. LASER DENTISTRY
  if (slug === 'laser-dentistry') {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-rosewater/50 p-2 text-pomegranate ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-hidden="true"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Handpiece nozzle */}
          <path d="M4 4 L14 14" strokeLinecap="round" />
          <path d="M12 12 L17 17" strokeLinecap="round" strokeWidth="3" />
          <circle cx="19" cy="19" r="2" fill="currentColor" />
        </svg>

        {/* Sweeping Laser Beam */}
        {!isReducedMotion && isHovered && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 w-2 bg-gradient-to-r from-transparent via-brass to-transparent pointer-events-none shadow-[0_0_8px_rgba(193,154,91,0.9)]"
            initial={{ x: '-100%' }}
            animate={{ x: '350%' }}
            transition={{ duration: 0.65, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}
      </div>
    );
  }

  // 2. IMPLANTOLOGY
  if (slug === 'implantology') {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-brass/15 p-2 text-brass-deep ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-hidden="true"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 28" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Bone / Gum Base */}
          <path d="M2 24 C8 23, 16 23, 22 24" strokeWidth="2.5" strokeLinecap="round" />

          {/* Implant Post Lowering into Gum Line */}
          <motion.g
            animate={
              !isReducedMotion && isHovered
                ? { y: [0, 5, 0], rotate: [0, 4, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* Abutment */}
            <rect x="7" y="3" width="10" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
            {/* Body */}
            <path d="M8 7 L16 7 L14 22 L10 22 Z" fill="currentColor" fillOpacity="0.1" />
            {/* Threads */}
            <line x1="8" y1="10" x2="16" y2="11" />
            <line x1="8.5" y1="14" x2="15.5" y2="15" />
            <line x1="9" y1="18" x2="15" y2="19" />
          </motion.g>
        </svg>
      </div>
    );
  }

  // 3. PERIODONTICS
  if (slug === 'periodontics') {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-rosewater/50 p-2 text-pomegranate ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-hidden="true"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 28 24" className="w-full h-full overflow-visible" fill="none" stroke="currentColor" strokeWidth="2">
          {/* Tooth Crown in Bone */}
          <path d="M9 4 C9 12, 11 16, 14 18 C17 16, 19 12, 19 4 Z" fill="currentColor" fillOpacity="0.1" />

          {/* Gentle Gum-line wave undulating */}
          <motion.path
            d="M 2 12 Q 7 6, 14 12 Q 21 18, 26 12"
            strokeLinecap="round"
            strokeWidth="2.5"
            animate={
              !isReducedMotion && isHovered
                ? { y: [-1, 2, -1], scaleY: [1, 1.25, 1] }
                : { y: 0, scaleY: 1 }
            }
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  }

  // 4. GENERAL ICONS (Outline stroke draw)
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-linen p-2 text-clove ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
        <motion.path
          d="M12 2 C7 2, 4 6, 5 12 C6 18, 9 22, 12 22 C15 22, 18 18, 19 12 C20 6, 17 2, 12 2 Z"
          initial={false}
          animate={
            !isReducedMotion && isHovered
              ? { pathLength: [0, 1] }
              : { pathLength: 1 }
          }
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
      </svg>
    </div>
  );
};
