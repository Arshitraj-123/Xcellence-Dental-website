import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone } from 'lucide-react';
import { CLINIC } from '../../data/clinic';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { AppointmentForm } from '../../components/forms/AppointmentForm';

export const BookAppointmentPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Book an Appointment | {CLINIC.name} Haridwar</title>
        <meta
          name="description"
          content="Book your dental appointment online at Xcellence Dental Clinic in Haridwar, Uttarakhand. Fast scheduling with Dr Himanshi Sharma and Dr Shailesh Sharma."
        />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-clove text-enamel py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/clinic-wide.jpg"
            alt="Book appointment banner"
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
            <Link to="/contact" className="hover:text-brass transition-colors">
              Contact
            </Link>
            <span>/</span>
            <span className="text-brass font-medium">Book Appointment</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Instant Scheduling
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              Book your visit in four quick steps
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Accepting new patients and walk-ins daily. Open seven days a week, 10:00 AM to 9:00 PM.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Area Overlapping Hero */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AppointmentForm />
      </section>

      {/* Bottom Emergency Band */}
      <section className="py-20 bg-pomegranate text-pearl text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pearl">
            Have an acute dental emergency right now?
          </h2>
          <p className="text-sm sm:text-base font-sans text-pearl/90 max-w-lg mx-auto">
            Skip the online form and call our emergency line directly. We will prepare an operatory immediately for your arrival.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href={CLINIC.phoneTel} variant="secondary" size="lg" icon={<Phone className="w-5 h-5" />}>
              Call +91 96433 65651
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
