import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '@/lib/motionTokens';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition (Smile Wipe):
 * Smooth elliptical smile wipe transition that never delays navigation by more than 450ms (tuned to 350ms).
 * Strictly falls back to instant static state when prefers-reduced-motion or global toggle is active.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const sysReducedMotion = useReducedMotion();
  const { isReducedMotion } = useReducedMotionPreference();
  const shouldReduceMotion = Boolean(sysReducedMotion || isReducedMotion);

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{
          opacity: 0.9,
          clipPath: 'ellipse(120% 0% at 50% 100%)',
        }}
        animate={{
          opacity: 1,
          clipPath: 'ellipse(160% 160% at 50% 50%)',
        }}
        exit={{
          opacity: 0.9,
          clipPath: 'ellipse(120% 0% at 50% 0%)',
        }}
        transition={{
          duration: MOTION_DURATIONS.pageTransition, // 0.35s <= 450ms
          ease: MOTION_EASINGS.gentle,
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
