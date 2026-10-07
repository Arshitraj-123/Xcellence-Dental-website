import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, MessageSquare, Copy, Check } from 'lucide-react';
import { CLINIC } from '../../data/clinic';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { OpenStatusBadge } from '../../components/common/OpenStatusBadge';
import { useToast } from '../../components/common/Toast';
import { getClinicTimingStatus } from '../../utils/clinicTiming';
import { FormPrivacyNote } from '../../components/forms/FormPrivacyNote';
import { ReviewAndSendDialog } from '../../components/forms/ReviewAndSendDialog';
import { EnamelShine } from '@/components/motion';
import {
  submitForm,
  validateName,
  validateIndianMobile,
  validateEmail,
  sanitizeText,
  ReviewActionData,
} from '../../lib/submitForm';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('General check-up');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Review dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewActionData | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [endpointSuccess, setEndpointSuccess] = useState<string | null>(null);

  const { showToast } = useToast();
  const timingStatus = getClinicTimingStatus();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const nameCheck = validateName(name);
    if (!nameCheck.isValid) newErrors.name = nameCheck.error;

    const phoneCheck = validateIndianMobile(phone);
    if (!phoneCheck.isValid) newErrors.phone = phoneCheck.error;

    if (email.trim()) {
      const emailCheck = validateEmail(email);
      if (!emailCheck.isValid) newErrors.email = emailCheck.error;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      formType: 'contact' as const,
      name: sanitizeText(name),
      phone: sanitizeText(phone),
      email: email ? sanitizeText(email) : undefined,
      reason,
      notes: message ? sanitizeText(message) : undefined,
      botField,
    };

    try {
      const result = await submitForm(payload);
      if (result.mode === 'endpoint' && result.success) {
        setEndpointSuccess(result.message || 'Message submitted successfully.');
      } else if (result.mode === 'review' && result.reviewData) {
        setReviewData(result.reviewData);
        setDialogOpen(true);
      } else {
        setSubmissionError(result.error || 'Server connection failed.');
        setIsOffline(Boolean(result.isOffline));
        if (result.reviewData) {
          setReviewData(result.reviewData);
        }
        setDialogOpen(true);
      }
    } catch {
      setSubmissionError('An unexpected error occurred. Please contact us directly.');
      setDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CLINIC.email).then(
      () => {
        setIsCopied(true);
        showToast('Email address copied to clipboard.');
        setTimeout(() => setIsCopied(false), 2500);
      },
      () => {
        showToast('Unable to copy automatically. Please copy manually.');
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | {CLINIC.name} Haridwar</title>
        <meta
          name="description"
          content="Contact Xcellence Dental Clinic in Haridwar, Uttarakhand. Old Ranipur More, Opp. Reliance Trendz. Phone: +91 96433 65651. Open daily 10 AM to 9 PM."
        />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-clove text-enamel py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/images/hero-family.webp"
            alt="Contact us banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-clove via-clove/90 to-clove/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-sm text-enamel/70 mb-4">
            <Link to="/" className="hover:text-brass transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brass font-medium">Contact Us</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              We Are Here to Help
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              We'd love to <EnamelShine highlightColor="text-brass italic font-normal">hear from you</EnamelShine>
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Book a visit, consult with our dental doctors, or simply ask a question. Our clinic is open seven days a week in Haridwar.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards Overlapping Hero */}
      <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={CLINIC.phoneTel}
            className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft hover:border-pomegranate/50 transition-all flex items-center gap-4 text-ink group"
          >
            <div className="w-12 h-12 rounded-xl bg-rosewater text-pomegranate flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-sans text-muted block">Call or WhatsApp</span>
              <span className="font-serif text-xl font-bold text-clove block mt-0.5">
                {CLINIC.phone.display}
              </span>
            </div>
          </a>

          <a
            href={CLINIC.address.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft hover:border-pomegranate/50 transition-all flex items-center gap-4 text-ink group"
          >
            <div className="w-12 h-12 rounded-xl bg-brass/20 text-brass-deep flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-sans text-muted block">Visit Clinic</span>
              <span className="font-serif text-xl font-bold text-clove block mt-0.5">
                Old Ranipur More, Haridwar
              </span>
            </div>
          </a>

          <a
            href={CLINIC.emailMailto}
            className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft hover:border-pomegranate/50 transition-all flex items-center gap-4 text-ink group"
          >
            <div className="w-12 h-12 rounded-xl bg-linen text-clove flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-sans text-muted block">Email Clinic</span>
              <span className="font-sans text-sm font-bold text-clove block mt-0.5 truncate">
                {CLINIC.email}
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Main Form and Clinic Hours Section */}
      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Inquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-pearl rounded-3xl p-6 sm:p-10 border border-ink/10 shadow-card-elevated font-sans space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pomegranate block">
                  Get In Touch
                </span>
                <h2 className="font-serif text-3xl font-bold text-clove mt-1">
                  Send a Direct Message
                </h2>
                <p className="text-sm text-muted mt-1">
                  Tell us what you need and connect immediately with our team on WhatsApp.
                </p>
              </div>

              {endpointSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-clove">Message Received</h3>
                  <p className="text-sm text-muted">{endpointSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="ct-hp">Leave blank</label>
                    <input
                      id="ct-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ct-name" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="ct-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Ananya Verma"
                        className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 text-sm text-ink focus:border-pomegranate focus:outline-none"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ct-phone" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Indian Mobile Phone *
                      </label>
                      <input
                        id="ct-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="+91 96433 65651"
                        className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 text-sm text-ink focus:border-pomegranate focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ct-email" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        id="ct-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 text-sm text-ink focus:border-pomegranate focus:outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ct-reason" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Reason for Contact
                      </label>
                      <select
                        id="ct-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 text-sm text-ink focus:border-pomegranate focus:outline-none"
                      >
                        <option value="General check-up">General Check-up & Cleaning</option>
                        <option value="Laser dentistry">Laser Dentistry (Painless)</option>
                        <option value="Dental implants">Dental Implants (Implantology)</option>
                        <option value="Periodontics">Periodontics (Gum Treatment)</option>
                        <option value="Emergency visit">Emergency Dental Visit</option>
                        <option value="Cosmetic consultation">Cosmetic Consultation</option>
                        <option value="Other inquiry">Other Dental Concern</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ct-msg" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      How can we help? (Optional)
                    </label>
                    <textarea
                      id="ct-msg"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your dental needs or preferred days..."
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 text-sm text-ink focus:border-pomegranate focus:outline-none"
                    />
                  </div>

                  {/* Shared Privacy Note */}
                  <FormPrivacyNote />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    size="md"
                    disabled={isSubmitting}
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Formatting Request...' : 'Send Inquiry (Review & Send)'}
                  </Button>
                </form>
              )}

              <div className="pt-2 text-center">
                <span className="text-xs text-muted block">
                  Need an exact time slot right now?
                </span>
                <Link
                  to="/contact/book-appointment"
                  className="text-xs font-bold text-pomegranate hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Open Appointment Booking Wizard</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Clinic Details & Hours Table (5 cols) */}
            <div className="lg:col-span-5 space-y-6 font-sans">
              <div className="bg-pearl rounded-3xl p-6 sm:p-8 border border-ink/10 shadow-soft space-y-5">
                <div>
                  <OpenStatusBadge />
                  <h3 className="font-serif text-2xl font-bold text-clove mt-3">
                    Clinic Information
                  </h3>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-ink border-t border-ink/10 pt-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-muted">Address:</span>
                    <span className="font-semibold text-right max-w-[240px]">
                      {CLINIC.address.full}
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <span className="text-muted">Phone:</span>
                    <a href={CLINIC.phoneTel} className="font-semibold text-pomegranate">
                      {CLINIC.phone.display}
                    </a>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <span className="text-muted">Email:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs">{CLINIC.email}</span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="p-1 rounded text-pomegranate hover:bg-rosewater/50"
                        title="Copy email address"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-pomegranate" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <span className="text-muted">Parking:</span>
                    <span className="font-semibold text-ink">Free Clinic Parking Available</span>
                  </div>
                </div>

                {/* Hours Table */}
                <div className="border-t border-ink/10 pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                    Hours of Operation
                  </span>
                  <table className="w-full text-xs">
                    <tbody>
                      {CLINIC.timing.daysList.map((day) => {
                        const isToday = day.toLowerCase() === timingStatus.currentDayName.toLowerCase();
                        return (
                          <tr
                            key={day}
                            className={`border-b border-ink/5 last:border-0 ${
                              isToday ? 'bg-rosewater/50 font-bold text-pomegranate' : 'text-muted'
                            }`}
                          >
                            <td className="py-1.5 px-2">
                              {day} {isToday && '(Today)'}
                            </td>
                            <td className="py-1.5 px-2 text-right">
                              {CLINIC.timing.displayHours}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-pearl rounded-3xl overflow-hidden border border-ink/10 shadow-card-elevated">
            <div className="h-[440px] w-full bg-linen relative">
              <iframe
                title="Xcellence Dental Clinic Haridwar Location Map"
                src={CLINIC.address.googleMapsEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6 bg-pearl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans border-t border-ink/10">
              <div>
                <span className="font-serif text-xl font-bold text-clove block">
                  {CLINIC.name}
                </span>
                <span className="text-xs text-muted block mt-0.5">
                  {CLINIC.address.full}
                </span>
              </div>
              <Button
                href={CLINIC.address.googleMapsDirectionsUrl}
                target="_blank"
                variant="primary"
                size="sm"
                icon={<MapPin className="w-4 h-4" />}
              >
                Get Driving Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Urgent Banner */}
      <section className="py-16 bg-pomegranate text-pearl text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pearl">
            Experiencing Severe Dental Pain?
          </h2>
          <p className="text-sm font-sans text-pearl/90 max-w-lg mx-auto">
            Do not hesitate. Call us directly or walk into our clinic for priority emergency relief.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href={CLINIC.phoneTel} variant="secondary" size="md" icon={<Phone className="w-4 h-4" />}>
              Call +91 96433 65651 Now
            </Button>
          </div>
        </div>
      </section>

      {/* Honest Review & Send Dialog */}
      <ReviewAndSendDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        data={reviewData}
        errorMessage={submissionError}
        isOffline={isOffline}
      />
    </>
  );
};

