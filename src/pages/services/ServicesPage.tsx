import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar, ArrowRight, Sparkles, Check, CreditCard } from 'lucide-react';
import { getEnabledServices, Service } from '@/data/services';
import { CLINIC } from '@/data/clinic';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { ToothMap } from '@/components/services/ToothMap';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { EnamelShine, ServiceIconMotion } from '@/components/motion';

export const ServicesPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const enabledServices = getEnabledServices();

  // Flagship services first filter chips
  const filterChips = [
    { id: 'all', label: 'All Services', hint: 'Browse our complete multi-specialty dental continuum.' },
    { id: 'laser', label: 'Laser Dentistry (Flagship)', hint: 'Gentle, minimally invasive light-assisted soft tissue care.' },
    { id: 'implants', label: 'Dental Implants (Flagship)', hint: 'Permanent titanium tooth restorations that protect bone structure.' },
    { id: 'gums', label: 'Periodontics & Gums (Flagship)', hint: 'Specialized gum disease care led by Dr Himanshi Sharma (MDS).' },
    { id: 'general', label: 'General & Preventive', hint: 'Routine cleanings, digital checkups, and cavity prevention.' },
    { id: 'emergency', label: 'Emergency Care', hint: 'Same-day walk-in assistance for acute pain, broken teeth, or trauma.' },
    { id: 'cosmetic', label: 'Cosmetic Dentistry', hint: 'Porcelain veneers, composite bonding, and in-office whitening.' },
    { id: 'restorative', label: 'Restorative & Endodontics', hint: 'Root canal therapy, crowns, and tooth-preserving restorations.' },
  ];

  const filteredServices = enabledServices.filter((s: Service) => {
    if (filter === 'all') return true;
    if (filter === 'laser') return s.slug === 'laser-dentistry';
    if (filter === 'implants') return s.slug === 'implantology';
    if (filter === 'gums') return s.slug === 'periodontics';
    if (filter === 'general') return s.slug === 'general-dentistry';
    if (filter === 'emergency') return s.slug === 'emergency-care';
    if (filter === 'cosmetic') return s.slug === 'cosmetic-dentistry';
    if (filter === 'restorative') return ['restorative-dentistry', 'endodontics', 'oral-surgery'].includes(s.slug);
    return true;
  });

  const activeHint = filterChips.find((c) => c.id === filter)?.hint;

  return (
    <>
      <Seo
        title="Comprehensive Dental Services in Haridwar"
        description="Explore all dental services at Xcellence Dental Clinic in Haridwar: Laser Dentistry, Dental Implants, Periodontics, Emergency Care, Cosmetic Dentistry, and more."
        canonical="/services"
      />

      {/* ─── 1. Hero Banner with Breadcrumbs ─── */}
      <section className="relative bg-clove text-enamel py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/images/clinic-wide.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-clove via-clove/95 to-clove/80" />

        <Container size="xl" className="relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-enamel/70 mb-5">
            <Link to="/" className="hover:text-brass transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brass font-medium">Dental Services</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Complete Dental Continuum
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              Every dental service your family needs, in one{' '}
              <EnamelShine highlightColor="text-brass italic font-normal">calm clinic</EnamelShine>.
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              From gentle family check-ups to painless laser dentistry, dental implants, and periodontics, our specialists provide conservative, evidence-based care in Haridwar.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── 2. Interactive ToothMap (Near top) ─── */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <ToothMap />
      </section>

      {/* ─── 3. "What do you need today?" Filter Chips (Flagship First) ─── */}
      <Section variant="linen" padded={true} className="border-y border-ink/10">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <Eyebrow>Find Your Treatment</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
                What do you need today?
              </h2>
              {activeHint && (
                <p className="text-xs sm:text-sm text-muted font-sans mt-1">
                  {activeHint}
                </p>
              )}
            </div>

            <Button
              href={CLINIC.phoneTel}
              variant="outline"
              size="sm"
              icon={<Phone className="w-4 h-4 text-pomegranate" />}
            >
              Call {CLINIC.phone.display}
            </Button>
          </div>

          {/* Filter Chips Bar (Flagship First) */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter dental services">
            {filterChips.map((chip) => {
              const isSelected = filter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setFilter(chip.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold border transition-all ${
                    isSelected
                      ? 'bg-pomegranate border-pomegranate text-pearl shadow-sm'
                      : 'bg-pearl border-ink/15 text-ink hover:border-pomegranate/50'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* ─── 4. Card Grid from services.ts (Enabled Services Only) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.slug}
                variant="pearl"
                radius="lg"
                className="p-6 sm:p-7 border border-ink/10 shadow-soft hoverable flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2">
                    {service.flagship ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rosewater text-pomegranate border border-pomegranate/20 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" /> Flagship Care
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-linen text-muted uppercase tracking-wider">
                        Comprehensive Care
                      </span>
                    )}

                    {service.slug === 'laser-dentistry' && (
                      <span className="text-[10px] font-mono text-pomegranate font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rosewater/60 border border-pomegranate/20">
                        New Specialty
                      </span>
                    )}
                  </div>

                  {/* Title & Lead */}
                  <div className="flex items-start gap-3">
                    <ServiceIconMotion slug={service.slug} size={40} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-clove">
                        {service.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted font-sans mt-1.5 leading-relaxed">
                        {service.short}
                      </p>
                    </div>
                  </div>

                  {/* Bullet Highlights */}
                  {service.bullets && service.bullets.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-ink/5 font-sans text-xs text-ink/85">
                      {service.bullets.slice(0, 3).map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-pomegranate flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 mt-6 border-t border-ink/5 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="font-sans text-xs sm:text-sm font-bold text-pomegranate hover:underline inline-flex items-center gap-1 group"
                  >
                    <span>View Treatment Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/book-appointment"
                    className="text-xs font-sans font-semibold px-3 py-1.5 rounded-full bg-linen hover:bg-rosewater transition-colors text-clove"
                  >
                    Book Visit
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* ─── 5. Short Payments Note (Links to Pay Later / EMI) ─── */}
          <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-pearl border border-ink/10 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linen text-brass-deep flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-clove font-bold text-sm sm:text-base block">
                  Transparent Treatment Pricing & Flexible Payment Plans
                </strong>
                <p className="text-xs sm:text-sm text-muted">
                  We believe in upfront clinical clarity. Zero-cost EMI options are available for specialized dental treatments.
                </p>
              </div>
            </div>

            <Button to="/pay-later" variant="outline" size="sm">
              View Pay Later & EMI Options →
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── 6. Bottom Consultation CTA ─── */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <Container size="md" className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Need guidance on which service fits best?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto">
            Our doctors take the time to evaluate your unique dental goals and explain every option clearly.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button
              to="/book-appointment"
              variant="secondary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book Consultation
            </Button>
            <Button
              href={CLINIC.phoneTel}
              variant="ghost"
              size="md"
              icon={<Phone className="w-4 h-4 text-brass" />}
            >
              Call {CLINIC.phone.display}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};
