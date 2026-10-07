import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, Shield, Phone, Calendar } from 'lucide-react';
import { CLINIC } from '../../data/clinic';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { PatientRegistrationForm } from '../../components/forms/PatientRegistrationForm';

export const PatientFormsPage: React.FC = () => {
  const formCards = [
    {
      title: 'New Patient Registration',
      desc: 'Personal contact details and emergency contacts for new patients.',
      action: 'Fill online below',
    },
    {
      title: 'Medical Health History',
      desc: 'Systemic conditions, allergies, and current medications.',
      action: 'Included in online form',
    },
    {
      title: 'Consent & Practice Guidelines',
      desc: 'General dental treatment consent and patient privacy standards.',
      action: 'Reviewed upon check-in',
    },
    {
      title: 'Financial & Payment Policy',
      desc: 'Transparent pricing, digital payments, and in-house EMI details.',
      action: 'Handled at clinic desk',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Patient Forms & Registration | {CLINIC.name}</title>
        <meta
          name="description"
          content="Complete your patient registration forms online before visiting Xcellence Dental Clinic in Haridwar. Save waiting-room time."
        />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-clove text-enamel py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/clinic-wide.jpg"
            alt="Patient paperwork banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-clove via-clove/90 to-clove/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-sm text-enamel/70 mb-4">
            <Link to="/" className="hover:text-brass transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brass font-medium">Patient Forms</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Fast-Track Check-In
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              Save time at your first visit
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Fill in your patient information online, print or save it as a PDF, and bring it with you. Your appointment begins promptly and waiting-room paperwork is done.
            </p>
          </div>
        </div>
      </section>

      {/* Form Library Cards Overlapping Hero */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formCards.map((card, i) => (
            <div
              key={i}
              className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft space-y-2.5 font-sans"
            >
              <div className="w-10 h-10 rounded-xl bg-rosewater/60 text-pomegranate flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-clove leading-snug">
                {card.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {card.desc}
              </p>
              <span className="text-xs font-semibold text-brass-deep block pt-1">
                {card.action}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Interactive Form Area */}
      <section className="py-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Instructions (4 cols) */}
            <div className="lg:col-span-4 space-y-6 font-sans">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pomegranate block">
                  Instructions
                </span>
                <h2 className="font-serif text-3xl font-bold text-clove mt-1">
                  How it works
                </h2>
              </div>

              <ol className="space-y-4 text-sm text-muted">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-linen font-bold text-clove flex items-center justify-center flex-shrink-0 text-xs">
                    1
                  </span>
                  <span>Fill in the short digital form. It takes about 3 minutes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-linen font-bold text-clove flex items-center justify-center flex-shrink-0 text-xs">
                    2
                  </span>
                  <span>Select any relevant medical conditions or sensitivities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-linen font-bold text-clove flex items-center justify-center flex-shrink-0 text-xs">
                    3
                  </span>
                  <span>Review your summary and click "Print / Save PDF".</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-linen font-bold text-clove flex items-center justify-center flex-shrink-0 text-xs">
                    4
                  </span>
                  <span>Bring the sheet to our desk at Old Ranipur More, Haridwar.</span>
                </li>
              </ol>

              <div className="bg-linen/60 rounded-2xl p-5 border border-ink/10 space-y-2">
                <div className="flex items-center gap-2 text-clove font-bold text-xs uppercase tracking-wider">
                  <Shield className="w-4 h-4 text-pomegranate" />
                  <span>Privacy First</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  Everything you type here remains entirely on your personal device. No sensitive data is transmitted to an unsecured server.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  to="/contact/book-appointment"
                  variant="outline"
                  fullWidth
                  icon={<Calendar className="w-4 h-4" />}
                >
                  Schedule an Appointment First
                </Button>
              </div>
            </div>

            {/* Right Registration Wizard (8 cols) */}
            <div className="lg:col-span-8">
              <PatientRegistrationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Help Band */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Questions about your paperwork?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto">
            Call our clinic front desk and we will happily assist you with anything you are unsure about.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href={CLINIC.phoneTel} variant="secondary" size="md" icon={<Phone className="w-4 h-4" />}>
              Call {CLINIC.phone.display}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
