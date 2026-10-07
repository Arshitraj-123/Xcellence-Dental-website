import React, { useState, useRef, useEffect } from 'react';

/* ─── Types ─── */
type ImgMask = 'arch' | 'rounded' | 'none';

export type FocalPoint = string | {
  mobile?: string;   // e.g. "center 20%"
  desktop?: string;  // e.g. "center 40%"
};

interface ImgProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "4/5" or "16/9" */
  ratio?: string;
  /** Object-position per breakpoint */
  focal?: FocalPoint;
  /** Mark as hero/LCP image: fetchpriority=high, no lazy */
  priority?: boolean;
  /** Shape mask */
  mask?: ImgMask;
  /** srcSet widths – provide 480, 960, 1600 px variant paths. Map of width -> URL */
  srcSet?: Record<number, string>;
  /** sizes attribute for responsive images */
  sizes?: string;
  className?: string;
}

/* Mask styles */
const maskStyles: Record<ImgMask, string> = {
  arch:    'rounded-t-[180px] sm:rounded-t-[220px] rounded-b-[24px] sm:rounded-b-[28px]',
  rounded: 'rounded-[20px] sm:rounded-[26px]',
  none:    '',
};

/* Tooth mark SVG for fallback */
const FallbackMark: React.FC = () => (
  <svg viewBox="0 0 48 52" className="w-10 h-10 opacity-30" aria-hidden="true">
    <path
      d="M24 6c-6-4-15-2-16 7-1 7 3 11 4 18 1 8 3 15 6 15 4 0 3-9 6-12 3 3 2 12 6 12 3 0 5-7 6-15 1-7 5-11 4-18-1-9-10-11-16-7z"
      fill="#8C2F4B"
    />
    <path
      d="M14 20c6 7 14 7 20 0"
      fill="none"
      stroke="#A67C3A"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  ratio,
  focal,
  priority = false,
  mask = 'none',
  srcSet,
  sizes,
  className = '',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /* Build srcSet string */
  const srcSetStr = srcSet
    ? Object.entries(srcSet)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', ')
    : undefined;

  /* Check if already cached (SSR or fast cache hit) */
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-rosewater/40 ${maskStyles[mask]} ${className}`}
      style={{
        aspectRatio: ratio || undefined,
        // @ts-expect-error CSS variable custom properties
        '--focal-mobile': typeof focal === 'string' ? focal : (focal?.mobile || 'center center'),
        '--focal-desktop': typeof focal === 'string' ? focal : (focal?.desktop || focal?.mobile || 'center center'),
      }}
    >
      {/* Soft loading placeholder */}
      {!loaded && !errored && (
        <div
          className="absolute inset-0 bg-rosewater/30 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Error fallback: rosewater panel with tooth mark */}
      {errored ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-rosewater/50 text-muted text-sm text-center p-4">
          <FallbackMark />
          <span className="font-sans text-fluid-xs">{alt}</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? undefined : 'lazy'}
          decoding={priority ? undefined : 'async'}
          /* fetchpriority for hero images */
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          srcSet={srcSetStr}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={[
            ratio ? 'w-full h-full object-cover' : 'w-full h-auto object-cover',
            '[object-position:var(--focal-mobile)] md:[object-position:var(--focal-desktop)]',
            'transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
      )}
    </div>
  );
};
