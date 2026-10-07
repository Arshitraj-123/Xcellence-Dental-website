import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CLINIC } from '@/data/clinic';

export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = `${CLINIC.tagline}. ${CLINIC.experience}. Complete dental care including Laser Dentistry, Implants, and Periodontics in Haridwar.`,
  canonical,
  ogImage = '/images/hero-family.webp',
  ogType = 'website',
  noIndex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${CLINIC.name}`
    : `${CLINIC.name} | Best Dental Clinic in Haridwar, Uttarakhand`;

  const siteUrl = 'https://xcellencedentalharidwar.com';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Structured Data (JSON-LD) for Google & Search Engines (Dentist Schema)
  // Strictly NO rating or review claims per Prompt 0
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINIC.name,
    description,
    url: siteUrl,
    telephone: CLINIC.phone.display,
    email: CLINIC.email,
    image: fullOgImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC.address.street,
      addressLocality: CLINIC.address.city,
      addressRegion: CLINIC.address.state,
      postalCode: CLINIC.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '29.9360',
      longitude: '78.1362',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    priceRange: '₹₹',
    medicalSpecialty: [
      'Dentistry',
      'Periodontics',
      'Dental Implants',
      'Laser Dentistry',
      'Cosmetic Dentistry',
      'Endodontics',
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={CLINIC.name} />
      <meta property="og:image" content={fullOgImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* JSON-LD Schema (No fake reviews or ratings) */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
