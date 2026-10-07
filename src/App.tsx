import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ToothLoader } from './components/layout/ToothLoader';

// ─── Route-level code splitting with React.lazy ───
const HomePage = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage').then((m) => ({ default: m.AboutUsPage })));
const OurDoctorsPage = lazy(() => import('./pages/about/OurDoctorsPage').then((m) => ({ default: m.OurDoctorsPage })));
const SmileGalleryPage = lazy(() => import('./pages/about/SmileGalleryPage').then((m) => ({ default: m.SmileGalleryPage })));
const BlogPage = lazy(() => import('./pages/about/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostDetailPage = lazy(() => import('./pages/about/BlogPostDetailPage').then((m) => ({ default: m.BlogPostDetailPage })));

const ServicesPage = lazy(() => import('./pages/services/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/services/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })));

const PatientFormsPage = lazy(() => import('./pages/patients/PatientFormsPage').then((m) => ({ default: m.PatientFormsPage })));
const PayLaterPage = lazy(() => import('./pages/patients/PayLaterPage').then((m) => ({ default: m.PayLaterPage })));

const ContactPage = lazy(() => import('./pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })));
const BookAppointmentPage = lazy(() => import('./pages/contact/BookAppointmentPage').then((m) => ({ default: m.BookAppointmentPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Dev-only tools
const StyleguidePage = lazy(() => import('./pages/StyleguidePage').then((m) => ({ default: m.StyleguidePage })));
const ContentCheckPage = lazy(() => import('./pages/ContentCheckPage').then((m) => ({ default: m.ContentCheckPage })));

// Helper to redirect legacy /about/blog/:slug to /blog/:slug
const LegacyBlogRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/blog/${slug}` : '/blog'} replace />;
};

export const App: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<ToothLoader isSuspense />}>
        <Routes>
          {/* ─── 1. Home ─── */}
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/loader.html" element={<Navigate to="/" replace />} />

          {/* ─── 2. About Section ─── */}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/about.html" element={<Navigate to="/about" replace />} />
          <Route path="/about/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/about/about-us.html" element={<Navigate to="/about" replace />} />

          {/* ─── 3. Doctors Section ─── */}
          <Route path="/doctors" element={<OurDoctorsPage />} />
          <Route path="/doctors.html" element={<Navigate to="/doctors" replace />} />
          <Route path="/about/our-doctors" element={<Navigate to="/doctors" replace />} />
          <Route path="/about/our-doctors.html" element={<Navigate to="/doctors" replace />} />
          <Route path="/about/our-doctor" element={<Navigate to="/doctors" replace />} />
          <Route path="/about/our-doctor.html" element={<Navigate to="/doctors" replace />} />
          <Route path="/about/doctors" element={<Navigate to="/doctors" replace />} />

          {/* ─── 4. Smile Gallery ─── */}
          <Route path="/smile-gallery" element={<SmileGalleryPage />} />
          <Route path="/smile-gallery.html" element={<Navigate to="/smile-gallery" replace />} />
          <Route path="/about/smile-gallery" element={<Navigate to="/smile-gallery" replace />} />
          <Route path="/about/smile-gallery.html" element={<Navigate to="/smile-gallery" replace />} />

          {/* ─── 5. Blog List & Blog Detail ─── */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
          <Route path="/about/blog" element={<Navigate to="/blog" replace />} />
          <Route path="/about/blog.html" element={<Navigate to="/blog" replace />} />
          <Route path="/about/blog/:slug" element={<LegacyBlogRedirect />} />
          <Route path="/blog/:slug" element={<BlogPostDetailPage />} />

          {/* ─── 6. Dental Services ─── */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services.html" element={<Navigate to="/services" replace />} />
          <Route path="/services/services.html" element={<Navigate to="/services" replace />} />

          {/* Legacy service .html and renamed slug redirects */}
          <Route path="/services/implant-dentistry" element={<Navigate to="/services/implantology" replace />} />
          <Route path="/services/implant-dentistry.html" element={<Navigate to="/services/implantology" replace />} />
          <Route path="/services/periodontists" element={<Navigate to="/services/periodontics" replace />} />
          <Route path="/services/periodontists.html" element={<Navigate to="/services/periodontics" replace />} />
          <Route path="/services/same-day-dentistry" element={<Navigate to="/services" replace />} />
          <Route path="/services/same-day-dentistry.html" element={<Navigate to="/services" replace />} />

          <Route path="/services/laser-dentistry.html" element={<Navigate to="/services/laser-dentistry" replace />} />
          <Route path="/services/implantology.html" element={<Navigate to="/services/implantology" replace />} />
          <Route path="/services/periodontics.html" element={<Navigate to="/services/periodontics" replace />} />
          <Route path="/services/general-dentistry.html" element={<Navigate to="/services/general-dentistry" replace />} />
          <Route path="/services/emergency-care.html" element={<Navigate to="/services/emergency-care" replace />} />
          <Route path="/services/cosmetic-dentistry.html" element={<Navigate to="/services/cosmetic-dentistry" replace />} />
          <Route path="/services/restorative-dentistry.html" element={<Navigate to="/services/restorative-dentistry" replace />} />
          <Route path="/services/oral-surgery.html" element={<Navigate to="/services/oral-surgery" replace />} />
          <Route path="/services/endodontics.html" element={<Navigate to="/services/endodontics" replace />} />
          <Route path="/services/other-specialties.html" element={<Navigate to="/services/other-specialties" replace />} />

          {/* Service Detail (enabled services only handled inside ServiceDetailPage) */}
          <Route path="/services/:slug" element={<ServiceDetailPage />} />

          {/* ─── 7. Patient Forms ─── */}
          <Route path="/patient-forms" element={<PatientFormsPage />} />
          <Route path="/patient-forms.html" element={<Navigate to="/patient-forms" replace />} />
          <Route path="/patients" element={<Navigate to="/patient-forms" replace />} />
          <Route path="/patients.html" element={<Navigate to="/patient-forms" replace />} />
          <Route path="/patients/patient-forms" element={<Navigate to="/patient-forms" replace />} />
          <Route path="/patients/patient-forms.html" element={<Navigate to="/patient-forms" replace />} />

          {/* ─── 8. Pay Later & EMI ─── */}
          <Route path="/pay-later" element={<PayLaterPage />} />
          <Route path="/pay-later.html" element={<Navigate to="/pay-later" replace />} />
          <Route path="/patients/pay-later" element={<Navigate to="/pay-later" replace />} />
          <Route path="/patients/pay-later.html" element={<Navigate to="/pay-later" replace />} />
          {/* Legacy billing redirects directly to pay-later */}
          <Route path="/patients/insurances.html" element={<Navigate to="/pay-later" replace />} />
          <Route path="/patients/insurances" element={<Navigate to="/pay-later" replace />} />
          <Route path="/insurances.html" element={<Navigate to="/pay-later" replace />} />
          <Route path="/insurances" element={<Navigate to="/pay-later" replace />} />

          {/* ─── 9. Contact & Book Appointment ─── */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
          <Route path="/contact/contact-us" element={<Navigate to="/contact" replace />} />
          <Route path="/contact/contact-us.html" element={<Navigate to="/contact" replace />} />

          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/book-appointment.html" element={<Navigate to="/book-appointment" replace />} />
          <Route path="/contact/book-appointment" element={<Navigate to="/book-appointment" replace />} />
          <Route path="/contact/book-appointment.html" element={<Navigate to="/book-appointment" replace />} />

          {/* ─── 10. Dev-only tools ─── */}
          <Route path="/styleguide" element={<StyleguidePage />} />
          <Route path="/content-check" element={<ContentCheckPage />} />

          {/* ─── 11. 404 Catch-All & Legacy 404.html ─── */}
          <Route path="/404.html" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};
