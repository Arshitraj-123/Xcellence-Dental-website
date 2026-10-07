import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { formatWhatsAppLink } from '@/lib/format';

export const MobileActionBar: React.FC = () => {
  const location = useLocation();

  // Hidden on booking page
  if (
    location.pathname === '/book-appointment' ||
    location.pathname === '/contact/book-appointment'
  ) {
    return null;
  }

  const whatsappUrl = formatWhatsAppLink(
    CLINIC.whatsappNumber,
    `Hello ${CLINIC.name}, I would like to inquire about a dental appointment.`
  );

  return (
    <nav
      aria-label="Quick mobile actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-clove/95 backdrop-blur-md text-enamel border-t border-brass/30 shadow-2xl px-3 py-2 pb-[max(0.65rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-3 gap-2 items-center text-center">
        {/* Call Action */}
        <a
          href={CLINIC.phoneTel}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-enamel hover:text-brass transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          aria-label={`Call clinic at ${CLINIC.phone.display}`}
        >
          <Phone className="w-5 h-5 text-brass mb-0.5" />
          <span className="text-[11px] font-sans font-medium tracking-tight leading-none">
            Call Clinic
          </span>
        </a>

        {/* WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-enamel hover:text-emerald-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400 mb-0.5" />
          <span className="text-[11px] font-sans font-medium tracking-tight leading-none">
            WhatsApp
          </span>
        </a>

        {/* Book Visit Action */}
        <Link
          to="/book-appointment"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-pomegranate text-pearl hover:bg-pomegranate-dark transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          aria-label="Book a dental appointment"
        >
          <Calendar className="w-5 h-5 text-pearl mb-0.5" />
          <span className="text-[11px] font-sans font-bold tracking-tight leading-none">
            Book Visit
          </span>
        </Link>
      </div>
    </nav>
  );
};
