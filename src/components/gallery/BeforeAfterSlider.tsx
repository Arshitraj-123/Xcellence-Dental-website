import React, { useState } from 'react';
import { GalleryCase } from '@/data/gallery';

interface BeforeAfterProps {
  currentCase: GalleryCase;
  className?: string;
}

/**
 * Generates an SVG dental diagram for cases that are currently illustrative.
 */
function renderSmileSvg(color: string = '#FFFFFF', def: Record<number, any> = {}) {
  const W = [46, 50, 58, 66, 66, 58, 50, 46];
  const H = [78, 86, 100, 112, 112, 100, 86, 78];
  let x = 70;
  const teethElements: React.ReactNode[] = [];

  for (let i = 0; i < 8; i++) {
    const w = W[i];
    const d = def[i] || {};
    if (d.miss) {
      x += w + 6;
      continue;
    }
    const h = H[i] - (d.short || 0);
    const y = 84 + (112 - H[i]) * 0.4 + (d.short || 0) * 0.3;
    const c = d.col || color;

    teethElements.push(
      <rect
        key={`tooth-${i}`}
        x={x}
        y={y}
        width={w + (d.wide || 0)}
        height={h}
        rx={i > 2 && i < 5 ? 18 : 16}
        fill={c}
        stroke="#2A1620"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    );

    if (d.chip) {
      teethElements.push(
        <path
          key={`chip-${i}`}
          d={`M${x + w - 4} ${y} l-${d.chip} 0 l${d.chip} ${d.chip}z`}
          fill="#8C2F4B"
        />
      );
    }

    x += w + (d.gap ?? 6) + (d.wide || 0);
  }

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full object-cover select-none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="640" height="400" fill="#F3DFDA" />
      <ellipse cx="320" cy="215" rx="270" ry="120" fill="#8C2F4B" opacity="0.3" />
      {teethElements}
      <path d="M30 140Q320 20 610 140Q320 70 30 140Z" fill="#F3DFDA" />
      <path d="M30 290Q320 400 610 290Q320 350 30 290Z" fill="#F3DFDA" />
    </svg>
  );
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ currentCase, className = '' }) => {
  const [sliderPos, setSliderPos] = useState(50);

  const renderContent = (isAfter: boolean) => {
    if (currentCase.isPhoto && currentCase.beforeImage && currentCase.afterImage) {
      return (
        <img
          src={isAfter ? currentCase.afterImage : currentCase.beforeImage}
          alt={isAfter ? `${currentCase.title} after treatment` : `${currentCase.title} before treatment`}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      );
    }

    if (isAfter) {
      return renderSmileSvg(currentCase.afterSvgDef?.color || '#FFFFFF');
    }

    return renderSmileSvg(
      currentCase.beforeSvgDef?.color || '#FFFFFF',
      currentCase.beforeSvgDef?.def || {}
    );
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Slider Viewport (clip-path based) */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9.5] rounded-3xl overflow-hidden bg-linen border border-ink/10 shadow-soft select-none touch-pan-y">
        {/* Before Layer (Base) */}
        <div className="absolute inset-0 z-10 select-none">
          {renderContent(false)}
        </div>

        {/* After Layer (Clip-path based revelation) */}
        <div
          className="absolute inset-0 z-20 overflow-hidden select-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          {renderContent(true)}
        </div>

        {/* Badges */}
        <span className="absolute top-4 left-4 z-30 px-3.5 py-1 rounded-full text-xs font-sans font-bold bg-clove/85 text-enamel shadow-sm pointer-events-none select-none">
          Before
        </span>
        <span className="absolute top-4 right-4 z-30 px-3.5 py-1 rounded-full text-xs font-sans font-bold bg-pomegranate text-pearl shadow-sm pointer-events-none select-none">
          After
        </span>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-pearl shadow-xl pointer-events-none -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pearl border-2 border-pomegranate shadow-card-elevated flex items-center justify-center text-pomegranate font-bold text-xs tracking-widest select-none">
            ‹ ›
          </div>
        </div>

        {/* Accessible Range Input (Keyboard, Touch & Mouse draggable) */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          aria-label={`Compare before and after for ${currentCase.title}. Current slider position: ${sliderPos} percent`}
          className="absolute inset-0 z-40 w-full h-full opacity-0 cursor-ew-resize m-0 p-0"
        />
      </div>

      {/* Required Captions & Consent Note */}
      <div className="text-center space-y-1 pt-1 font-sans">
        <p className="text-xs text-muted italic">
          {currentCase.isPhoto ? (
            <span>
              Patient consent on record for educational display. <strong>Individual results vary.</strong>
            </span>
          ) : (
            <span>
              Illustrated clinical case example. <strong>Individual results vary.</strong>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

// Compatibility export
export const BeforeAfterSlider = BeforeAfter;
