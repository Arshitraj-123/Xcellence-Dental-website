import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CLINIC } from '@/data/clinic';

import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface ToothLoaderProps {
  /** If true, acts as full-screen initial splash loader */
  isInitialLoad?: boolean;
  /** If true, acts as centered route-level suspense fallback */
  isSuspense?: boolean;
}

export const ToothLoader: React.FC<ToothLoaderProps> = ({
  isInitialLoad = false,
  isSuspense = false,
}) => {
  const [visible, setVisible] = useState(true);
  const sysReducedMotion = useReducedMotion();
  const { isReducedMotion } = useReducedMotionPreference();
  const shouldReduceMotion = Boolean(sysReducedMotion || isReducedMotion);

  useEffect(() => {
    if (!isInitialLoad) return;

    // Minimum display 700ms, maximum 3000ms per requirements (850ms)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 850);

    return () => clearTimeout(timer);
  }, [isInitialLoad]);

  if (isInitialLoad && !visible) {
    return null;
  }

  const content = (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Xcellence Dental Clinic"
      className={
        isSuspense
          ? 'min-h-[55vh] flex flex-col items-center justify-center p-8 bg-enamel text-ink select-none'
          : 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-enamel text-ink select-none'
      }
    >
      <div className="relative w-20 h-24 mb-4 select-none">
        <svg
          viewBox="0 0 48 52"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          {shouldReduceMotion ? (
            /* Static Logo for Reduced Motion */
            <>
              <path
                d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z"
                fill="#8C2F4B"
              />
              <path
                d="M14 20c6 7 14 7 20 0"
                fill="none"
                stroke="#A67C3A"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            /* Animated SVG: Outline -> Enamel/Pomegranate Fill -> Smile Curve */
            <>
              {/* Tooth body & outline */}
              <motion.path
                d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z"
                initial={{ pathLength: 0, fill: 'rgba(140, 47, 75, 0)', stroke: '#8C2F4B' }}
                animate={{
                  pathLength: 1,
                  fill: 'rgba(140, 47, 75, 1)',
                  stroke: '#8C2F4B',
                }}
                transition={{
                  pathLength: { duration: 0.5, ease: 'easeInOut' },
                  fill: { duration: 0.35, delay: 0.35, ease: 'easeOut' },
                }}
                strokeWidth="2"
              />

              {/* Smile curve */}
              <motion.path
                d="M14 20c6 7 14 7 20 0"
                fill="none"
                stroke="#A67C3A"
                strokeWidth="4.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.5,
                  ease: 'easeInOut',
                }}
              />

              {/* Sparkle burst at the end */}
              <motion.path
                d="M34 8 L35.5 12 L39.5 13.5 L35.5 15 L34 19 L32.5 15 L28.5 13.5 L32.5 12 Z"
                fill="#C19A5B"
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.9], rotate: [0, 15, 0] }}
                transition={{
                  duration: 0.4,
                  delay: 0.8,
                  ease: 'easeOut',
                }}
              />
            </>
          )}
        </svg>
      </div>

      <div className="text-center space-y-1">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove tracking-tight">
          {CLINIC.name}
        </h2>
        <p className="text-xs sm:text-sm font-sans text-pomegranate font-medium tracking-wide">
          {CLINIC.tagline}
        </p>
      </div>

      {/* Subtle loader shimmer bar */}
      <div className="w-36 sm:w-44 h-1 bg-rosewater rounded-full overflow-hidden mt-6">
        <div className="w-full h-full bg-pomegranate animate-[shimmer_1.2s_infinite] origin-left" />
      </div>
      <p className="text-[11px] text-muted mt-2 font-mono">Haridwar · 10 AM – 9 PM</p>
    </div>
  );

  if (isInitialLoad) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return content;
};
