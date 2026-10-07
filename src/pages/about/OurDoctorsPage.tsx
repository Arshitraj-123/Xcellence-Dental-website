import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, Phone } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { DOCTORS } from '@/data/doctors';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Img } from '@/components/ui/Img';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { EnamelShine } from '@/components/motion';

export const OurDoctorsPage: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeDoctor = DOCTORS[selectedIdx] || DOCTORS[0];

  return (
    <>
      <Seo
        title="Our Doctors | Dr Himanshi Sharma & Dr Shailesh Sharma"
        description="Meet Dr Himanshi Sharma (BDS, MDS Periodontist & Implantologist) and Dr Shailesh Sharma (Certified Laser Dentist & Implantologist) at Xcellence Dental Clinic in Haridwar."
        canonical="/doctors"
      />

      {/* ─── Hero Banner with Breadcrumbs ─── */}
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
            <span className="text-brass font-medium">Our Doctors</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Specialist Clinical Leadership
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              Meet the{' '}
              <EnamelShine highlightColor="text-brass italic font-normal">specialist doctors</EnamelShine>{' '}
              caring for your smile.
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Dr Himanshi Sharma (MDS Periodontist) and Dr Shailesh Sharma (Certified Laser Dentist) combine advanced specialty credentials with gentle, patient-first care.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Two-Profile Switcher (Overlapping Hero) ─── */}
      <div className="relative z-20 -mt-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          role="tablist"
          aria-label="Select doctor profile"
        >
          {DOCTORS.map((doc, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={doc.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedIdx(idx)}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all flex items-center gap-4 text-left shadow-card-elevated ${
                  isSelected
                    ? 'bg-pearl border-pomegranate shadow-xl ring-2 ring-pomegranate/20'
                    : 'bg-enamel/95 border-ink/10 hover:border-pomegranate/50 opacity-90'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 bg-linen border border-ink/10">
                  <Img
                    src={doc.photo}
                    alt={doc.imageAlt}
                    ratio="1/1"
                    focal="center top"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-clove block leading-snug">
                    {doc.name}
                  </span>
                  <span className="text-xs font-sans text-muted block mt-0.5 line-clamp-1">
                    {doc.role}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-pomegranate font-bold uppercase tracking-wider block mt-1">
                      ● Active Profile
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Animated Profile Showcase ─── */}
      <Section variant="enamel" padded={true} className="pt-16 sm:pt-20">
        <Container size="xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDoctor.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="bg-pearl rounded-3xl p-6 sm:p-12 border border-ink/10 shadow-card-elevated grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Doctor Portrait in Arch Mask (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm">
                  <div className="w-full aspect-[4/4.8] rounded-t-[180px] rounded-b-[24px] overflow-hidden border border-ink/10 shadow-soft bg-linen">
                    <Img
                      src={activeDoctor.photo}
                      alt={activeDoctor.imageAlt}
                      mask="arch"
                      ratio="4/4.8"
                      priority={true}
                      focal={{ mobile: 'center 20%', desktop: 'center 25%' }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Doctor Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="rosewater" size="sm">
                    {activeDoctor.role}
                  </Badge>
                  <span className="text-xs font-mono text-muted bg-linen px-2.5 py-0.5 rounded-full">
                    Haridwar Specialist
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight">
                    {activeDoctor.name}
                  </h2>
                  <span className="text-xs sm:text-sm font-sans font-bold text-brass-deep uppercase tracking-wider block mt-1.5">
                    {activeDoctor.qualifications}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-sans text-muted leading-relaxed">
                  {activeDoctor.bio}
                </p>

                {/* Focus Areas */}
                <div className="pt-1">
                  <span className="text-xs font-sans font-bold text-ink uppercase tracking-wider block mb-2.5">
                    Specialized Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeDoctor.focusAreas.map((area: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs font-sans font-semibold px-3.5 py-1.5 rounded-full bg-enamel border border-ink/10 text-clove"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote block */}
                {activeDoctor.quote && (
                  <blockquote className="border-l-4 border-pomegranate pl-4 py-2 italic font-serif text-base sm:text-lg text-clove bg-rosewater/20 rounded-r-xl">
                    "{activeDoctor.quote.text}"
                    <footer className="text-xs font-sans font-semibold text-brass-deep not-italic mt-1">
                      — {activeDoctor.quote.author}
                    </footer>
                  </blockquote>
                )}

                {/* Doctor Booking CTA */}
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button
                    to="/book-appointment"
                    variant="primary"
                    size="lg"
                    icon={<Calendar className="w-5 h-5" />}
                  >
                    Book with {activeDoctor.name}
                  </Button>
                  <Button
                    href={CLINIC.phoneTel}
                    variant="outline"
                    size="lg"
                  >
                    Call Clinic Desk
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      {/* ─── Which Doctor for What Comparison ─── */}
      <Section variant="linen" padded={true} className="border-y border-ink/10">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Eyebrow>Clinical Collaboration</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight mt-1">
              Which doctor for what?
            </h2>
            <p className="text-base text-muted font-sans mt-2">
              Our specialists coordinate treatments seamlessly under one roof so your care is continuous and complete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Dr Himanshi Sharma Card */}
            <Card variant="pearl" radius="lg" className="p-7 sm:p-9 border border-ink/10 shadow-soft space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rosewater text-pomegranate flex items-center justify-center font-serif font-bold text-lg">
                  H
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-clove">
                    Dr Himanshi Sharma
                  </h3>
                  <span className="text-xs font-sans font-bold text-pomegranate block">
                    BDS, MDS (Periodontist and Implantologist)
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-muted leading-relaxed">
                Best consulted for gum health concerns, periodontal infections, loose teeth, aesthetic smile lines, and surgical dental implant placements.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-ink/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-clove block">
                  Primary Consultations:
                </span>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-ink">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-pomegranate flex-shrink-0 mt-0.5" />
                    <span>Periodontitis and bleeding/swollen gums</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-pomegranate flex-shrink-0 mt-0.5" />
                    <span>Dental implant surgical placement & bone preservation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-pomegranate flex-shrink-0 mt-0.5" />
                    <span>Gingival recession coverage & tissue grafting</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-pomegranate flex-shrink-0 mt-0.5" />
                    <span>Aesthetic gum contouring & smile proportion balance</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  to="/book-appointment"
                  variant="outline"
                  size="sm"
                  fullWidth={true}
                >
                  Consult Dr Himanshi Sharma
                </Button>
              </div>
            </Card>

            {/* Dr Shailesh Sharma Card */}
            <Card variant="pearl" radius="lg" className="p-7 sm:p-9 border border-ink/10 shadow-soft space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linen text-brass-deep flex items-center justify-center font-serif font-bold text-lg">
                  S
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-clove">
                    Dr Shailesh Sharma
                  </h3>
                  <span className="text-xs font-sans font-bold text-brass-deep block">
                    Certified Laser Dentist and Implantologist
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-muted leading-relaxed">
                Best consulted for laser-assisted dental treatments, minimally invasive procedures, restorative care, root canal therapies, and implant restorations.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-ink/5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-clove block">
                  Primary Consultations:
                </span>
                <ul className="space-y-2 font-sans text-xs sm:text-sm text-ink">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brass-deep flex-shrink-0 mt-0.5" />
                    <span>Minimally invasive laser dental procedures</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brass-deep flex-shrink-0 mt-0.5" />
                    <span>Laser-assisted root canal bacterial decontamination</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brass-deep flex-shrink-0 mt-0.5" />
                    <span>Implant restoration, crowns, and aesthetic bonding</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brass-deep flex-shrink-0 mt-0.5" />
                    <span>Soft-tissue oral lesion treatment and frenectomies</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  to="/book-appointment"
                  variant="outline"
                  size="sm"
                  fullWidth={true}
                >
                  Consult Dr Shailesh Sharma
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 bg-clove text-enamel text-center">
        <Container size="md" className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Schedule your consultation in Haridwar.
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto">
            Both doctors welcome new patients daily. Experience gentle, unhurried specialist care.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button
              to="/book-appointment"
              variant="secondary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book an Appointment
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
