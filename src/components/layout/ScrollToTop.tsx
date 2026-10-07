import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window smoothly to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });

    // Accessibility: Focus page h1 after route transition
    const timer = setTimeout(() => {
      const h1 = document.querySelector('main h1, h1') as HTMLElement | null;
      if (h1) {
        if (!h1.getAttribute('tabIndex')) {
          h1.setAttribute('tabIndex', '-1');
          h1.style.outline = 'none';
        }
        h1.focus({ preventScroll: true });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
