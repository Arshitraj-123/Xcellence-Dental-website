import React, { useState } from 'react';

interface ImgProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  frame?: 'arch' | 'arch-reverse' | 'rounded-card' | 'none';
  loading?: 'lazy' | 'eager';
  objectFit?: 'cover' | 'contain';
}

export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '',
  frame = 'none',
  loading = 'lazy',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  let frameClasses = '';
  if (frame === 'arch') {
    frameClasses = 'rounded-t-[180px] sm:rounded-t-[220px] rounded-b-[24px] sm:rounded-b-[28px]';
  } else if (frame === 'arch-reverse') {
    frameClasses = 'rounded-b-[180px] sm:rounded-b-[220px] rounded-t-[24px] sm:rounded-t-[28px]';
  } else if (frame === 'rounded-card') {
    frameClasses = 'rounded-[20px] sm:rounded-[26px]';
  }

  return (
    <div
      className={`relative overflow-hidden bg-rosewater/40 ${aspectRatio} ${frameClasses} ${className}`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-rosewater/30 animate-pulse" aria-hidden="true" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-rosewater/50 text-muted text-sm text-center p-4">
          <span>{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
