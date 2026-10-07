import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface SmileDividerProps {
  className?: string;
  color?: string;
  height?: number;
  flip?: boolean;
}

/**
 * SmileDivider:
 * Section divider shaped like a smile curve whose line smoothly draws as you scroll into view (useScroll + pathLength).
 * 60fps, pure transform & pathLength, disabled on reduced motion.
 */
export const SmileDivider: React.FC<SmileDividerProps> = ({
  className = '',
  color = '#C19A5B',
  height = 36,
  flip = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useReducedMotionPreference();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const smoothPathLength = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`w-full overflow-hidden flex items-center justify-center py-2 select-none pointer-events-none ${className}`}
    >
      <svg
        viewBox="0 0 600 40"
        className={`w-full max-w-4xl h-auto overflow-visible ${flip ? 'rotate-180' : ''}`}
        style={{ height }}
      >
        {/* Soft Background Track */}
        <path
          d="M 20 8 Q 300 42 580 8"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.15"
          strokeLinecap="round"
        />

        {/* Animated Smile Curve (useScroll + pathLength) */}
        {isReducedMotion ? (
          <path
            d="M 20 8 Q 300 42 580 8"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ) : (
          <motion.path
            d="M 20 8 Q 300 42 580 8"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ pathLength: smoothPathLength }}
          />
        )}
      </svg>
    </div>
  );
};
