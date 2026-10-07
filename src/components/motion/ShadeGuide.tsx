import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

export interface ShadeOption {
  id: string;
  code: string;
  name: string;
  color: string;
  toothFill: string;
  border: string;
  isBrightest?: boolean;
}

const SHADES: ShadeOption[] = [
  {
    id: 'a35',
    code: 'A3.5',
    name: 'Natural Warm',
    color: '#E8D2A8',
    toothFill: '#EADBBE',
    border: '#CBB285',
  },
  {
    id: 'a3',
    code: 'A3',
    name: 'Classic Natural',
    color: '#F2E2BE',
    toothFill: '#F6E9CC',
    border: '#DAC196',
  },
  {
    id: 'a2',
    code: 'A2',
    name: 'Clean Enamel',
    color: '#F8EED6',
    toothFill: '#FCF3DC',
    border: '#E8D4B4',
  },
  {
    id: 'a1',
    code: 'A1',
    name: 'Luminous',
    color: '#FCF7E8',
    toothFill: '#FDFBF0',
    border: '#F0E5D0',
  },
  {
    id: 'bl1',
    code: 'BL1',
    name: 'Brightest Pearl',
    color: '#FFFFFF',
    toothFill: '#FFFFFF',
    border: '#C19A5B',
    isBrightest: true,
  },
];

export const ShadeGuide: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [activeShadeIdx, setActiveShadeIdx] = useState<number>(2); // default A2
  const { isReducedMotion } = useReducedMotionPreference();

  const activeShade = SHADES[activeShadeIdx];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveShadeIdx((prev) => (prev + 1) % SHADES.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveShadeIdx((prev) => (prev - 1 + SHADES.length) % SHADES.length);
    }
  };

  return (
    <div
      className={`bg-pearl rounded-3xl p-5 sm:p-6 shadow-card-elevated border border-ink/10 font-sans select-none ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-pomegranate block">
            Interactive Dental Shade Guide
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-clove mt-0.5">
            Explore Natural Enamel Tones
          </h4>
        </div>

        {activeShade.isBrightest && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brass/15 text-brass-deep border border-brass/30 animate-pulse">
            <Sparkles className="w-3 h-3 text-brass" /> Brightest
          </span>
        )}
      </div>

      {/* Illustrated Row of 6 Upper Front Teeth */}
      <div className="relative bg-linen/50 rounded-2xl p-4 sm:p-5 border border-ink/10 flex items-center justify-center min-h-[90px] overflow-hidden">
        {/* Sparkles on brightest shade */}
        <AnimatePresence>
          {activeShade.isBrightest && !isReducedMotion && (
            <>
              {/* Sparkle 1 */}
              <motion.svg
                viewBox="0 0 24 24"
                className="absolute top-2 left-1/4 w-4 h-4 text-brass pointer-events-none z-20"
                initial={{ scale: 0, opacity: 0, rotate: -30 }}
                animate={{ scale: [0, 1.2, 0.9, 0], opacity: [0, 1, 1, 0], rotate: 45 }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
                fill="currentColor"
              >
                <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
              </motion.svg>

              {/* Sparkle 2 */}
              <motion.svg
                viewBox="0 0 24 24"
                className="absolute bottom-2 right-1/4 w-4 h-4 text-brass pointer-events-none z-20"
                initial={{ scale: 0, opacity: 0, rotate: 20 }}
                animate={{ scale: [0, 1.3, 0.9, 0], opacity: [0, 1, 1, 0], rotate: -40 }}
                transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, repeatDelay: 0.8 }}
                fill="currentColor"
              >
                <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9Z" />
              </motion.svg>
            </>
          )}
        </AnimatePresence>

        {/* Gum Line Wave */}
        <div className="w-full max-w-[280px]">
          <svg viewBox="0 0 240 68" className="w-full h-auto overflow-visible" aria-hidden="true">
            {/* Soft Gum Arch Header */}
            <path
              d="M10 20 Q30 8, 50 16 Q70 6, 90 14 Q110 4, 130 14 Q150 4, 170 14 Q190 6, 210 16 Q230 8, 240 20 L240 0 L0 0 L0 20 Z"
              fill="#D98A9E"
              opacity="0.3"
            />
            <path
              d="M10 20 Q30 8, 50 16 Q70 6, 90 14 Q110 4, 130 14 Q150 4, 170 14 Q190 6, 210 16 Q230 8, 240 20"
              fill="none"
              stroke="#8C2F4B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Tooth 1: Right Canine */}
            <motion.path
              d="M14 20 C14 36, 17 50, 24 56 C31 50, 34 36, 34 20 Z"
              animate={{ fill: activeShade.toothFill }}
              transition={{ duration: 0.3 }}
              stroke="#1E1A1D"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />

            {/* Tooth 2: Right Lateral Incisor */}
            <motion.path
              d="M40 18 C40 38, 43 54, 52 59 C61 54, 64 38, 64 18 Z"
              animate={{ fill: activeShade.toothFill }}
              transition={{ duration: 0.3 }}
              stroke="#1E1A1D"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />

            {/* Tooth 3: Right Central Incisor */}
            <motion.path
              d="M72 16 C72 40, 75 62, 86 66 C97 62, 100 40, 100 16 Z"
              animate={{ fill: activeShade.toothFill }}
              transition={{ duration: 0.3 }}
              stroke="#1E1A1D"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />

            {/* Tooth 4: Left Central Incisor */}
            <motion.path
              d="M106 16 C106 40, 109 62, 120 66 C131 62, 134 40, 134 16 Z"
              animate={{ fill: activeShade.toothFill }}
              transition={{ duration: 0.3 }}
              stroke="#1E1A1D"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />

            {/* Tooth 5: Left Lateral Incisor */}
            <motion.path
              d="M142 18 C142 38, 145 54, 154 59 C163 54, 166 38, 166 18 Z"
              animate={{ fill: activeShade.toothFill }}
              transition={{ duration: 0.3 }}
              stroke="#1E1A1D"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />

            {/* Tooth 6: Left Canine */}
            <motion.path
              d="M172 20 C172 36, 175 50, 182 56 C189 50, 192 36, 192 20 Z"
              animate={{ fill: activeShade.toothFill }}
              transition={{ duration: 0.3 }}
              stroke="#1E1A1D"
              strokeWidth="1.2"
              strokeOpacity="0.25"
            />
          </svg>
        </div>
      </div>

      {/* Swatches Row (Touch & Keyboard Friendly) */}
      <div className="mt-4">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-muted">Active: <strong className="text-clove">{activeShade.code} — {activeShade.name}</strong></span>
          <span className="text-[11px] font-mono text-muted">Natural → Bright</span>
        </div>

        <div
          role="tablist"
          aria-label="Dental shade swatches"
          className="grid grid-cols-5 gap-2"
        >
          {SHADES.map((shade, idx) => {
            const isSelected = activeShadeIdx === idx;
            return (
              <button
                key={shade.id}
                role="tab"
                id={`shade-tab-${shade.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveShadeIdx(idx)}
                onKeyDown={handleKeyDown}
                style={{ backgroundColor: shade.color }}
                className={`py-2 px-1 rounded-xl text-center border transition-all flex flex-col items-center justify-center relative ${
                  isSelected
                    ? 'ring-2 ring-pomegranate shadow-md scale-105 border-pomegranate'
                    : 'border-ink/15 hover:border-pomegranate/40 opacity-85 hover:opacity-100'
                }`}
              >
                <span className="font-mono text-xs font-bold text-clove block">
                  {shade.code}
                </span>
                <span className="text-[9px] text-muted block truncate max-w-full">
                  {shade.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
