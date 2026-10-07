import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

/**
 * FlossProgress:
 * Header scroll indicator featuring a silk floss thread with a tiny travelling tooth icon.
 * Pure transform-based (scaleX and translateX) for silky 60fps performance without layout shifts.
 */
export const FlossProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { isReducedMotion } = useReducedMotionPreference();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 35,
    restDelta: 0.001,
  });

  const toothX = useTransform(scaleX, [0, 1], ['0%', '100%']);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-[3px] bg-linen/70 overflow-visible select-none pointer-events-none z-50"
    >
      {/* Dental Floss Line (scaleX transform) */}
      <motion.div
        className="h-full bg-brass-deep origin-left shadow-[0_0_8px_rgba(166,124,58,0.4)]"
        style={{ scaleX }}
      />

      {/* Travelling Tooth Icon (translateX transform) */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(42,22,32,0.2)]"
        style={{ left: toothX }}
      >
        <svg
          viewBox="0 0 48 52"
          className="w-3.5 h-3.5 overflow-visible"
          fill="#8C2F4B"
          aria-hidden="true"
        >
          <path d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z" />
          <path
            d="M14 20c6 7 14 7 20 0"
            fill="none"
            stroke="#A67C3A"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};
