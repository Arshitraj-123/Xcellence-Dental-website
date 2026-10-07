import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface CountUpProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * CountUp:
 * Animates a number counting up from 0 to target when scrolled into view.
 * 60fps via requestAnimationFrame, zero layout thrashing, respects reduced motion.
 */
export const CountUp: React.FC<CountUpProps> = ({
  target,
  duration = 1400,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { isReducedMotion } = useReducedMotionPreference();

  useEffect(() => {
    if (!isInView) return;

    if (isReducedMotion) {
      setCount(target);
      return;
    }

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease out
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration, isReducedMotion]);

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
