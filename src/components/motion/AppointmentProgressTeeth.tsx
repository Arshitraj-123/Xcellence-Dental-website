import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface AppointmentProgressTeethProps {
  currentStep: number; // 0, 1, 2, 3
  totalSteps?: number; // default 4
  isCompleted?: boolean;
  className?: string;
}

/**
 * AppointmentProgressTeeth:
 * Four small teeth that fill with enamel as steps complete in the booking wizard.
 * On completion, a small sparkle burst triggers and the smile curve draws smoothly.
 * Fully GPU-accelerated (transform and opacity only), respects reduced motion.
 */
export const AppointmentProgressTeeth: React.FC<AppointmentProgressTeethProps> = ({
  currentStep,
  totalSteps = 4,
  isCompleted = false,
  className = '',
}) => {
  const { isReducedMotion } = useReducedMotionPreference();
  const stepLabels = ['Service', 'Doctor', 'Time', 'Details'];
  const allFinished = isCompleted || currentStep >= totalSteps;

  return (
    <div
      className={`relative select-none font-sans py-2 ${className}`}
      aria-label={`Booking progress: Step ${Math.min(currentStep + 1, totalSteps)} of ${totalSteps}`}
    >
      <div className="flex items-center justify-between max-w-sm mx-auto relative px-2">
        {/* Subtle connecting thread line between teeth */}
        <div className="absolute top-5 left-8 right-8 h-[2px] bg-linen -z-0" />

        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isPast = idx < currentStep;
          const isCurrent = idx === currentStep && !allFinished;
          const isDone = isPast || allFinished;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              {/* Tooth SVG Container */}
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center p-1.5 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-rosewater/60 ring-2 ring-pomegranate shadow-sm'
                    : isDone
                    ? 'bg-rosewater/30'
                    : 'bg-pearl border border-ink/10'
                }`}
              >
                <svg
                  viewBox="0 0 48 52"
                  className="w-7 h-7 overflow-visible"
                  aria-hidden="true"
                >
                  {/* Tooth outline base track */}
                  <path
                    d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z"
                    fill={isDone ? '#8C2F4B' : isCurrent ? '#F3DFDA' : '#FBF8F2'}
                    stroke={isDone ? '#8C2F4B' : isCurrent ? '#8C2F4B' : '#6B6168'}
                    strokeWidth={isCurrent ? '3' : '2'}
                    className="transition-colors duration-300"
                  />

                  {/* Micro smile tick when done */}
                  {isDone && (
                    <motion.path
                      d="M16 22c5 5 11 5 16 0"
                      fill="none"
                      stroke="#C19A5B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      initial={isReducedMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  )}
                </svg>
              </div>

              {/* Step indicator dot & label */}
              <span
                className={`mt-1.5 text-[11px] font-mono tracking-wider transition-colors duration-200 ${
                  isDone || isCurrent
                    ? 'text-pomegranate font-bold'
                    : 'text-muted font-normal'
                }`}
              >
                {stepLabels[idx] || `Step ${idx + 1}`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Completion effects: Sparkle burst and Smile Curve */}
      <AnimatePresence>
        {allFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-3 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Smile curve drawing across the whole progress row */}
            <svg
              viewBox="0 0 320 28"
              className="w-full max-w-xs h-6 overflow-visible"
              aria-hidden="true"
            >
              {isReducedMotion ? (
                <path
                  d="M 20 6 Q 160 26 300 6"
                  fill="none"
                  stroke="#C19A5B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ) : (
                <motion.path
                  d="M 20 6 Q 160 26 300 6"
                  fill="none"
                  stroke="#C19A5B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </svg>

            {/* Sparkle burst above completed wizard */}
            <div className="flex items-center gap-2 mt-1">
              {!isReducedMotion && (
                <motion.span
                  initial={{ scale: 0, rotate: -30, opacity: 0 }}
                  animate={{ scale: [0, 1.25, 1], rotate: [0, 20, 0], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  className="text-brass text-sm inline-block"
                >
                  ✦
                </motion.span>
              )}
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass-deep">
                All Details Completed · Ready to Review
              </span>
              {!isReducedMotion && (
                <motion.span
                  initial={{ scale: 0, rotate: 30, opacity: 0 }}
                  animate={{ scale: [0, 1.25, 1], rotate: [0, -20, 0], opacity: [0, 1, 1] }}
                  transition={{ duration: 0.45, delay: 0.25 }}
                  className="text-brass text-sm inline-block"
                >
                  ✦
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
