import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getServiceById } from '@/data/services';
import { ServiceDetailTemplate } from '@/components/services/ServiceDetailTemplate';
import { Button } from '@/components/common/Button';
import { Seo } from '@/components/common/Seo';

export const ServiceDetailPage: React.FC = () => {
  const { slug, serviceId } = useParams<{ slug?: string; serviceId?: string }>();

  // Support both :slug and :serviceId param names
  let normalizedId = slug || serviceId || '';
  if (normalizedId === 'implant-dentistry') normalizedId = 'implantology';
  if (normalizedId === 'periodontists') normalizedId = 'periodontics';

  // If accessing removed/disabled same-day-dentistry, redirect directly to services list
  if (normalizedId === 'same-day-dentistry') {
    return <Navigate to="/services" replace />;
  }

  const service = getServiceById(normalizedId);

  // Enabled services only
  if (!service || !service.enabled) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center font-sans space-y-4">
        <Seo title="Service Not Found" noIndex />
        <h1 className="font-serif text-3xl font-bold text-clove">
          Service Not Found
        </h1>
        <p className="text-muted text-sm leading-relaxed">
          The requested dental service page is currently unavailable or has been moved.
        </p>
        <div className="pt-2">
          <Button to="/services" variant="primary">
            View All Dental Services
          </Button>
        </div>
      </div>
    );
  }

  return <ServiceDetailTemplate service={service} />;
};
