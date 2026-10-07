import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { Logo } from '@/components/ui/Logo';
import { isOpenNow } from '@/lib/format';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

export const Footer: React.FC = () => {
  const openStatus = isOpenNow();
  const currentYear = new Date().getFullYear();
  const { isReducedMotion, toggleReducedMotion } = useReducedMotionPreference();

  const flagshipServices = [
    { label: 'Laser Dentistry', href: '/services/laser-dentistry' },
    { label: 'Implantology', href: '/services/implantology' },
    { label: 'Periodontics', href: '/services/periodontics' },
  ];

  const supportingServices = [
    { label: 'General Dentistry', href: '/services/general-dentistry' },
    { label: 'Emergency Dental Care', href: '/services/emergency-care' },
    { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
    { label: 'Restorative Dentistry', href: '/services/restorative-dentistry' },
    { label: 'Oral Surgery', href: '/services/oral-surgery' },
    { label: 'Endodontics', href: '/services/endodontics' },
    { label: 'Other Specialties', href: '/services/other-specialties' },
  ];

  const clinicLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    { label: 'Smile Gallery', href: '/smile-gallery' },
    { label: 'Dental Blog', href: '/blog' },
    { label: 'Contact & Map', href: '/contact' },
    { label: 'Book Appointment', href: '/book-appointment' },
  ];

  const patientLinks = [
    { label: 'Patient Forms', href: '/patient-forms' },
    { label: 'Pay Later & EMI Options', href: '/pay-later' },
  ];

  return (
    <footer className="bg-clove text-enamel border-t border-brass/25 pt-16 pb-24 md:pb-16 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Clinic Facts (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo colorScheme="mono-white" forceVariant="full" />

            <p className="font-serif italic text-brass text-lg">
              {CLINIC.experience}
            </p>

            <p className="text-xs sm:text-sm text-enamel/75 font-sans leading-relaxed max-w-sm">
              Providing gentle, multi-specialty dental care for patients of all ages in Haridwar. Advanced laser treatments and precision implantology under one roof.
            </p>

            {/* IST Open Status Badge */}
            <div className="pt-2">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
                  openStatus.isOpen
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-white/10 text-enamel/70 border-white/15'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'
                  }`}
                />
                <span>{openStatus.statusText} · {openStatus.nextChangeText}</span>
              </span>
            </div>
          </div>

          {/* Dental Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass block">
              Dental Services
            </span>

            {/* Flagship specialties with accent */}
            <div className="space-y-1.5 pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono text-brass-deep uppercase block">
                Flagship Care
              </span>
              {flagshipServices.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="font-serif text-base text-enamel hover:text-brass transition-colors flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-brass opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </Link>
              ))}
            </div>

            {/* Supporting services */}
            <ul className="space-y-1.5 font-sans text-xs text-enamel/70 pt-1">
              {supportingServices.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="hover:text-enamel transition-colors block py-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Patient Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass block mb-3">
                Clinic
              </span>
              <ul className="space-y-2 font-sans text-xs text-enamel/75">
                {clinicLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="hover:text-brass transition-colors block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass block mb-2">
                Patients
              </span>
              <ul className="space-y-2 font-sans text-xs text-enamel/75">
                {patientLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="hover:text-brass transition-colors block py-0.5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass block">
              Haridwar Clinic
            </span>

            <div className="space-y-3 font-sans text-xs sm:text-sm text-enamel/80">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                <div>
                  <p className="leading-snug">{CLINIC.address.lines[0]}</p>
                  <p className="leading-snug">{CLINIC.address.lines[1]}</p>
                  <p className="leading-snug">{CLINIC.address.lines[2]}</p>
                  <a
                    href={CLINIC.address.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brass hover:underline inline-flex items-center gap-1 text-xs mt-1"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brass flex-shrink-0" />
                <a
                  href={CLINIC.phoneTel}
                  className="hover:text-brass font-medium transition-colors"
                >
                  {CLINIC.phone.display}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brass flex-shrink-0" />
                <a
                  href={CLINIC.emailMailto}
                  className="hover:text-brass transition-colors truncate"
                >
                  {CLINIC.email}
                </a>
              </div>

              {/* Timing */}
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-enamel">{CLINIC.hours.days}</p>
                  <p className="text-enamel/70">{CLINIC.hours.label} (IST)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-enamel/60">
          <p>
            © {currentYear} {CLINIC.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Old Ranipur More, Opp. Reliance Trendz, Haridwar</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-brass transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={isReducedMotion}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-brass/25 hover:border-brass text-enamel/80 hover:text-enamel transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brass" />
              <span>{isReducedMotion ? 'Enable animations' : 'Reduce motion'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
