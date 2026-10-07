import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // default 24px vertical travel
}

/**
 * ParallaxImage:
 * Subtle vertical scroll parallax on hero and CTA band photo.
 * Strictly disabled on mobile (< 768px) and when reduced motion is preferred.
 * Transform only (translateY), no layout shift.
 */
export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  children,
  className = '',
  speed = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { isReducedMotion } = useReducedMotionPreference();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  if (isReducedMotion || !isDesktop) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};
