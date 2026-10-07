import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Clock,
  Menu,
  X,
  ChevronDown,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScrollProgress } from './ScrollProgress';
import { isOpenNow } from '@/lib/format';

interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  flagship?: boolean;
}

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const openStatus = isOpenNow();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Close mobile drawer or dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  /* Navigation Data */
  const aboutLinks: NavDropdownItem[] = [
    { label: 'About Us', href: '/about', description: 'Our philosophy, clinic history, and compassionate patient care.' },
    { label: 'Our Doctors', href: '/doctors', description: 'Dr Himanshi Sharma (MDS) & Dr Shailesh Sharma.' },
    { label: 'Smile Gallery', href: '/smile-gallery', description: 'Case examples showcasing aesthetic and restorative smiles.' },
    { label: 'Blog & Articles', href: '/blog', description: 'Educational dental articles and oral wellness guides.' },
  ];

  const flagshipServices: NavDropdownItem[] = [
    { label: 'Laser Dentistry', href: '/services/laser-dentistry', description: 'Gentle, minimally invasive light-assisted soft tissue care.', flagship: true },
    { label: 'Implantology', href: '/services/implantology', description: 'Permanent titanium tooth replacement and restorations.', flagship: true },
    { label: 'Periodontics', href: '/services/periodontics', description: 'Specialized gum disease treatment and foundation care.', flagship: true },
  ];

  const supportingServices: NavDropdownItem[] = [
    { label: 'General Dentistry', href: '/services/general-dentistry', description: 'Cleanings, exams, and routine preventive care.' },
    { label: 'Emergency Care', href: '/services/emergency-care', description: 'Urgent relief for tooth pain, fractures, and trauma.' },
    { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry', description: 'Teeth whitening, composite bonding, and veneers.' },
    { label: 'Restorative Dentistry', href: '/services/restorative-dentistry', description: 'Ceramic crowns, fixed bridges, and inlays/onlays.' },
    { label: 'Oral Surgery', href: '/services/oral-surgery', description: 'Gentle extractions and wisdom tooth management.' },
    { label: 'Endodontics', href: '/services/endodontics', description: 'Root canal therapy to resolve pain and save natural teeth.' },
    { label: 'Other Specialties', href: '/services/other-specialties', description: 'Pediatric visits, nightguards, and custom care.' },
  ];

  const patientLinks: NavDropdownItem[] = [
    { label: 'Patient Forms', href: '/patient-forms', description: 'Convenient pre-visit forms for streamlined arrival.' },
    { label: 'Pay Later or EMI Enquiry', href: '/pay-later', description: 'Flexible payment plans and interest-free options.' },
  ];

  const isNavActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* ─── 1. Slim Top Bar ─── */}
      <div
        role="region"
        aria-label="Emergency contact and clinic hours"
        className="bg-clove text-enamel border-b border-brass/25 text-xs py-2 px-4 select-none relative z-50"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Emergency & Timing */}
          <div className="flex items-center gap-3">
            <a
              href={CLINIC.phoneTel}
              className="inline-flex items-center gap-1.5 text-brass font-bold hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass rounded px-1"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-pomegranate animate-pulse" />
              <span>Emergency? Call now</span>
            </a>
            <span className="hidden sm:inline-block text-enamel/30">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-enamel/80">
              <Clock className="w-3.5 h-3.5 text-brass" />
              <span>{CLINIC.hours.days}: {CLINIC.hours.label}</span>
            </span>
          </div>

          {/* Right: Phone & IST Open Badge */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                openStatus.isOpen
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-linen/15 text-enamel/70 border-white/10'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'
                }`}
              />
              {openStatus.statusText}
            </span>

            <a
              href={CLINIC.phoneTel}
              className="inline-flex items-center gap-1.5 font-semibold text-enamel hover:text-brass transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass rounded px-1"
            >
              <Phone className="w-3.5 h-3.5 text-brass" />
              <span>{CLINIC.phone.display}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── 2. Sticky Header ─── */}
      <header
        className={`sticky top-0 z-40 bg-enamel backdrop-blur-md transition-shadow duration-200 border-b border-linen ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo linkToHome />
            </div>

            {/* Desktop Navigation (>= 1024px) */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-2 h-full"
            >
              {/* Home */}
              <div className="relative h-full flex items-center">
                <Link
                  to="/"
                  className={`px-3.5 py-2 font-sans text-sm font-semibold transition-colors rounded-lg relative ${
                    isNavActive('/') && location.pathname === '/'
                      ? 'text-pomegranate'
                      : 'text-ink hover:text-pomegranate'
                  }`}
                >
                  Home
                  {isNavActive('/') && location.pathname === '/' && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brass-deep rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </div>

              {/* About Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownEnter('about')}
                onMouseLeave={handleDropdownLeave}
                onFocus={() => handleDropdownEnter('about')}
                onBlur={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'about'}
                  className={`px-3.5 py-2 font-sans text-sm font-semibold transition-colors rounded-lg inline-flex items-center gap-1.5 relative ${
                    isNavActive('/about') || isNavActive('/doctors') || isNavActive('/smile-gallery') || isNavActive('/blog')
                      ? 'text-pomegranate'
                      : 'text-ink hover:text-pomegranate'
                  }`}
                >
                  About
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'about' ? 'rotate-180 text-pomegranate' : 'text-muted'
                    }`}
                  />
                  {(isNavActive('/about') || isNavActive('/doctors') || isNavActive('/smile-gallery') || isNavActive('/blog')) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brass-deep rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === 'about' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 w-72 bg-pearl rounded-2xl shadow-card-elevated border border-ink/10 p-2 space-y-1 z-50"
                    >
                      {aboutLinks.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="p-3 rounded-xl hover:bg-rosewater/30 transition-colors block group"
                        >
                          <span className="font-serif text-base font-bold text-clove group-hover:text-pomegranate transition-colors block">
                            {item.label}
                          </span>
                          <span className="text-xs text-muted block mt-0.5 line-clamp-1">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services Dropdown (Mega Dropdown with Flagship First) */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
                onFocus={() => handleDropdownEnter('services')}
                onBlur={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'services'}
                  className={`px-3.5 py-2 font-sans text-sm font-semibold transition-colors rounded-lg inline-flex items-center gap-1.5 relative ${
                    isNavActive('/services')
                      ? 'text-pomegranate'
                      : 'text-ink hover:text-pomegranate'
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'services' ? 'rotate-180 text-pomegranate' : 'text-muted'
                    }`}
                  />
                  {isNavActive('/services') && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brass-deep rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full -left-20 w-[640px] bg-pearl rounded-3xl shadow-card-elevated border border-ink/10 p-6 z-50 grid grid-cols-12 gap-6"
                    >
                      {/* Flagship Column (Featured First) */}
                      <div className="col-span-5 bg-rosewater/30 rounded-2xl p-4 border border-pomegranate/15 space-y-3">
                        <div className="flex items-center gap-1.5 text-pomegranate font-bold text-xs uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Flagship Specialties</span>
                        </div>
                        <div className="space-y-2">
                          {flagshipServices.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="p-2.5 rounded-xl bg-pearl/90 hover:bg-pearl hover:shadow-sm transition-all block group border border-pomegranate/10"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-serif text-base font-bold text-clove group-hover:text-pomegranate transition-colors">
                                  {item.label}
                                </span>
                                <Badge variant="pomegranate">Flagship</Badge>
                              </div>
                              <span className="text-[11px] text-muted block mt-1 line-clamp-1">
                                {item.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-pomegranate/10">
                          <Link
                            to="/services"
                            className="text-xs font-sans font-bold text-pomegranate hover:underline inline-flex items-center gap-1"
                          >
                            <span>Browse all services</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Supporting Services (7 cols) */}
                      <div className="col-span-7 space-y-2">
                        <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block">
                          Comprehensive Dental Care
                        </span>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          {supportingServices.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="p-2 rounded-lg hover:bg-linen/60 transition-colors block group"
                            >
                              <span className="font-sans text-xs font-semibold text-ink group-hover:text-pomegranate transition-colors block">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-muted block truncate">
                                {item.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Patients Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleDropdownEnter('patients')}
                onMouseLeave={handleDropdownLeave}
                onFocus={() => handleDropdownEnter('patients')}
                onBlur={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === 'patients'}
                  className={`px-3.5 py-2 font-sans text-sm font-semibold transition-colors rounded-lg inline-flex items-center gap-1.5 relative ${
                    isNavActive('/patient-forms') || isNavActive('/pay-later')
                      ? 'text-pomegranate'
                      : 'text-ink hover:text-pomegranate'
                  }`}
                >
                  Patients
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'patients' ? 'rotate-180 text-pomegranate' : 'text-muted'
                    }`}
                  />
                  {(isNavActive('/patient-forms') || isNavActive('/pay-later')) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brass-deep rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {activeDropdown === 'patients' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 w-72 bg-pearl rounded-2xl shadow-card-elevated border border-ink/10 p-2 space-y-1 z-50"
                    >
                      {patientLinks.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="p-3 rounded-xl hover:bg-rosewater/30 transition-colors block group"
                        >
                          <span className="font-serif text-base font-bold text-clove group-hover:text-pomegranate transition-colors block">
                            {item.label}
                          </span>
                          <span className="text-xs text-muted block mt-0.5 line-clamp-1">
                            {item.description}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <div className="relative h-full flex items-center">
                <Link
                  to="/contact"
                  className={`px-3.5 py-2 font-sans text-sm font-semibold transition-colors rounded-lg relative ${
                    isNavActive('/contact')
                      ? 'text-pomegranate'
                      : 'text-ink hover:text-pomegranate'
                  }`}
                >
                  Contact
                  {isNavActive('/contact') && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-brass-deep rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </div>

              {/* Action: Book a visit button */}
              <div className="ml-3 xl:ml-4">
                <Button
                  to="/book-appointment"
                  variant="primary"
                  size="sm"
                  icon={<Calendar className="w-4 h-4" />}
                >
                  Book a visit
                </Button>
              </div>
            </nav>

            {/* Mobile / Tablet Menu Button (< 1024px) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                to="/book-appointment"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex text-xs py-1.5 px-3"
              >
                Book
              </Button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-clove hover:bg-linen transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3. Scroll Progress Floss Line ─── */}
        <ScrollProgress />
      </header>

      {/* ─── 4. Full-Height Mobile Navigation Drawer (< 1024px) ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-clove/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative ml-auto w-full max-w-md bg-enamel h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-linen flex items-center justify-between">
                <Logo linkToHome forceVariant="compact" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl text-ink hover:bg-linen transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6 text-clove" />
                </button>
              </div>

              {/* Scrollable Links Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Primary Nav Links */}
                <div className="space-y-1">
                  <Link
                    to="/"
                    className="flex items-center justify-between p-3.5 rounded-xl font-serif text-xl font-bold text-clove hover:bg-linen min-h-[44px]"
                  >
                    <span>Home</span>
                  </Link>

                  {/* About Section */}
                  <div className="pt-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted px-3.5 block mb-1">
                      About Xcellence
                    </span>
                    <div className="space-y-0.5">
                      {aboutLinks.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center justify-between p-3 rounded-xl font-sans text-sm font-medium text-ink hover:bg-linen min-h-[44px]"
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-muted">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Services Section (Flagship First) */}
                  <div className="pt-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate px-3.5 block mb-1">
                      Featured Specialties
                    </span>
                    <div className="space-y-0.5">
                      {flagshipServices.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center justify-between p-3 rounded-xl font-serif text-base font-bold text-clove bg-rosewater/40 hover:bg-rosewater/60 min-h-[44px]"
                        >
                          <span>{item.label}</span>
                          <Badge variant="pomegranate">Flagship</Badge>
                        </Link>
                      ))}
                    </div>

                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted px-3.5 block mt-3 mb-1">
                      All Dental Services
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {supportingServices.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="p-2.5 rounded-lg font-sans text-xs font-medium text-ink hover:bg-linen min-h-[44px] flex items-center"
                        >
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Patients Section */}
                  <div className="pt-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted px-3.5 block mb-1">
                      Patient Resources
                    </span>
                    <div className="space-y-0.5">
                      {patientLinks.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="flex items-center justify-between p-3 rounded-xl font-sans text-sm font-medium text-ink hover:bg-linen min-h-[44px]"
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-muted">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Contact Link */}
                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="flex items-center justify-between p-3.5 rounded-xl font-serif text-xl font-bold text-clove hover:bg-linen min-h-[44px]"
                    >
                      <span>Contact & Location</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Footer (Pinned at Bottom) */}
              <div className="p-4 sm:p-6 bg-pearl border-t border-linen space-y-3">
                <Button
                  to="/book-appointment"
                  variant="primary"
                  fullWidth
                  size="md"
                  icon={<Calendar className="w-5 h-5" />}
                >
                  Book a Visit
                </Button>

                <Button
                  href={CLINIC.phoneTel}
                  variant="outline"
                  fullWidth
                  size="md"
                  icon={<Phone className="w-5 h-5" />}
                >
                  Call {CLINIC.phone.display}
                </Button>

                <p className="text-center text-[11px] text-muted font-sans pt-1">
                  {CLINIC.hours.days}: {CLINIC.hours.label} · Haridwar
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
