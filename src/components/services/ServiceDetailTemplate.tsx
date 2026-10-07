import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Calendar,
  Check,
  ChevronDown,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { Service, TreatmentItem, ServiceStep, ServiceFAQ, getEnabledServices } from '@/data/services';
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

interface ServiceDetailTemplateProps {
  service: Service;
}

/* ─── Emergency Triage Scenarios Data ─── */
const EMERGENCY_TRIAGE = [
  {
    id: 'toothache',
    title: 'Severe Toothache',
    urgency: 'Priority Examination',
    advice:
      'Rinse mouth gently with warm water. Use dental floss carefully to remove any trapped food debris between teeth. Never apply crushed aspirin directly to the gums, as this causes chemical tissue burns. Take oral pain relievers as directed.',
    action: `Call our clinic desk at ${CLINIC.phone.display} for same-day walk-in pain relief.`,
    warning: null,
  },
  {
    id: 'knocked-out',
    title: 'Knocked-Out Adult Tooth',
    urgency: 'Time-Critical (Within 60 Mins)',
    advice:
      'Handle the tooth solely by the smooth white crown—never touch the root! Gently rinse for 2 seconds with milk or saline if soiled. If possible, gently place the tooth back in its socket and hold with clean gauze. Otherwise, store the tooth submerged in a cup of cold milk.',
    action: `Call ${CLINIC.phone.display} immediately and travel straight to our Haridwar clinic. Early arrival is vital for preserving natural tooth attachment.`,
    warning: null,
  },
  {
    id: 'broken-tooth',
    title: 'Broken or Fractured Tooth',
    urgency: 'Same-Day Treatment',
    advice:
      'Save any tooth fragments in clean water or milk. Rinse mouth gently with lukewarm water. Apply an ice pack or cold compress externally against your cheek to control swelling.',
    action: `Call ${CLINIC.phone.display} for prompt evaluation, pain management, and tooth restoration.`,
    warning: null,
  },
  {
    id: 'lost-filling',
    title: 'Lost Filling or Dislodged Crown',
    urgency: 'Prompt Restoration',
    advice:
      'Keep the dislodged restoration clean and bring it to your visit. Avoid chewing on the affected side. Temporary chemist dental cement or dental wax can be placed over the sensitive area temporarily.',
    action: `Contact our clinic at ${CLINIC.phone.display} to schedule a prompt re-cementation or restorative visit.`,
    warning: null,
  },
  {
    id: 'swelling',
    title: 'Facial Swelling / Dental Abscess',
    urgency: 'Urgent Clinical Evaluation',
    advice:
      'Noticeable facial swelling accompanied by throbbing pain indicates an active bacterial infection. Do not apply warm compresses directly to the swollen cheek, as heat can worsen inflammation. Professional clinical drainage and targeted therapy are needed.',
    action: `Call our clinic desk at ${CLINIC.phone.display} for same-day evaluation.`,
    warning:
      'EMERGENCY ROOM NOTICE: If facial swelling is accompanied by high fever, difficulty swallowing, or trouble breathing, proceed directly to the nearest hospital emergency room immediately.',
  },
  {
    id: 'bleeding',
    title: 'Soft Tissue Bleeding or Trauma',
    urgency: 'Urgent Care',
    advice:
      'Rinse gently with cool water. Apply firm, continuous pressure with a clean damp gauze or cloth to the bleeding area for 15 to 20 minutes with your head elevated.',
    action: `If bleeding does not subside after 30 minutes of continuous pressure, call our clinic at ${CLINIC.phone.display} or seek emergency medical care.`,
    warning: null,
  },
];

export const ServiceDetailTemplate: React.FC<ServiceDetailTemplateProps> = ({ service }) => {
  const [activeTreatmentIdx, setActiveTreatmentIdx] = useState(0);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [activeTriageIdx, setActiveTriageIdx] = useState(0);

  const activeTreatment = service.treatments[activeTreatmentIdx] || service.treatments[0];

  // Match doctors from DOCTORS data
  const assignedDoctors = DOCTORS.filter((d) => (service.doctors || []).includes(d.id));
  const primaryDoctor = assignedDoctors[0] || DOCTORS[0];

  // Enabled related services only
  const enabledServices = getEnabledServices();
  const relatedServices = enabledServices.filter(
    (s) =>
      s.slug !== service.slug &&
      ((service.related || []).includes(s.slug) || (service.relatedServiceIds || []).includes(s.id))
  );

  return (
    <>
      <Seo
        title={`${service.name} in Haridwar`}
        description={service.short}
        canonical={`/services/${service.slug}`}
      />

      {/* ─── 1. Hero Banner ─── */}
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
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-enamel/70 mb-5">
            <Link to="/" className="hover:text-brass transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/services" className="hover:text-brass transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-brass font-medium">{service.name}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            {/* Flagship Tag / Hero Accent */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="brass" size="md">
                {service.flagship ? 'Flagship Specialty' : 'Clinical Service'}
              </Badge>

              {/* Implantology Hero Accent: Implant post screwing-in animation */}
              {service.slug === 'implantology' && (
                <div
                  className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brass/15 border border-brass/35 text-brass text-xs font-mono"
                  data-accent="implant-screw"
                >
                  <div className="w-5 h-5 flex items-center justify-center overflow-visible">
                    <svg
                      viewBox="0 0 24 28"
                      className="w-4 h-5 animate-implant-screw text-brass"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {/* Hex abutment */}
                      <polygon points="7,2 17,2 19,6 5,6" fill="currentColor" fillOpacity="0.3" />
                      {/* Collar */}
                      <rect x="6" y="6" width="12" height="3" rx="1" fill="currentColor" fillOpacity="0.2" />
                      {/* Tapered post */}
                      <path d="M7 9 L17 9 L15 25 L9 25 Z" fill="currentColor" fillOpacity="0.15" />
                      {/* Helical screw threads */}
                      <line x1="7" y1="12" x2="17" y2="13.5" />
                      <line x1="7.5" y1="15.5" x2="16.5" y2="17" />
                      <line x1="8" y1="19" x2="16" y2="20.5" />
                      <line x1="8.5" y1="22.5" x2="15.5" y2="24" />
                      {/* Apex tip */}
                      <path d="M10 25 L12 27 L14 25" />
                    </svg>
                  </div>
                  <span>Precision Titanium Osseointegration</span>
                </div>
              )}
            </div>

            {/* Headline */}
            <div className="relative">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
                {service.heroHeadline || service.name}
              </h1>

              {/* Laser Dentistry: Soft light-beam line sweeping across headline */}
              {service.slug === 'laser-dentistry' && (
                <div
                  className="relative mt-3 mb-1 h-1.5 w-full max-w-md rounded-full overflow-hidden bg-brass/15 border border-brass/25"
                  data-accent="light-beam"
                  aria-hidden="true"
                >
                  <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brass to-transparent animate-laser-sweep shadow-[0_0_14px_rgba(193,154,91,0.9)]" />
                </div>
              )}

              {/* Periodontics: Gentle gum-line wave */}
              {service.slug === 'periodontics' && (
                <div className="mt-3 flex items-center gap-3" data-accent="gum-wave">
                  <div className="overflow-hidden py-1">
                    <svg
                      viewBox="0 0 160 20"
                      className="w-36 sm:w-48 h-5 text-rosewater animate-gum-wave overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 12 Q20 3, 40 12 T80 12 T120 12 T160 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 12 Q20 3, 40 12 T80 12 T120 12 T160 12 L160 20 L0 20 Z"
                        fill="currentColor"
                        fillOpacity="0.25"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-mono text-rosewater uppercase tracking-wider">
                    Gingival Seal Protection
                  </span>
                </div>
              )}
            </div>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed pt-1">
              {service.heroSubtitle || service.short}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Button
                to="/book-appointment"
                variant="primary"
                size="md"
                icon={<Calendar className="w-4 h-4" />}
              >
                Request Consultation
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
          </div>
        </Container>
      </section>

      {/* ─── 2. Quick Value Strip ─── */}
      <div className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-pearl rounded-2xl shadow-card-elevated border border-ink/10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-ink/10 overflow-hidden">
          {(service.stats && service.stats.length > 0
            ? service.stats
            : [
                { value: '45+ Years', label: 'Caring for Haridwar' },
                { value: 'Specialist Led', label: 'Treated by lead doctors' },
                { value: 'Gentle Care', label: 'Minimally invasive approach' },
                { value: '10 AM – 9 PM', label: 'Open daily in Haridwar' },
              ]
          ).map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-6 text-center sm:text-left">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-pomegranate block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-sans text-muted block mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SPECIAL SECTION: Emergency Care First-Aid Triage ─── */}
      {service.slug === 'emergency-care' && (
        <Section variant="linen" padded={true} className="border-b border-ink/10">
          <Container size="xl">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate block">
                Immediate Clinical Triage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
                Emergency Dental First-Aid Guide
              </h2>
              <p className="text-sm font-sans text-muted mt-2">
                Select your urgent situation below for immediate safe advice. We welcome same-day emergencies daily from 10:00 AM to 9:00 PM.
              </p>
            </div>

            {/* Triage Scenarios Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Triage buttons list (5 cols) */}
              <div className="lg:col-span-5 bg-pearl rounded-3xl p-3 sm:p-4 border border-ink/10 shadow-soft space-y-1.5">
                {EMERGENCY_TRIAGE.map((item, idx) => {
                  const isSelected = activeTriageIdx === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTriageIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-pomegranate text-pearl shadow-sm'
                          : 'hover:bg-linen/60 text-ink'
                      }`}
                    >
                      <div>
                        <span
                          className={`font-serif text-base font-bold block ${
                            isSelected ? 'text-pearl' : 'text-clove'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`text-xs block mt-0.5 ${
                            isSelected ? 'text-pearl/80' : 'text-muted'
                          }`}
                        >
                          {item.urgency}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 ${
                          isSelected ? 'text-pearl' : 'text-muted'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Triage Action Card (7 cols) */}
              <div className="lg:col-span-7 bg-pearl rounded-3xl p-6 sm:p-8 border border-ink/10 shadow-card-elevated space-y-5">
                <div className="flex items-center justify-between gap-2 border-b border-ink/10 pb-3">
                  <h3 className="font-serif text-2xl font-bold text-clove">
                    {EMERGENCY_TRIAGE[activeTriageIdx].title}
                  </h3>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-rosewater text-pomegranate">
                    {EMERGENCY_TRIAGE[activeTriageIdx].urgency}
                  </span>
                </div>

                <div className="space-y-3 font-sans text-sm text-ink/85 leading-relaxed">
                  <p>
                    <strong>First-Aid Instructions:</strong>{' '}
                    {EMERGENCY_TRIAGE[activeTriageIdx].advice}
                  </p>
                  <p className="font-semibold text-clove">
                    <strong>Recommended Action:</strong>{' '}
                    {EMERGENCY_TRIAGE[activeTriageIdx].action}
                  </p>
                </div>

                {/* Hospital Warning Callout (if swelling) */}
                {EMERGENCY_TRIAGE[activeTriageIdx].warning && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-950 font-sans flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>{EMERGENCY_TRIAGE[activeTriageIdx].warning}</div>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    href={CLINIC.phoneTel}
                    variant="primary"
                    size="md"
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Call {CLINIC.phone.display} Now
                  </Button>
                  <Button to="/book-appointment" variant="outline" size="md">
                    Book Urgent Examination
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 3. Intro with "Why patients choose us" ─── */}
      <Section variant="enamel" padded={true}>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <Eyebrow>Clinical Overview</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight">
                {service.overviewHeading || `Why patients choose us for ${service.name}`}
              </h2>
              <div className="space-y-4 font-sans text-base text-muted leading-relaxed">
                {(service.overviewText && service.overviewText.length > 0
                  ? service.overviewText
                  : [service.long]
                ).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Ticks List */}
              {service.ticks && service.ticks.length > 0 && (
                <ul className="space-y-2.5 pt-2 font-sans text-sm text-ink">
                  {service.ticks.map((tick, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-pomegranate flex-shrink-0 mt-0.5" />
                      <span>{tick}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Doctor & Practice Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-linen/60 rounded-3xl p-6 sm:p-8 border border-ink/10 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate block">
                Specialist Practice Standards
              </span>
              <h3 className="font-serif text-2xl font-bold text-clove">
                Care Delivered by Experienced Specialists
              </h3>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                All treatments for {service.name} are personally planned and provided by our credentialed doctors:
              </p>

              <div className="space-y-3 pt-1">
                {assignedDoctors.map((doc) => (
                  <div key={doc.id} className="p-3.5 rounded-2xl bg-pearl border border-ink/5 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-linen flex-shrink-0">
                      <Img
                        src={doc.photo}
                        alt={doc.name}
                        ratio="1/1"
                        focal="center top"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-sm text-clove block leading-snug">
                        {doc.name}
                      </span>
                      <span className="text-[11px] font-sans text-muted block line-clamp-1">
                        {doc.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/doctors"
                  className="text-xs font-sans font-bold text-pomegranate hover:underline inline-flex items-center gap-1"
                >
                  Meet all clinic specialists →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 4. Treatments Selector (Tabs + Detail Panel) ─── */}
      {service.treatments && service.treatments.length > 0 && (
        <Section variant="clove" padded={true} className="border-y border-brass/25">
          <Container size="xl">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass block">
                Specialized Treatments
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel mt-1">
                Explore treatments in this service
              </h2>
              <p className="text-sm font-sans text-enamel/80 mt-2">
                Click any treatment below to see duration, typical visits, and clinical indications:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Treatments tabs (5 cols) */}
              <div className="lg:col-span-5 bg-pearl/10 border border-brass/25 rounded-3xl p-3 sm:p-4 space-y-1.5">
                {service.treatments.map((treatment: TreatmentItem, idx: number) => {
                  const isSelected = activeTreatmentIdx === idx;
                  return (
                    <button
                      key={treatment.name}
                      type="button"
                      onClick={() => setActiveTreatmentIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brass text-clove font-bold shadow-sm'
                          : 'hover:bg-pearl/10 text-enamel/90'
                      }`}
                    >
                      <div>
                        <span className="font-serif text-base block">{treatment.name}</span>
                        {treatment.tag && (
                          <span
                            className={`text-[11px] block mt-0.5 ${
                              isSelected ? 'text-clove/80 font-mono' : 'text-brass'
                            }`}
                          >
                            {treatment.tag}
                          </span>
                        )}
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 flex-shrink-0 ${
                          isSelected ? 'text-clove' : 'text-brass opacity-60'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Treatment details card (7 cols) */}
              <div className="lg:col-span-7 bg-pearl/10 border border-brass/30 rounded-3xl p-6 sm:p-9 space-y-6">
                <div>
                  {activeTreatment.tag && (
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brass bg-brass/15 px-3 py-1 rounded-full border border-brass/30">
                      {activeTreatment.tag}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-enamel mt-3">
                    {activeTreatment.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base font-sans text-enamel/85 leading-relaxed">
                  {activeTreatment.description}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs pt-1">
                  {activeTreatment.duration && (
                    <div className="bg-clove/70 p-3.5 rounded-xl border border-brass/20">
                      <dt className="text-brass font-mono">Duration:</dt>
                      <dd className="font-semibold text-enamel mt-0.5">{activeTreatment.duration}</dd>
                    </div>
                  )}
                  {activeTreatment.visits && (
                    <div className="bg-clove/70 p-3.5 rounded-xl border border-brass/20">
                      <dt className="text-brass font-mono">Typical Visits:</dt>
                      <dd className="font-semibold text-enamel mt-0.5">{activeTreatment.visits}</dd>
                    </div>
                  )}
                  {activeTreatment.idealFor && (
                    <div className="bg-clove/70 p-3.5 rounded-xl border border-brass/20 sm:col-span-1">
                      <dt className="text-brass font-mono">Ideal For:</dt>
                      <dd className="font-semibold text-enamel mt-0.5 line-clamp-2">
                        {activeTreatment.idealFor}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="pt-2">
                  <Button
                    to="/book-appointment"
                    variant="secondary"
                    size="md"
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Book for {activeTreatment.name}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 5. What to Expect Steps ─── */}
      {((service.process && service.process.length > 0) || (service.steps && service.steps.length > 0)) && (
        <Section variant="enamel" padded={true}>
          <Container size="xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Eyebrow>Patient Journey</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
                What to expect step-by-step
              </h2>
              <p className="text-sm font-sans text-muted mt-2">
                Every procedure is planned transparently before we begin, keeping you relaxed and informed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(service.process || service.steps || []).map((step: ServiceStep) => (
                <Card key={step.stepNumber} variant="pearl" radius="lg" className="p-6 border border-ink/10 shadow-soft">
                  <div className="w-12 h-12 rounded-full bg-pomegranate text-pearl font-serif text-xl font-bold flex items-center justify-center mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-clove mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-muted leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 6. "Not Sure Where to Start" Helper (Quiz / Guide) ─── */}
      {service.quiz && (
        <Section variant="linen" padded={true} className="border-y border-ink/10">
          <Container size="xl">
            <div className="bg-pearl rounded-3xl p-6 sm:p-10 border border-ink/10 shadow-card-elevated">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <Badge variant="rosewater">Diagnostic Fit Guide</Badge>
                  <h2 className="font-serif text-3xl font-bold text-clove">
                    Not sure where to start?
                  </h2>
                  <p className="text-sm font-sans text-muted">
                    {service.quiz.question}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {service.quiz.options.map((opt, idx: number) => {
                      const isSelected = selectedQuizIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedQuizIdx(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-sm font-sans transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-pomegranate bg-rosewater/40 font-semibold text-ink shadow-sm'
                              : 'border-ink/15 hover:border-pomegranate/50 bg-enamel/40 text-muted'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-pomegranate flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="lg:col-span-6 bg-linen rounded-2xl p-6 sm:p-8 border border-ink/10 space-y-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate block">
                    Our Clinical Recommendation:
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-clove">
                    {service.quiz.options[selectedQuizIdx]?.recommendationTitle}
                  </h3>
                  <p className="text-sm font-sans text-muted leading-relaxed">
                    {service.quiz.options[selectedQuizIdx]?.recommendationText}
                  </p>
                  <div className="pt-2">
                    <Button to="/book-appointment" variant="primary" size="sm">
                      Schedule Exam to Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 7. Treating Doctor Card ─── */}
      <Section variant="enamel" padded={true}>
        <Container size="xl">
          <div className="bg-pearl rounded-3xl p-6 sm:p-10 border border-ink/10 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="w-56 sm:w-64 aspect-[4/4.8] rounded-t-[160px] rounded-b-[20px] overflow-hidden bg-linen border border-ink/10">
                  <Img
                    src={primaryDoctor.photo}
                    alt={primaryDoctor.imageAlt}
                    ratio="4/4.8"
                    mask="arch"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-8 space-y-3.5">
                <Badge variant="rosewater">{primaryDoctor.role}</Badge>
                <h3 className="font-serif text-3xl font-bold text-clove">
                  Meet {primaryDoctor.name}
                </h3>
                <p className="text-xs font-mono text-brass-deep font-bold uppercase tracking-wider">
                  {primaryDoctor.qualifications}
                </p>
                <p className="text-sm sm:text-base font-sans text-muted leading-relaxed">
                  {primaryDoctor.bio}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {primaryDoctor.focusAreas.map((area: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs font-sans px-3 py-1 rounded-full bg-enamel border border-ink/10 text-clove font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Button to="/doctors" variant="outline" size="sm">
                    View Doctor Credentials →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 8. FAQ Accordion ─── */}
      {service.faqs && service.faqs.length > 0 && (
        <Section variant="linen" padded={true} className="border-t border-ink/10">
          <Container size="md">
            <div className="text-center mb-10">
              <Eyebrow>Common Inquiries</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 font-sans">
              {service.faqs.map((faq: ServiceFAQ, idx: number) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-pearl rounded-2xl border border-ink/10 overflow-hidden shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-lg font-bold text-clove"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted transition-transform flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-pomegranate' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-muted leading-relaxed border-t border-ink/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 9. Related Services (Enabled Only) ─── */}
      {relatedServices.length > 0 && (
        <Section variant="enamel" padded={true} className="border-t border-ink/10">
          <Container size="xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <Eyebrow>Related Dental Specialties</Eyebrow>
                <h2 className="font-serif text-3xl font-bold text-clove mt-1">
                  Complementary Care Options
                </h2>
              </div>
              <Button to="/services" variant="outline" size="sm">
                View All Services →
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.slice(0, 3).map((rel) => (
                <Card
                  key={rel.slug}
                  variant="pearl"
                  radius="lg"
                  className="p-6 border border-ink/10 shadow-soft hoverable flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {rel.flagship && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pomegranate bg-rosewater px-2.5 py-0.5 rounded-full inline-block">
                        Flagship Care
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-bold text-clove">
                      {rel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted line-clamp-2">
                      {rel.short}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-ink/5">
                    <Link
                      to={`/services/${rel.slug}`}
                      className="text-xs font-sans font-bold text-pomegranate hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore {rel.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ─── 10. Closing Consultation CTA ─── */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <Container size="md" className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-enamel">
            Ready to care for your smile?
          </h2>
          <p className="text-sm sm:text-lg font-sans text-enamel/80 max-w-xl mx-auto leading-relaxed">
            Walk in today or book ahead. We treat routine check-ups, emergencies, and specialized care daily from 10:00 AM to 9:00 PM.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Button
              to="/book-appointment"
              variant="secondary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
            >
              Request an Appointment
            </Button>
            <Button
              href={CLINIC.phoneTel}
              variant="ghost"
              size="lg"
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
