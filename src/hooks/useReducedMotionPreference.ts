import { useState, useEffect } from 'react';

const STORAGE_KEY = 'xcellence_reduce_motion';
const EVENT_NAME = 'xcellence-motion-preference-changed';

/**
 * Checks if reduced motion is enabled either by user manual toggle
 * or by OS system preference.
 */
function getInitialPreference(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Check user override in localStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    return saved === 'true';
  }

  // 2. Check system OS preference
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Updates DOM root class for CSS rules.
 */
function applyDomClass(shouldReduce: boolean) {
  if (typeof document === 'undefined') return;
  if (shouldReduce) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
}

export function useReducedMotionPreference() {
  const [isReduced, setIsReduced] = useState<boolean>(getInitialPreference);

  useEffect(() => {
    applyDomClass(isReduced);

    // Listen for custom toggle events across components
    const handleCustomChange = () => {
      const current = getInitialPreference();
      setIsReduced(current);
      applyDomClass(current);
    };

    // Listen for system media query changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      // Only apply system change if user has not set explicit preference
      if (localStorage.getItem(STORAGE_KEY) === null) {
        setIsReduced(e.matches);
        applyDomClass(e.matches);
      }
    };

    window.addEventListener(EVENT_NAME, handleCustomChange);
    mediaQuery.addEventListener('change', handleSystemChange);

    return () => {
      window.removeEventListener(EVENT_NAME, handleCustomChange);
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [isReduced]);

  const toggleReducedMotion = () => {
    const nextValue = !isReduced;
    setIsReduced(nextValue);
    localStorage.setItem(STORAGE_KEY, String(nextValue));
    applyDomClass(nextValue);
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  return {
    isReducedMotion: isReduced,
    toggleReducedMotion,
  };
}
