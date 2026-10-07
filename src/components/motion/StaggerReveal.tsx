import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { MOTION_TRANSITIONS } from '@/lib/motionTokens';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  viewportAmount?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  viewportAmount = 0.2,
}) => {
  const { isReducedMotion } = useReducedMotionPreference();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  yOffset = 24,
}) => {
  const { isReducedMotion } = useReducedMotionPreference();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_TRANSITIONS.rise.duration,
        ease: MOTION_TRANSITIONS.rise.ease,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

interface FadeRiseProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * FadeRise:
 * Individual subtle fade-and-rise entrance for hero headings, badges, or standalone blocks.
 */
export const FadeRise: React.FC<FadeRiseProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
}) => {
  const { isReducedMotion } = useReducedMotionPreference();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: MOTION_TRANSITIONS.rise.duration,
        delay,
        ease: MOTION_TRANSITIONS.rise.ease,
      }}
    >
      {children}
    </motion.div>
  );
};
