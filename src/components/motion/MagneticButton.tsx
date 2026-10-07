import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // max pull distance in px, default 10
}

/**
 * MagneticButton:
 * Micro magnetic cursor attraction for primary CTA buttons.
 * Strictly active only on desktop with a fine pointer (mouse/trackpad).
 * Disabled on touchscreens and when reduced motion is preferred.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 10,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const { isReducedMotion } = useReducedMotionPreference();

  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine)');
    setCanHover(media.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  if (isReducedMotion || !canHover) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
