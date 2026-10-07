import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Calendar,
  ArrowRight,
  MapPin,
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Mail,
  Navigation,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { DOCTORS } from '@/data/doctors';
import { getEnabledServices } from '@/data/services';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Img } from '@/components/ui/Img';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { isOpenNow } from '@/lib/format';
import {
  ShadeGuide,
  EnamelShine,
  SmileDivider,
  CountUp,
  MagneticButton,
  ParallaxImage,
  ServiceIconMotion,
  StaggerContainer,
  StaggerItem,
} from '@/components/motion';

export const Home: React.FC = () => {
  const enabledServices = getEnabledServices();
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(0);
  const activeService = enabledServices[selectedServiceIdx] || enabledServices[0];
  const openStatus = isOpenNow();

  // Today's index in IST (0 = Sunday, 1 = Monday, etc.)
  const currentDayOfWeek = new Date().getDay();
  const daysList = [
    { day: 'Monday', index: 1 },
    { day: 'Tuesday', index: 2 },
    { day: 'Wednesday', index: 3 },
    { day: 'Thursday', index: 4 },
    { day: 'Friday', index: 5 },
    { day: 'Saturday', index: 6 },
    { day: 'Sunday', index: 0 },
  ];

  return (
    <>
      <Seo
        title="Specialist Dental Clinic in Haridwar"
        description={`${CLINIC.name}: Advanced Laser Dentistry, Dental Implants, and Periodontics led by Dr Himanshi Sharma (MDS) and Dr Shailesh Sharma. 45+ years caring for Haridwar.`}
        canonical="/"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
          Mobile: image above text (4/3 ratio, never overflows)
          Desktop: 7-col text / 5-col arch image + Shade Guide card
         ───────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-clove text-enamel pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden border-b border-brass/25"
        data-anim="hero"
      >
        {/* Subtle background ambient texture */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img
            src="/images/hero-family.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover filter blur-sm"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-clove via-clove/95 to-clove" />

        <Container size="xl" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ─── Hero Text Copy (Order 1 on mobile to prevent pushing headline below fold) ─── */}
            <div
              className="order-1 lg:order-1 lg:col-span-7 space-y-6"
              data-anim="hero-text"
            >
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="brass" size="md">
                  {CLINIC.experienceHeadline}
                </Badge>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    openStatus.isOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-pearl/10 text-enamel/70 border-pearl/20'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-pearl/40'
                    }`}
                  />
                  <span>Open Daily 10 AM – 9 PM</span>
                </span>
              </div>

              {/* Main H1 with EnamelShine gloss sweep on highlighted phrase */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-[1.12]">
                Trusted care for{' '}
                <EnamelShine highlightColor="text-brass italic font-normal">
                  every family smile
                </EnamelShine>{' '}
                in Haridwar.
              </h1>

              <p className="text-base sm:text-lg font-sans text-enamel/80 leading-relaxed max-w-xl">
                Walk in today or reserve your visit. Led by Dr Himanshi Sharma (MDS Periodontist) and Dr Shailesh Sharma (Laser Dentist), our clinic delivers advanced laser care, permanent dental implants, and gentle family dentistry in one peaceful location.
              </p>

              {/* CTAs with desktop MagneticButton pull */}
              <div className="pt-2 flex flex-wrap gap-3.5">
                <MagneticButton>
                  <Button
                    to="/book-appointment"
                    variant="primary"
                    size="lg"
                    icon={<Calendar className="w-5 h-5" />}
                  >
                    Book a visit
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <Button
                    href={CLINIC.phoneTel}
                    variant="outline"
                    size="lg"
                    icon={<Phone className="w-5 h-5 text-brass" />}
                  >
                    Call {CLINIC.phone.display}
                  </Button>
                </MagneticButton>
              </div>

              {/* Highlights strip */}
              <div className="pt-4 border-t border-pearl/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-enamel/70 font-sans">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brass" />
                  MDS Periodontist on site
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brass" />
                  Certified Laser Care
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brass" />
                  Opp. Reliance Trendz, Ranipur More
                </span>
              </div>
            </div>

            {/* ─── Hero Image & Shade Guide (Order 2 on mobile) ─── */}
            <div
              className="order-2 lg:order-2 lg:col-span-5 flex flex-col items-center"
              data-anim="hero-image"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-none">
                {/* Arch Mask Image: 4/3 ratio on mobile, 4/4.8 on desktop */}
                <div className="w-full rounded-t-[140px] sm:rounded-t-[200px] rounded-b-[24px] overflow-hidden border border-brass/30 shadow-2xl bg-linen/20">
                  <ParallaxImage speed={16}>
                    <Img
                      src="/images/hero-family.webp"
                      alt="Happy family with healthy smiles cared for at Xcellence Dental Clinic Haridwar"
                      mask="arch"
                      priority={true}
                      ratio="4/3"
                      focal={{ mobile: 'center 25%', desktop: 'center 30%' }}
                      className="w-full sm:aspect-[4/4.6] object-cover"
                    />
                  </ParallaxImage>
                </div>

                {/* Floating "45+ Years" Heritage Seal */}
                <div
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-brass text-clove font-serif p-3 sm:p-4 rounded-2xl shadow-xl border border-pearl/20 text-center select-none"
                  data-anim="heritage-badge"
                >
                  <span className="block font-bold text-xl sm:text-2xl leading-none">
                    45+
                  </span>
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider block mt-0.5">
                    Years
                  </span>
                </div>

                {/* ─── Interactive Dental Shade Guide Card ─── */}
                <ShadeGuide className="mt-4 sm:-mt-10 sm:relative sm:z-20 w-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Smile Curve Divider between Hero & Trust Strip ─── */}
      <SmileDivider color="#C19A5B" className="relative z-20 -mt-6 sm:-mt-8 opacity-80" />

      {/* ─────────────────────────────────────────────────────────────
          2. TRUST STRIP (Overlapping Hero)
          Animated Counts: 45+ years, 2 specialist doctors,
          Laser/Implants/Gum care, 10 AM to 9 PM
         ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-20 -mt-4 sm:-mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        data-anim="trust-strip"
      >
        <div className="bg-pearl rounded-2xl sm:rounded-3xl shadow-card-elevated border border-ink/10 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-ink/10 overflow-hidden">
          {/* Stat 1 */}
          <div className="p-5 sm:p-7 text-center sm:text-left">
            <span
              className="font-serif text-3xl sm:text-4xl font-bold text-pomegranate block tracking-tight"
              data-anim="count"
            >
              <CountUp target={45} suffix="+" duration={1400} />
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-clove block mt-0.5">
              Years of Caring
            </span>
            <span className="text-[11px] text-muted font-sans block mt-0.5">
              Trusted by Haridwar families
            </span>
          </div>

          {/* Stat 2 */}
          <div className="p-5 sm:p-7 text-center sm:text-left">
            <span
              className="font-serif text-3xl sm:text-4xl font-bold text-pomegranate block tracking-tight"
              data-anim="count"
            >
              <CountUp target={2} duration={1000} />
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-clove block mt-0.5">
              Specialist Doctors
            </span>
            <span className="text-[11px] text-muted font-sans block mt-0.5">
              MDS Periodontist & Laser Expert
            </span>
          </div>

          {/* Stat 3 */}
          <div className="p-5 sm:p-7 text-center sm:text-left">
            <span className="font-serif text-xl sm:text-2xl font-bold text-clove block tracking-tight mt-1 sm:mt-1.5">
              Laser & Implants
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-clove block mt-0.5">
              Gum & Implant Care
            </span>
            <span className="text-[11px] text-muted font-sans block mt-0.5">
              Advanced precision therapies
            </span>
          </div>

          {/* Stat 4 */}
          <div className="p-5 sm:p-7 text-center sm:text-left">
            <span className="font-serif text-xl sm:text-2xl font-bold text-clove block tracking-tight mt-1 sm:mt-1.5">
              10 AM – 9 PM
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-clove block mt-0.5">
              Open Every Day
            </span>
            <span className="text-[11px] text-muted font-sans block mt-0.5">
              7 days clinical availability
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ABOUT SECTION
          Arch-masked photo plus text and ticks:
          specialist-led care, modern techniques, clear explanations
         ───────────────────────────────────────────────────────────── */}
      <Section variant="enamel" padded={true} id="about" className="pt-20 sm:pt-28">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Arch Photo (5 cols) */}
            <div className="lg:col-span-5 relative" data-anim="about-photo">
              <div className="w-full max-w-md mx-auto aspect-[4/4.8] rounded-t-[200px] rounded-b-[28px] overflow-hidden border border-ink/10 shadow-soft bg-linen">
                <Img
                  src="/images/clinic-wide.jpg"
                  alt="Inside Xcellence Dental Clinic Haridwar treatment rooms"
                  mask="arch"
                  ratio="4/4.8"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating doctor badge */}
              <div className="absolute -bottom-4 right-2 sm:right-6 bg-clove text-enamel p-4 rounded-2xl shadow-xl border border-brass/30 max-w-xs">
                <p className="font-serif text-base font-bold text-brass leading-snug">
                  Specialist-Led Care
                </p>
                <p className="text-xs text-enamel/80 font-sans mt-0.5">
                  Treated personally by Dr Himanshi Sharma & Dr Shailesh Sharma.
                </p>
              </div>
            </div>

            {/* About Text Copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6" data-anim="about-copy">
              <Eyebrow>About Xcellence Dental Clinic</Eyebrow>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight leading-tight">
                Gentle dentistry in a relaxed, modern Haridwar clinic.
              </h2>

              <p className="text-base sm:text-lg font-sans text-muted leading-relaxed">
                We believe exceptional oral healthcare begins with genuine listening and gentle hands. Whether you require a routine family cleaning, laser gum therapy, or permanent dental implants, our doctors provide focused, evidence-based care in a calm setting.
              </p>

              {/* Ticks: specialist-led care, modern techniques, clear explanations */}
              <ul className="space-y-3.5 font-sans text-sm sm:text-base text-ink pt-2">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rosewater/60 text-pomegranate flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="text-clove">Specialist-led care:</strong>{' '}
                    <span className="text-muted">
                      Your consultations and treatments are performed directly by our credentialed specialists, never passed to assistants.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rosewater/60 text-pomegranate flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="text-clove">Modern techniques:</strong>{' '}
                    <span className="text-muted">
                      Certified laser dentistry and precision implantology reduce discomfort, protect healthy natural tissue, and accelerate recovery.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-rosewater/60 text-pomegranate flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <strong className="text-clove">Clear explanations:</strong>{' '}
                    <span className="text-muted">
                      We explain clinical findings clearly with zero sales pressure, empowering you to make confident decisions for your oral wellness.
                    </span>
                  </div>
                </li>
              </ul>

              <div className="pt-4 flex flex-wrap gap-3">
                <Button to="/about" variant="primary" size="md">
                  Learn about our clinic
                </Button>
                <Button to="/doctors" variant="outline" size="md">
                  Meet our doctors
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────────
          4. SERVICES SECTION
          Interactive list on the left, detail panel on the right
          Featuring Laser Dentistry, Implantology, Periodontics first
         ───────────────────────────────────────────────────────────── */}
      <Section variant="linen" padded={true} id="services" className="border-y border-ink/10">
        <Container size="xl">
          <div className="max-w-2xl mb-10" data-anim="services-header">
            <Eyebrow>Comprehensive Care</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight mt-1">
              Care for every stage of your smile.
            </h2>
            <p className="text-base text-muted font-sans mt-2">
              Select any specialty below to explore treatments, benefits, and clinical approaches:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" data-anim="services-interactive">
            {/* Left Column: Interactive Service List (5 cols) */}
            <div
              className="lg:col-span-5 bg-pearl rounded-3xl p-3 sm:p-4 border border-ink/10 shadow-soft space-y-1.5 max-h-[600px] overflow-y-auto"
              role="tablist"
              aria-label="Dental specialties"
            >
              {enabledServices.map((service, idx) => {
                const isSelected = idx === selectedServiceIdx;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => setSelectedServiceIdx(idx)}
                    role="tab"
                    aria-selected={isSelected}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-pomegranate text-pearl shadow-sm'
                        : 'hover:bg-linen/60 text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-3 pr-2 overflow-hidden">
                      <ServiceIconMotion slug={service.slug} size={32} className="flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-serif text-base font-bold ${
                              isSelected ? 'text-pearl' : 'text-clove group-hover:text-pomegranate'
                            }`}
                          >
                            {service.name}
                          </span>
                          {service.flagship && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                                isSelected
                                  ? 'bg-pearl/20 text-pearl'
                                  : 'bg-rosewater text-pomegranate'
                              }`}
                            >
                              Flagship
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs block line-clamp-1 mt-0.5 ${
                            isSelected ? 'text-pearl/80' : 'text-muted'
                          }`}
                        >
                          {service.short}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        isSelected
                          ? 'text-pearl translate-x-0.5'
                          : 'text-muted group-hover:text-pomegranate'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detail Panel (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-clove text-enamel rounded-3xl p-6 sm:p-10 shadow-card-elevated border border-brass/30 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
                {/* Decorative background brass arc */}
                <div
                  className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full border-[20px] border-brass/10 pointer-events-none opacity-60"
                  aria-hidden="true"
                />

                <div className="space-y-5 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brass bg-brass/10 px-3 py-1 rounded-full border border-brass/25">
                        {activeService.flagship ? 'Flagship Specialty' : 'Clinical Care'}
                      </span>
                    </div>
                    <ServiceIconMotion slug={activeService.slug} size={44} />
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-enamel tracking-tight">
                    {activeService.name}
                  </h3>

                  <p className="text-sm sm:text-base font-sans text-enamel/80 leading-relaxed max-w-xl">
                    {activeService.long || activeService.short}
                  </p>

                  {/* Bullet Highlights */}
                  {activeService.bullets && activeService.bullets.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono font-bold text-brass uppercase tracking-wider block">
                        Treatment Highlights:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-enamel/90">
                        {activeService.bullets.slice(0, 4).map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-8 mt-6 border-t border-pearl/15 flex flex-wrap items-center gap-4 relative z-10">
                  <Button
                    to={`/services/${activeService.slug}`}
                    variant="secondary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore {activeService.name}
                  </Button>

                  <Button
                    to="/book-appointment"
                    variant="ghost"
                    size="md"
                    icon={<Calendar className="w-4 h-4 text-brass" />}
                  >
                    Book consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────────
          5. CARE JOURNEY (4 Steps)
         ───────────────────────────────────────────────────────────── */}
      <Section variant="enamel" padded={true} id="process">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-14" data-anim="journey-header">
            <Eyebrow>Your Care Journey</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight mt-1">
              What to expect at your visit.
            </h2>
            <p className="text-base text-muted font-sans mt-2">
              From your first consultation to your final smile milestone, every step is calm, transparent, and respectful.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
            data-anim="journey-steps"
          >
            {/* Step 1 */}
            <Card variant="pearl" radius="lg" className="p-6 relative space-y-4 hoverable">
              <div className="w-12 h-12 rounded-2xl bg-rosewater text-pomegranate font-serif font-bold text-xl flex items-center justify-center">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-clove">
                Thorough Consultation
              </h3>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                We sit down together, review your dental history, listen to your goals, and perform a gentle oral examination.
              </p>
            </Card>

            {/* Step 2 */}
            <Card variant="pearl" radius="lg" className="p-6 relative space-y-4 hoverable">
              <div className="w-12 h-12 rounded-2xl bg-rosewater text-pomegranate font-serif font-bold text-xl flex items-center justify-center">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-clove">
                Clear Diagnostic Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                High-definition digital imaging and periodontal charting provide an exact, understandable diagnosis with zero confusion.
              </p>
            </Card>

            {/* Step 3 */}
            <Card variant="pearl" radius="lg" className="p-6 relative space-y-4 hoverable">
              <div className="w-12 h-12 rounded-2xl bg-rosewater text-pomegranate font-serif font-bold text-xl flex items-center justify-center">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-clove">
                Gentle Specialist Treatment
              </h3>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                Minimally invasive laser-assisted techniques and precision implantology ensure maximum comfort and tissue preservation.
              </p>
            </Card>

            {/* Step 4 */}
            <Card variant="pearl" radius="lg" className="p-6 relative space-y-4 hoverable">
              <div className="w-12 h-12 rounded-2xl bg-rosewater text-pomegranate font-serif font-bold text-xl flex items-center justify-center">
                4
              </div>
              <h3 className="font-serif text-xl font-bold text-clove">
                Lifelong Smile Support
              </h3>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                Tailored preventive guidance, periodic screenings, and direct doctor availability to preserve your results for years.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────────
          6. DOCTORS SECTION
          Two cards linking to /doctors with verified doctor credentials
         ───────────────────────────────────────────────────────────── */}
      <Section variant="linen" padded={true} id="doctors" className="border-t border-ink/10">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12" data-anim="doctors-header">
            <div className="max-w-2xl">
              <Eyebrow>Clinical Leadership</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight mt-1">
                Meet your dental specialists.
              </h2>
              <p className="text-base text-muted font-sans mt-2">
                Specialized training in periodontics, laser dentistry, and dental implants right here in Haridwar.
              </p>
            </div>

            <Button to="/doctors" variant="outline" size="md">
              View all doctor profiles →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-anim="doctor-cards">
            {DOCTORS.map((doc) => (
              <Link
                key={doc.id}
                to="/doctors"
                className="bg-pearl rounded-3xl overflow-hidden border border-ink/10 shadow-soft hover:shadow-card-elevated hover:border-pomegranate/40 transition-all group grid grid-cols-1 sm:grid-cols-12"
              >
                {/* Doctor Portrait Placeholder / Image (5 cols) */}
                <div className="sm:col-span-5 bg-linen/50 min-h-[260px] relative overflow-hidden">
                  <Img
                    src={doc.photo}
                    alt={doc.imageAlt}
                    ratio="4/5"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Doctor Details (7 cols) */}
                <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate block">
                      {doc.role}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-clove group-hover:text-pomegranate transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-sans font-semibold text-muted">
                      {doc.qualifications}
                    </p>
                    <p className="text-xs sm:text-sm font-sans text-muted leading-relaxed line-clamp-3">
                      {doc.bio}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-ink/5 flex items-center justify-between text-xs font-sans font-bold text-pomegranate">
                    <span>Clinical Profile & Focus Areas</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────────────────────────────────────
          7. "WHY PATIENTS CHOOSE US" SECTION
          (Replaces the legacy reviews section using only verified facts)
          Facts: 2 specialist doctors, 45+ years caring for Haridwar,
          laser-assisted care, implantology, periodontics
         ───────────────────────────────────────────────────────────── */}
      <Section variant="enamel" padded={true} id="why-us">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-14" data-anim="why-us-header">
            <Eyebrow>Clinical Facts</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight mt-1">
              Why patients choose us.
            </h2>
            <p className="text-base text-muted font-sans mt-2">
              Grounded in specialized clinical training, modern equipment, and a lifelong commitment to Haridwar.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-anim="why-us-grid">
            {/* Fact 1 */}
            <StaggerItem>
              <Card variant="pearl" radius="lg" className="p-6 space-y-3 hoverable border border-ink/10 h-full">
                <div className="w-10 h-10 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-clove">
                  Two Dedicated Specialists
                </h3>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  Treated directly by Dr Himanshi Sharma (MDS Periodontist) and Dr Shailesh Sharma (Certified Laser Dentist), offering specialist expertise under one roof.
                </p>
              </Card>
            </StaggerItem>

            {/* Fact 2 */}
            <StaggerItem>
              <Card variant="pearl" radius="lg" className="p-6 space-y-3 hoverable border border-ink/10 h-full">
                <div className="w-10 h-10 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-clove">
                  45+ Years Caring for Haridwar
                </h3>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  Deep roots in Haridwar, caring for generations of families with dependable, ethical dental practice and patient trust.
                </p>
              </Card>
            </StaggerItem>

            {/* Fact 3 */}
            <StaggerItem>
              <Card variant="pearl" radius="lg" className="p-6 space-y-3 hoverable border border-ink/10 h-full">
                <div className="w-10 h-10 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-clove">
                  Laser-Assisted Care
                </h3>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  Certified laser dental equipment minimizes tissue trauma, seals micro-vessels, reduces swelling, and enhances overall treatment comfort.
                </p>
              </Card>
            </StaggerItem>

            {/* Fact 4 */}
            <StaggerItem>
              <Card variant="pearl" radius="lg" className="p-6 space-y-3 hoverable border border-ink/10 h-full">
                <div className="w-10 h-10 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-clove">
                  Precision Implantology
                </h3>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  Permanent, biocompatible tooth replacements engineered to restore natural chewing power and preserve your underlying jawbone contours.
                </p>
              </Card>
            </StaggerItem>

            {/* Fact 5 */}
            <StaggerItem>
              <Card variant="pearl" radius="lg" className="p-6 space-y-3 hoverable border border-ink/10 h-full">
                <div className="w-10 h-10 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-clove">
                  Advanced Periodontal Care
                </h3>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  Expert diagnosis and therapy for gum infections and bone loss, protecting your whole-body health and natural dentition.
                </p>
              </Card>
            </StaggerItem>

            {/* Fact 6 */}
            <StaggerItem>
              <Card variant="pearl" radius="lg" className="p-6 space-y-3 hoverable border border-ink/10 h-full">
                <div className="w-10 h-10 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-clove">
                  Open 7 Days a Week
                </h3>
                <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                  Daily clinic hours from 10:00 AM to 9:00 PM in central Haridwar make scheduling convenient for working professionals and families.
                </p>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </Section>

      {/* ─── Smile Curve Divider before CTA Band ─── */}
      <SmileDivider color="#C19A5B" className="my-2 opacity-50" />

      {/* ─────────────────────────────────────────────────────────────
          8. CTA BAND (Background photo & emergency line)
         ───────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-clove text-enamel py-20 sm:py-28 text-center overflow-hidden border-y border-brass/25"
        data-anim="cta-band"
      >
        {/* Background photo with subtle parallax */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <ParallaxImage speed={24} className="w-full h-full">
            <img
              src="/images/clinic-wide.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </ParallaxImage>
        </div>
        <div className="absolute inset-0 z-0 bg-clove/90" />

        <Container size="md" className="relative z-10 space-y-5">
          <Badge variant="brass" size="md">
            Emergency & Urgent Care
          </Badge>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-enamel tracking-tight">
            Toothache or dental emergency? We can see you today.
          </h2>

          <p className="text-base sm:text-lg font-sans text-enamel/80 max-w-xl mx-auto leading-relaxed">
            Same-day dental triage and walk-in assistance for acute pain, broken restorations, or sudden tooth injuries in Haridwar.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <Button
                href={CLINIC.phoneTel}
                variant="secondary"
                size="lg"
                icon={<Phone className="w-5 h-5 text-pomegranate" />}
              >
                Call {CLINIC.phone.display}
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                to="/book-appointment"
                variant="ghost"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
              >
                Book urgent visit
              </Button>
            </MagneticButton>
          </div>

          <p className="text-xs font-mono text-brass pt-2">
            Haridwar Clinic · Open Daily 10:00 AM – 9:00 PM
          </p>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. VISIT US SECTION
          Address, hours table with today highlighted (IST),
          map embed (lazy), directions button
         ───────────────────────────────────────────────────────────── */}
      <Section variant="enamel" padded={true} id="find" className="pb-24 sm:pb-32">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" data-anim="visit">
            {/* Address & Hours Table (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Eyebrow>Find Us in Haridwar</Eyebrow>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove tracking-tight mt-1">
                  Visit our clinic.
                </h2>
                <p className="text-sm sm:text-base text-muted font-sans mt-2">
                  Conveniently situated at Old Ranipur More opposite Reliance Trendz, with accessible ground parking.
                </p>
              </div>

              {/* Address details card */}
              <div className="p-5 rounded-2xl bg-pearl border border-ink/10 shadow-soft space-y-3 font-sans text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pomegranate flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-clove">{CLINIC.name}</p>
                    <p className="text-muted leading-relaxed">{CLINIC.address.lines[0]}</p>
                    <p className="text-muted leading-relaxed">{CLINIC.address.lines[1]}</p>
                    <p className="text-muted leading-relaxed">{CLINIC.address.lines[2]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-ink/5">
                  <Phone className="w-4 h-4 text-pomegranate flex-shrink-0" />
                  <a
                    href={CLINIC.phoneTel}
                    className="font-semibold text-clove hover:text-pomegranate transition-colors"
                  >
                    {CLINIC.phone.display}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-pomegranate flex-shrink-0" />
                  <a
                    href={CLINIC.emailMailto}
                    className="text-muted hover:text-pomegranate transition-colors truncate"
                  >
                    {CLINIC.email}
                  </a>
                </div>
              </div>

              {/* Hours Table with Today highlighted */}
              <div className="bg-pearl rounded-2xl border border-ink/10 p-5 shadow-soft">
                <div className="flex items-center justify-between pb-3 border-b border-ink/10">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-pomegranate" />
                    <span className="font-serif font-bold text-base text-clove">
                      Clinic Hours
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-pomegranate">
                    IST (Indian Standard Time)
                  </span>
                </div>

                <table className="w-full text-xs sm:text-sm font-sans mt-3">
                  <tbody>
                    {daysList.map(({ day, index }) => {
                      const isToday = currentDayOfWeek === index;
                      return (
                        <tr
                          key={day}
                          className={`border-b border-ink/5 last:border-b-0 ${
                            isToday ? 'bg-rosewater/40 font-bold text-pomegranate' : 'text-ink'
                          }`}
                        >
                          <td className="py-2.5 px-3 flex items-center gap-2">
                            <span>{day}</span>
                            {isToday && (
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-pomegranate text-pearl">
                                Today
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-right text-muted">
                            {CLINIC.hours.label}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Directions Button */}
              <div>
                <Button
                  href={CLINIC.address.googleMapsDirectionsUrl}
                  variant="primary"
                  size="md"
                  icon={<Navigation className="w-4 h-4" />}
                >
                  Get Directions on Google Maps
                </Button>
              </div>
            </div>

            {/* Map Embed (6 cols) */}
            <div className="lg:col-span-6 h-full min-h-[420px] rounded-3xl overflow-hidden border border-ink/10 shadow-soft bg-linen/50">
              <iframe
                title="Location Map of Xcellence Dental Clinic Haridwar"
                src={CLINIC.address.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[460px] border-0"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
};
