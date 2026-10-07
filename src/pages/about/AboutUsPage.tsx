import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { DOCTORS } from '@/data/doctors';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Img } from '@/components/ui/Img';
import { Accordion } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Card } from '@/components/ui/Card';
import { EnamelShine } from '@/components/motion';

export const AboutUsPage: React.FC = () => {
  const [activeVisitTab, setActiveVisitTab] = useState(0);

  const visitSteps = [
    {
      step: 1,
      title: 'Warm Welcome & Check In',
      desc: 'Arrive at our clinic opposite Reliance Trendz at Old Ranipur More, Haridwar. Our reception team greets you warmly, ensures your comfort, and confirms your appointment without lengthy waiting.',
    },
    {
      step: 2,
      title: 'Doctor Consultation & Discussion',
      desc: 'You will meet directly with Dr Himanshi Sharma or Dr Shailesh Sharma. We take the time to listen to your dental concerns, past medical history, and smile goals before beginning any examination.',
    },
    {
      step: 3,
      title: 'Gentle Clinical Examination',
      desc: 'A careful visual inspection and high-definition digital radiography give our doctors a complete, detailed assessment of your tooth structures, bone support, and gum health.',
    },
    {
      step: 4,
      title: 'Clear, Transparent Care Plan',
      desc: 'We review all clinical findings with you in plain language, explaining all available options with transparent treatment timelines so you can decide comfortably with zero pressure.',
    },
  ];

  const valuesItems = [
    {
      id: 'specialist-care',
      title: 'Specialist-Led Dental Care',
      content:
        'Every consultation and clinical procedure is conducted directly by Dr Himanshi Sharma (MDS Periodontist & Implantologist) or Dr Shailesh Sharma (Certified Laser Dentist & Implantologist). You receive attentive care from experienced specialists rather than revolving associate staff.',
    },
    {
      id: 'gentle-approach',
      title: 'Gentle, Minimally Invasive Approach',
      content:
        'We prioritize patient comfort and natural tissue preservation at every appointment. Utilizing modern laser techniques and careful clinical methods, we minimize post-procedure sensitivity and ensure dental visits feel calm and reassuring.',
    },
    {
      id: 'clear-explanations',
      title: 'Clear, Understandable Explanations',
      content:
        'We demystify dental care by explaining what is occurring inside your mouth in plain, accessible language. We discuss treatment options, pros and cons, and timelines clearly before taking any clinical steps.',
    },
    {
      id: 'honest-advice',
      title: 'Honest, Conservative Clinical Advice',
      content:
        'Our ethical commitment is always to preserve your natural dentition. We recommend treatments solely when they are genuinely beneficial for your oral health, avoiding overtreatment or unnecessary clinical interventions.',
    },
  ];

  return (
    <>
      <Seo
        title="About Us | Practice Heritage & Values"
        description={`Learn about ${CLINIC.name} in Haridwar. 45+ years caring for Haridwar with gentle, conservative, multi-specialty dental care led by Dr Himanshi Sharma and Dr Shailesh Sharma.`}
        canonical="/about"
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
            <span className="text-brass font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Our Practice Heritage
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              A trusted practice rooted in compassion and{' '}
              <EnamelShine highlightColor="text-brass italic font-normal">clinical excellence</EnamelShine>.
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              For generations, Haridwar families have turned to our doctors for gentle checkups, advanced laser therapies, and permanent dental implants in a calm environment.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── 45+ Years Caring for Haridwar Story ─── */}
      <Section variant="enamel" padded={true}>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Arch-masked photo (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="w-full max-w-md mx-auto aspect-[4/4.8] rounded-t-[200px] rounded-b-[28px] overflow-hidden border border-ink/10 shadow-soft bg-linen">
                <Img
                  src="/images/clinic-wide.jpg"
                  alt="Xcellence Dental Clinic Haridwar treatment rooms"
                  mask="arch"
                  ratio="4/4.8"
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating heritage badge */}
              <div className="absolute -bottom-4 right-2 sm:right-6 bg-brass text-clove p-4 rounded-2xl shadow-xl border border-pearl/20 text-center select-none">
                <span className="font-serif text-2xl font-bold block leading-none">
                  45+ Years
                </span>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-wider block mt-0.5">
                  Caring for Haridwar
                </span>
              </div>
            </div>

            {/* Story text copy (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Eyebrow>Our Heritage & Story</Eyebrow>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-clove tracking-tight leading-tight">
                Generations of trusted dental care in Haridwar.
              </h2>

              <div className="space-y-4 font-sans text-base sm:text-lg text-muted leading-relaxed">
                <p>
                  At Xcellence Dental Clinic, our clinical philosophy is built on a simple foundation: treating every patient as we would treat our own family. With over 45 years of continuous care in Haridwar, we have had the privilege of watching generations grow up with healthy, confident smiles.
                </p>
                <p>
                  Led by Dr Himanshi Sharma, BDS, MDS (Periodontist and Implantologist) and Dr Shailesh Sharma, Certified Laser Dentist and Implantologist, our practice unites advanced clinical techniques with deep patient respect. We believe in gentle, conservative treatments that preserve natural tooth and gum architecture whenever possible.
                </p>
                <p>
                  From routine preventive care to complex laser therapies and dental implant restorations, our doctors offer comprehensive specialties under one roof, eliminating the need to travel elsewhere for specialized procedures.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Button to="/book-appointment" variant="primary">
                  Book a Visit
                </Button>
                <Button to="/doctors" variant="outline">
                  Meet Our Doctors
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Values Accordion ─── */}
      <Section variant="linen" padded={true} className="border-y border-ink/10">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Eyebrow>Our Guiding Values</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove tracking-tight">
                Principles that shape every consultation and procedure.
              </h2>
              <p className="text-base text-muted font-sans leading-relaxed">
                We believe in ethical, patient-first dentistry. Click any value to understand how our clinical philosophy protects your comfort and health.
              </p>
            </div>

            <div className="lg:col-span-7 bg-pearl rounded-3xl p-6 sm:p-8 border border-ink/10 shadow-soft">
              <Accordion items={valuesItems} allowMultiple={false} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── What to Expect at Your First Visit (Selector) ─── */}
      <Section variant="enamel" padded={true}>
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>First Appointment Guide</Eyebrow>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
              What to expect at your first visit.
            </h2>
            <p className="text-sm sm:text-base font-sans text-muted mt-2">
              Select any step below to see how our clinical team ensures a calm, transparent experience:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step buttons selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
              {visitSteps.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  role="tab"
                  aria-selected={activeVisitTab === idx}
                  onClick={() => setActiveVisitTab(idx)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold border transition-all ${
                    activeVisitTab === idx
                      ? 'bg-pomegranate border-pomegranate text-pearl shadow-sm'
                      : 'bg-pearl border-ink/15 text-ink hover:border-pomegranate/50'
                  }`}
                >
                  Step {s.step}: {s.title}
                </button>
              ))}
            </div>

            {/* Selected step details card */}
            <div className="bg-pearl rounded-3xl p-8 sm:p-12 border border-ink/10 shadow-card-elevated grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-3 text-center sm:text-left">
                <span className="font-serif text-6xl sm:text-7xl font-bold text-pomegranate block leading-none">
                  {visitSteps[activeVisitTab].step}
                </span>
                <span className="text-xs font-sans text-muted block mt-1 uppercase tracking-wider font-semibold">
                  Phase {activeVisitTab + 1} of 4
                </span>
              </div>

              <div className="sm:col-span-9 space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                  {visitSteps[activeVisitTab].title}
                </h3>
                <p className="text-sm sm:text-base font-sans text-muted leading-relaxed">
                  {visitSteps[activeVisitTab].desc}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── Doctors Preview ─── */}
      <Section variant="linen" padded={true} className="border-t border-ink/10">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <Eyebrow>Our Specialists</Eyebrow>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
                Meet your treating doctors.
              </h2>
              <p className="text-base text-muted font-sans mt-2">
                Dedicated clinicians offering specialist training in periodontics, laser dentistry, and dental implants.
              </p>
            </div>

            <Button to="/doctors" variant="outline" size="md">
              View Doctor Profiles →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {DOCTORS.map((doc) => (
              <Card
                key={doc.id}
                variant="pearl"
                radius="lg"
                className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center border border-ink/10 hoverable"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-linen flex-shrink-0">
                  <Img
                    src={doc.photo}
                    alt={doc.imageAlt}
                    ratio="1/1"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-grow text-center sm:text-left">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate block">
                    {doc.role}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-clove">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-sans text-muted">
                    {doc.qualifications}
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/doctors"
                      className="text-xs font-sans font-bold text-pomegranate hover:underline inline-flex items-center gap-1"
                    >
                      Read full profile →
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── CTA Band ─── */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <Container size="md" className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Ready to experience gentle dentistry?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto leading-relaxed">
            New patients and walk-ins are always welcomed in our Haridwar practice. Open daily from 10:00 AM to 9:00 PM.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button
              to="/book-appointment"
              variant="secondary"
              size="md"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book a Visit
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
