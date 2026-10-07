import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { GALLERY_CASES } from '@/data/gallery';
import { CLINIC } from '@/data/clinic';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { BeforeAfter } from '@/components/gallery/BeforeAfterSlider';
import { Container } from '@/components/ui/Container';
import { EnamelShine } from '@/components/motion';

export const SmileGalleryPage: React.FC = () => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(GALLERY_CASES.map((c) => c.category))];

  const filteredCases = GALLERY_CASES.filter(
    (c) => categoryFilter === 'All' || c.category === categoryFilter
  );

  const currentCase = GALLERY_CASES[selectedCaseIdx] || GALLERY_CASES[0];

  const handleStep = (delta: number) => {
    const currentFilteredIdx = filteredCases.findIndex((c) => c.id === currentCase.id);
    const nextFilteredIdx = (currentFilteredIdx + delta + filteredCases.length) % filteredCases.length;
    const nextCase = filteredCases[nextFilteredIdx];
    const globalIdx = GALLERY_CASES.findIndex((c) => c.id === nextCase.id);
    setSelectedCaseIdx(globalIdx);
  };

  // Keyboard navigation for previous/next cases (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handleStep(-1);
      } else if (e.key === 'ArrowRight') {
        handleStep(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCase, filteredCases]);

  return (
    <>
      <Seo
        title="Smile Gallery | Before & After Transformations"
        description="See smile transformations at Xcellence Dental Clinic in Haridwar, Uttarakhand. Interactive before and after comparison slider for whitening, veneers, and dental implants."
        canonical="/smile-gallery"
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
            <span className="text-brass font-medium">Smile Gallery</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Aesthetic & Restorative Cases
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              See what a{' '}
              <EnamelShine highlightColor="text-brass italic font-normal">healthy smile</EnamelShine>{' '}
              can look like.
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Drag the interactive comparison slider or use keyboard arrow keys to inspect before and after clinical outcomes.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── Main Gallery Box (Overlapping Hero) ─── */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-pearl rounded-3xl p-6 sm:p-10 border border-ink/10 shadow-card-elevated space-y-8">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by treatment category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategoryFilter(cat);
                  const matchingCase = GALLERY_CASES.find((c) => cat === 'All' || c.category === cat);
                  if (matchingCase) {
                    setSelectedCaseIdx(GALLERY_CASES.findIndex((c) => c.id === matchingCase.id));
                  }
                }}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-semibold border transition-all ${
                  categoryFilter === cat
                    ? 'bg-pomegranate border-pomegranate text-pearl shadow-sm'
                    : 'bg-enamel/40 border-ink/15 text-ink hover:border-pomegranate/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive Before & After Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Component (7 cols) */}
            <div className="lg:col-span-7">
              <BeforeAfter currentCase={currentCase} />
            </div>

            {/* Case Details Card (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <Badge variant="rosewater" size="sm">
                  {currentCase.category}
                </Badge>
                {currentCase.typicalVisits && (
                  <span className="inline-flex items-center gap-1 text-xs font-sans text-muted">
                    <Clock className="w-3.5 h-3.5 text-pomegranate" />
                    {currentCase.typicalVisits}
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                  {currentCase.title}
                </h2>
                <span className="text-xs font-mono font-semibold text-brass-deep uppercase tracking-wider block mt-1">
                  Service: {currentCase.service}
                </span>
              </div>

              <p className="text-sm sm:text-base font-sans text-muted leading-relaxed">
                {currentCase.description}
              </p>

              <div className="p-3.5 rounded-2xl bg-linen/50 border border-ink/5 text-xs text-muted font-sans space-y-1">
                <p>
                  <strong>Clinical Philosophy:</strong> Conservative tooth preparation and natural translucency matching designed to complement facial harmony.
                </p>
              </div>

              {/* Navigation Controls & Action */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStep(-1)}
                    className="p-2.5 rounded-xl border border-ink/15 hover:bg-linen hover:border-pomegranate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate"
                    aria-label="Previous smile case"
                  >
                    <ArrowLeft className="w-4 h-4 text-ink" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStep(1)}
                    className="p-2.5 rounded-xl border border-ink/15 hover:bg-linen hover:border-pomegranate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate"
                    aria-label="Next smile case"
                  >
                    <ArrowRight className="w-4 h-4 text-ink" />
                  </button>
                  <span className="text-xs font-mono text-muted pl-1">
                    {filteredCases.findIndex((c) => c.id === currentCase.id) + 1} of {filteredCases.length}
                  </span>
                </div>

                <Button
                  to="/book-appointment"
                  variant="primary"
                  size="sm"
                  icon={<Calendar className="w-4 h-4" />}
                >
                  Consult Doctors
                </Button>
              </div>
            </div>
          </div>

          {/* Case Thumbnails Switcher Row */}
          <div className="pt-6 border-t border-ink/10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted block mb-3">
              Browse All Cases:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {filteredCases.map((c) => {
                const isSelected = c.id === currentCase.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      const globalIdx = GALLERY_CASES.findIndex((g) => g.id === c.id);
                      setSelectedCaseIdx(globalIdx);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'border-pomegranate bg-rosewater/40 shadow-sm ring-2 ring-pomegranate/20'
                        : 'border-ink/10 bg-enamel hover:border-pomegranate/40'
                    }`}
                  >
                    <span className="font-serif text-sm font-bold text-clove block truncate">
                      {c.title}
                    </span>
                    <span className="text-[10px] font-sans text-muted block truncate mt-0.5">
                      {c.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <Container size="md" className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Wondering what is possible for your smile?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto">
            Book an aesthetic or restorative evaluation with Dr Himanshi Sharma and Dr Shailesh Sharma in Haridwar.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button to="/book-appointment" variant="secondary" size="md">
              Book Consultation
            </Button>
            <Button href={CLINIC.phoneTel} variant="ghost" size="md">
              Call {CLINIC.phone.display}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};
