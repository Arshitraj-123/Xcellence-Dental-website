import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface EnamelShineProps {
  children: React.ReactNode;
  className?: string;
  /** Custom highlight color or text style */
  highlightColor?: string;
}

/**
 * EnamelShine:
 * - A diagonal gloss sweep across one highlighted word in each hero headline once,
 *   triggered when it enters the view.
 * - Transform/opacity only, runs at 60fps, disabled on reduced motion.
 */
export const EnamelShine: React.FC<EnamelShineProps> = ({
  children,
  className = '',
  highlightColor = 'text-brass',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { isReducedMotion } = useReducedMotionPreference();

  return (
    <span
      ref={ref}
      className={`relative inline-block overflow-hidden align-baseline ${highlightColor} ${className}`}
    >
      <span className="relative z-10">{children}</span>

      {!isReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none z-20"
          style={{
            skewX: -25,
            top: 0,
            bottom: 0,
          }}
          initial={{ x: '-150%', opacity: 0 }}
          animate={isInView ? { x: '250%', opacity: [0, 1, 1, 0] } : { x: '-150%', opacity: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      )}
    </span>
  );
};
