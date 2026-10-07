import React from 'react';
import { Home, ArrowRight, Phone } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo title="Page Not Found" noIndex />

      <section className="py-24 sm:py-36 text-center bg-enamel text-ink">
        <div className="max-w-xl mx-auto px-4 space-y-6">
          <span className="font-serif text-8xl sm:text-9xl font-bold text-pomegranate block leading-none select-none">
            404
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-clove">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base font-sans text-muted leading-relaxed max-w-md mx-auto">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let's get you back on track.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <Button to="/" variant="primary" icon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
            <Button to="/services" variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
              Dental Services
            </Button>
            <Button
              href={CLINIC.phoneTel}
              variant="outline"
              icon={<Phone className="w-4 h-4 text-pomegranate" />}
            >
              Call Clinic
            </Button>
          </div>

          <div className="pt-8 border-t border-ink/10 text-xs font-sans text-muted">
            <span>Need immediate dental assistance? Call our clinic directly at </span>
            <a href={CLINIC.phoneTel} className="font-semibold text-pomegranate hover:underline">
              {CLINIC.phone.display}
            </a>
            <span className="block mt-1">Haridwar · Open Daily 10:00 AM – 9:00 PM</span>
          </div>
        </div>
      </section>
    </>
  );
};
