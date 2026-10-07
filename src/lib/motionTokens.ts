/**
 * Design Tokens for Animations and Transitions.
 * Strictly adheres to 60fps rules:
 * - Only transform and opacity are animated (no layout thrashing / reflow).
 * - Calibrated for high responsiveness and luxury feel.
 * - Respects prefers-reduced-motion.
 */

export const MOTION_DURATIONS = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.32,
  gentle: 0.5,
  deliberate: 0.7,
  pageTransition: 0.35, // never delays navigation > 450ms
} as const;

export const MOTION_EASINGS = {
  // Luxuriously smooth deceleration curve (Apple / Leica style)
  gentle: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Micro-bounce for active icon ticks and teeth filling
  springy: [0.34, 1.4, 0.64, 1] as [number, number, number, number],
  // Standard ease-in-out for loops & ripples
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  // Linear for smooth shimmers
  linear: [0, 0, 1, 1] as [number, number, number, number],
} as const;

export const MOTION_TRANSITIONS = {
  fade: {
    duration: MOTION_DURATIONS.normal,
    ease: MOTION_EASINGS.gentle,
  },
  rise: {
    duration: MOTION_DURATIONS.gentle,
    ease: MOTION_EASINGS.gentle,
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 25,
  },
  pageWipe: {
    duration: MOTION_DURATIONS.pageTransition,
    ease: MOTION_EASINGS.gentle,
  },
} as const;
