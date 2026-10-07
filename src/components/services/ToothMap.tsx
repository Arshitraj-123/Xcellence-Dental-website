import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Stethoscope, AlertTriangle } from 'lucide-react';

interface ToothZone {
  id: string;
  name: string;
  icon: string;
  symptoms: string;
  recommendedService: string;
  serviceSlug: string;
  leadDoctor: string;
  highlightText: string;
}

const TOOTH_ZONES: ToothZone[] = [
  {
    id: 'front-teeth',
    name: 'Front Tooth Crown (Smile Line)',
    icon: 'Sparkles',
    symptoms: 'Chips, uneven edges, discoloration, or spacing between incisors.',
    recommendedService: 'Cosmetic & Laser Dentistry',
    serviceSlug: 'laser-dentistry',
    leadDoctor: 'Dr Shailesh Sharma & Dr Himanshi Sharma',
    highlightText: 'Minimally invasive laser contouring, veneers, and aesthetic smile enhancements.',
  },
  {
    id: 'gums',
    name: 'Gums & Supporting Tissue',
    icon: 'ShieldCheck',
    symptoms: 'Bleeding while brushing, tender swollen gums, or receding gum-lines.',
    recommendedService: 'Periodontics',
    serviceSlug: 'periodontics',
    leadDoctor: 'Dr Himanshi Sharma, BDS, MDS',
    highlightText: 'Specialized periodontal therapies to halt bone loss and protect the foundation of your smile.',
  },
  {
    id: 'missing-tooth',
    name: 'Missing-Tooth Gap',
    icon: 'Stethoscope',
    symptoms: 'Extracted tooth, empty gap, shifting teeth, or bite instability.',
    recommendedService: 'Implantology',
    serviceSlug: 'implantology',
    leadDoctor: 'Dr Himanshi Sharma & Dr Shailesh Sharma',
    highlightText: 'Permanent biocompatible titanium implants that restore chewing function and preserve jaw bone.',
  },
  {
    id: 'molars',
    name: 'Molars & Chewing Crowns',
    icon: 'Stethoscope',
    symptoms: 'Cavities, broken restorations, deep temperature sensitivity, or bite pain.',
    recommendedService: 'Restorative Dentistry',
    serviceSlug: 'restorative-dentistry',
    leadDoctor: 'Dr Shailesh Sharma & Dr Himanshi Sharma',
    highlightText: 'Durable composite restorations, protective crowns, and conservative fillings.',
  },
  {
    id: 'emergency',
    name: 'Acute Pain or Trauma',
    icon: 'AlertTriangle',
    symptoms: 'Severe throbbing toothache, knocked-out tooth, fracture, or sudden swelling.',
    recommendedService: 'Emergency Dental Care',
    serviceSlug: 'emergency-care',
    leadDoctor: 'Immediate Clinical Triage',
    highlightText: 'Same-day clinical appointments and priority pain relief in Haridwar.',
  },
];

const ZONE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  ShieldCheck,
  Stethoscope,
  AlertTriangle,
};

export const ToothMap: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('gums');

  const activeZone = TOOTH_ZONES.find((z) => z.id === activeZoneId) || TOOTH_ZONES[0];

  return (
    <div className="bg-pearl rounded-3xl p-6 sm:p-8 border border-ink/10 shadow-card-elevated font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pomegranate" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate">
              Interactive Mouth & Jaw Map
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove mt-1">
            Where are you experiencing dental concerns?
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Hover or tap any dental area on the jaw diagram or select from the list below:
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Illustrated Jaw / Mouth SVG Diagram (6 cols) */}
        <div className="lg:col-span-6 bg-linen/50 rounded-3xl p-6 border border-ink/10 flex flex-col items-center">
          <span className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2">
            Upper & Lower Dental Arch
          </span>

          <svg
            viewBox="0 0 340 220"
            className="w-full max-w-[320px] h-auto overflow-visible select-none"
            role="group"
            aria-label="Interactive dental arch diagram"
          >
            {/* 1. GUM ARCH BACKGROUND (Clickable for Periodontics) */}
            <path
              d="M 20 60 C 20 10, 320 10, 320 60 C 310 95, 30 95, 20 60 Z"
              fill={activeZoneId === 'gums' ? '#F3DFDA' : '#F6EAE6'}
              stroke={activeZoneId === 'gums' ? '#8C2F4B' : '#E8D2CC'}
              strokeWidth={activeZoneId === 'gums' ? '3' : '1.5'}
              className="cursor-pointer transition-all hover:fill-rosewater"
              onClick={() => setActiveZoneId('gums')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveZoneId('gums')}
              tabIndex={0}
              role="button"
              aria-label="Gums and supporting tissues - Periodontics"
            />
            <text x="170" y="32" textAnchor="middle" className="text-[10px] font-mono fill-muted pointer-events-none">
              Gums & Bone Foundation
            </text>

            {/* TEETH ROW */}
            {/* Left Molars (Clickable for Molars / Restorative) */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Molars - Restorative Dentistry"
              onClick={() => setActiveZoneId('molars')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveZoneId('molars')}
              className="cursor-pointer group"
            >
              <rect
                x="30"
                y="55"
                width="28"
                height="38"
                rx="8"
                fill={activeZoneId === 'molars' ? '#FFF' : '#FAF6EE'}
                stroke={activeZoneId === 'molars' ? '#8C2F4B' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'molars' ? '2.5' : '1.5'}
              />
              <rect
                x="62"
                y="52"
                width="26"
                height="38"
                rx="8"
                fill={activeZoneId === 'molars' ? '#FFF' : '#FAF6EE'}
                stroke={activeZoneId === 'molars' ? '#8C2F4B' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'molars' ? '2.5' : '1.5'}
              />
            </g>

            {/* Left Premolar (Missing Tooth Gap - Clickable for Implantology) */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Missing tooth gap - Dental Implants"
              onClick={() => setActiveZoneId('missing-tooth')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveZoneId('missing-tooth')}
              className="cursor-pointer group"
            >
              <rect
                x="92"
                y="52"
                width="24"
                height="36"
                rx="6"
                fill={activeZoneId === 'missing-tooth' ? '#C19A5B20' : '#EBE4D8'}
                stroke={activeZoneId === 'missing-tooth' ? '#C19A5B' : '#A67C3A'}
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <text x="104" y="74" textAnchor="middle" className="text-[12px] font-mono font-bold fill-brass">
                ?
              </text>
            </g>

            {/* Front Incisors (Clickable for Front Teeth Crown / Laser & Cosmetic) */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Front teeth crowns - Cosmetic & Laser Dentistry"
              onClick={() => setActiveZoneId('front-teeth')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveZoneId('front-teeth')}
              className="cursor-pointer group"
            >
              {/* Central Left */}
              <rect
                x="120"
                y="50"
                width="24"
                height="44"
                rx="7"
                fill={activeZoneId === 'front-teeth' ? '#FFF' : '#FDFBF7'}
                stroke={activeZoneId === 'front-teeth' ? '#8C2F4B' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'front-teeth' ? '2.5' : '1.5'}
              />
              {/* Central Right */}
              <rect
                x="148"
                y="50"
                width="24"
                height="44"
                rx="7"
                fill={activeZoneId === 'front-teeth' ? '#FFF' : '#FDFBF7'}
                stroke={activeZoneId === 'front-teeth' ? '#8C2F4B' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'front-teeth' ? '2.5' : '1.5'}
              />
              {/* Lateral Right */}
              <rect
                x="176"
                y="52"
                width="22"
                height="40"
                rx="6"
                fill={activeZoneId === 'front-teeth' ? '#FFF' : '#FDFBF7'}
                stroke={activeZoneId === 'front-teeth' ? '#8C2F4B' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'front-teeth' ? '2.5' : '1.5'}
              />
            </g>

            {/* Right Premolar & Canine */}
            <rect
              x="202"
              y="54"
              width="24"
              height="38"
              rx="6"
              fill={activeZoneId === 'molars' ? '#FFF' : '#FAF6EE'}
              stroke={activeZoneId === 'molars' ? '#8C2F4B' : '#D4C4B5'}
              strokeWidth="1.5"
              className="cursor-pointer"
              onClick={() => setActiveZoneId('molars')}
            />

            {/* Right Molars (Clickable for Acute Pain / Emergency or Molars) */}
            <g
              role="button"
              tabIndex={0}
              aria-label="Acute pain or trauma - Emergency Care"
              onClick={() => setActiveZoneId('emergency')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveZoneId('emergency')}
              className="cursor-pointer group"
            >
              <rect
                x="230"
                y="56"
                width="28"
                height="38"
                rx="8"
                fill={activeZoneId === 'emergency' ? '#FEE2E2' : '#FAF6EE'}
                stroke={activeZoneId === 'emergency' ? '#DC2626' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'emergency' ? '2.5' : '1.5'}
              />
              <rect
                x="262"
                y="58"
                width="28"
                height="38"
                rx="8"
                fill={activeZoneId === 'emergency' ? '#FEE2E2' : '#FAF6EE'}
                stroke={activeZoneId === 'emergency' ? '#DC2626' : '#D4C4B5'}
                strokeWidth={activeZoneId === 'emergency' ? '2.5' : '1.5'}
              />
              {/* Pulse icon over emergency */}
              {activeZoneId === 'emergency' && (
                <circle cx="276" cy="75" r="4" fill="#DC2626" className="animate-ping" />
              )}
            </g>

            {/* Jaw Arc Guidance Line */}
            <path
              d="M 30 140 C 90 200, 250 200, 310 140"
              fill="none"
              stroke="#A67C3A"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            <text x="170" y="185" textAnchor="middle" className="text-[11px] font-mono fill-muted">
              Tap zones above or select below
            </text>
          </svg>

          {/* Quick zone navigation chips */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-3" role="tablist" aria-label="Tooth symptom zones">
            {TOOTH_ZONES.map((zone) => {
              const isSelected = activeZoneId === zone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-colors ${
                    isSelected
                      ? 'bg-pomegranate text-pearl font-bold'
                      : 'bg-pearl text-muted hover:text-ink'
                  }`}
                >
                  {zone.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Clinical Match Detail Card (6 cols) */}
        <div className="lg:col-span-6 bg-linen/70 rounded-3xl p-6 sm:p-8 border border-ink/10 flex flex-col justify-between min-h-[340px]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-pomegranate bg-rosewater px-3 py-1 rounded-full">
                {(() => {
                  const Icon = ZONE_ICONS[activeZone.icon] || Sparkles;
                  return <Icon className="w-3.5 h-3.5 text-pomegranate" />;
                })()}
                Clinical Match
              </span>
              <span className="text-xs font-mono text-muted">
                {activeZone.name}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                {activeZone.recommendedService}
              </h3>
              <p className="text-xs font-semibold text-clove mt-1">
                Specialist: {activeZone.leadDoctor}
              </p>
            </div>

            <p className="text-sm text-muted leading-relaxed">
              {activeZone.highlightText}
            </p>

            <div className="p-3.5 rounded-xl bg-pearl border border-ink/10 text-xs text-ink/80">
              <strong className="text-clove">Typical indications:</strong> {activeZone.symptoms}
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-ink/10 flex items-center justify-between gap-3">
            <Link
              to={`/services/${activeZone.serviceSlug}`}
              className="text-xs sm:text-sm font-bold text-pomegranate hover:underline inline-flex items-center gap-1.5 group"
            >
              <span>Explore {activeZone.recommendedService}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/book-appointment"
              className="text-xs font-bold px-4 py-2 rounded-full bg-pomegranate text-pearl hover:bg-pomegranate-dark transition-colors shadow-sm"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
