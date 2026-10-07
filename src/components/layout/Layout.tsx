import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { ToothLoader } from './ToothLoader';
import { MobileActionBar } from './MobileActionBar';
import { PageTransition } from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-enamel text-ink font-sans selection:bg-rosewater selection:text-pomegranate">
      {/* ─── 1. Initial Page Load Branded Animation ─── */}
      <ToothLoader isInitialLoad />

      {/* ─── 2. Scroll to top & accessible h1 focus management on route change ─── */}
      <ScrollToTop />

      {/* ─── 3. Header with slim top bar, sticky brand nav & floss scroll progress ─── */}
      <Header />

      {/* ─── 4. Main content with curved smile wipe page transitions ─── */}
      <main className="flex-grow flex flex-col focus:outline-none" id="main-content" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>

      {/* ─── 5. Luxury Clove Footer (Full Haridwar clinic facts) ─── */}
      <Footer />

      {/* ─── 6. Mobile Bottom Action Bar (< 768px, safe-area aware, hidden on booking) ─── */}
      <MobileActionBar />
    </div>
  );
};
