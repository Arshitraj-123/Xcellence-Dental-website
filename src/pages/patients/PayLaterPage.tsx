import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, MessageSquare, Check } from 'lucide-react';
import { CLINIC } from '../../data/clinic';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { CostEstimator } from '../../components/forms/CostEstimator';
import { FormPrivacyNote } from '../../components/forms/FormPrivacyNote';
import { ReviewAndSendDialog } from '../../components/forms/ReviewAndSendDialog';
import {
  submitForm,
  validateName,
  validateIndianMobile,
  validateEmail,
  sanitizeText,
  ReviewActionData,
} from '../../lib/submitForm';

export const PayLaterPage: React.FC = () => {
  const [askName, setAskName] = useState('');
  const [askPhone, setAskPhone] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askNotes, setAskNotes] = useState('');
  const [botField, setBotField] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dialog & Submission state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewActionData | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [endpointSuccess, setEndpointSuccess] = useState<string | null>(null);

  // Current estimate state for tracking
  const [estimateData, setEstimateData] = useState({
    treatmentCost: 35000,
    downPaymentAmount: 3500,
    months: 6,
    monthlyPayment: 5250,
  });

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const nameCheck = validateName(askName);
    if (!nameCheck.isValid) newErrors.name = nameCheck.error;

    const phoneCheck = validateIndianMobile(askPhone);
    if (!phoneCheck.isValid) newErrors.phone = phoneCheck.error;

    if (askEmail.trim()) {
      const emailCheck = validateEmail(askEmail);
      if (!emailCheck.isValid) newErrors.email = emailCheck.error;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      formType: 'emi' as const,
      name: sanitizeText(askName),
      phone: sanitizeText(askPhone),
      email: askEmail ? sanitizeText(askEmail) : undefined,
      treatmentCost: estimateData.treatmentCost,
      downPayment: Math.round((estimateData.downPaymentAmount / estimateData.treatmentCost) * 100),
      months: estimateData.months,
      monthlyEstimate: estimateData.monthlyPayment,
      notes: askNotes ? sanitizeText(askNotes) : undefined,
      botField,
    };

    try {
      const result = await submitForm(payload);
      if (result.mode === 'endpoint' && result.success) {
        setEndpointSuccess(result.message || 'Payment inquiry submitted successfully.');
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

  const faqs = [
    {
      q: 'How does payment planning work at Xcellence Dental Clinic?',
      a: 'We evaluate your clinical treatment plan and divide the balance into manageable monthly installments over 3, 6, 9, or 12 months, with terms finalized in person at our Haridwar office.',
    },
    {
      q: 'Is there a minimum treatment amount for monthly payment plans?',
      a: 'Payment plans are typically arranged for treatments such as dental implants, full smile makeovers, multiple crowns, and comprehensive periodontal therapy starting from ₹10,000.',
    },
    {
      q: 'Are interest or hidden processing fees added?',
      a: 'Our monthly estimate carries no interest or surprise charges. All terms are presented with upfront clarity before treatment begins.',
    },
    {
      q: 'Which payment methods do you accept at the clinic desk?',
      a: 'We accept UPI, bank transfers, post-dated cheques, and all major debit/credit cards at our Haridwar clinic desk.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Payment and EMI Enquiry | {CLINIC.name}</title>
        <meta
          name="description"
          content="Flexible payment plans and interest-free EMI estimates in Haridwar at Xcellence Dental Clinic. Receive care now, pay over time."
        />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-clove text-enamel py-16 sm:py-24 overflow-hidden border-b border-brass/25">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <img
            src="/images/clinic-wide.jpg"
            alt="Payment plans banner"
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
            <span className="text-brass font-medium">Payment & EMI</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="brass" size="md">
              Flexible Dental Financing
            </Badge>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-enamel leading-tight">
              Payment and EMI enquiry
            </h1>

            <p className="text-base sm:text-xl font-sans text-enamel/80 leading-relaxed">
              Transparent clinical estimates with flexible monthly installment options. Receive necessary dental care now and pay over time with zero hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* Estimator Overlapping Hero */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <CostEstimator
          onEstimateChange={(d) => {
            setEstimateData({
              treatmentCost: d.treatmentCost,
              downPaymentAmount: d.downPaymentAmount,
              months: d.months,
              monthlyPayment: d.monthlyPayment,
            });
          }}
        />
      </section>

      {/* 4 Steps Section */}
      <section className="py-16 sm:py-24 bg-linen/50 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-pomegranate block">
              Clear & Simple
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-clove mt-1">
              How payment planning works
            </h2>
            <p className="text-sm font-sans text-muted mt-2">
              Four straightforward steps, with zero hidden clauses or surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft font-sans">
              <div className="w-12 h-12 rounded-full bg-pomegranate text-pearl font-serif text-xl font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-serif text-xl font-bold text-clove mb-1.5">
                Clinical Exam
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Your doctor explains the necessary treatment and provides an exact clinical estimate.
              </p>
            </div>

            <div className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft font-sans">
              <div className="w-12 h-12 rounded-full bg-pomegranate text-pearl font-serif text-xl font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-serif text-xl font-bold text-clove mb-1.5">
                Choose Duration
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Select a comfortable 3, 6, 9, or 12 month installment schedule tailored to your budget.
              </p>
            </div>

            <div className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft font-sans">
              <div className="w-12 h-12 rounded-full bg-pomegranate text-pearl font-serif text-xl font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-serif text-xl font-bold text-clove mb-1.5">
                Confirm Terms
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Final terms and initial deposit are confirmed directly at our Haridwar clinic desk.
              </p>
            </div>

            <div className="bg-pearl rounded-2xl p-6 border border-ink/10 shadow-soft font-sans">
              <div className="w-12 h-12 rounded-full bg-pomegranate text-pearl font-serif text-xl font-bold flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="font-serif text-xl font-bold text-clove mb-1.5">
                Begin Treatment
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Receive the care you need immediately, without delaying oral wellness for financial reasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & FAQs Split */}
      <section className="py-20 bg-linen/60 border-t border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Inquiry Form (6 cols) */}
            <div className="lg:col-span-6 bg-pearl rounded-3xl p-6 sm:p-9 border border-ink/10 shadow-card-elevated font-sans space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pomegranate block">
                  Quick Inquiry
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove mt-1">
                  Ask about a custom payment plan
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  Leave your details and connect directly with our clinic desk to explore installment terms.
                </p>
              </div>

              {endpointSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-clove">Inquiry Received</h3>
                  <p className="text-sm text-muted">{endpointSuccess}</p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-4">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="emi-hp">Leave blank</label>
                    <input
                      id="emi-hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="inq-name" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Your Name *
                    </label>
                    <input
                      id="inq-name"
                      type="text"
                      required
                      value={askName}
                      onChange={(e) => {
                        setAskName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="e.g. Vikas Gupta"
                      className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-enamel/30 text-sm focus:border-pomegranate focus:outline-none"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inq-phone" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Indian Mobile Number *
                      </label>
                      <input
                        id="inq-phone"
                        type="tel"
                        required
                        value={askPhone}
                        onChange={(e) => {
                          setAskPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="+91 96433 65651"
                        className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-enamel/30 text-sm focus:border-pomegranate focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="inq-email" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Email (Optional)
                      </label>
                      <input
                        id="inq-email"
                        type="email"
                        value={askEmail}
                        onChange={(e) => {
                          setAskEmail(e.target.value);
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-enamel/30 text-sm focus:border-pomegranate focus:outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inq-notes" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Treatment You Are Considering (Optional)
                    </label>
                    <textarea
                      id="inq-notes"
                      rows={2}
                      value={askNotes}
                      onChange={(e) => setAskNotes(e.target.value)}
                      placeholder="e.g. Dental implants, multiple crowns, full smile makeover..."
                      className="w-full px-4 py-3 rounded-xl border border-ink/15 bg-enamel/30 text-sm focus:border-pomegranate focus:outline-none"
                    />
                  </div>

                  {/* Shared Privacy Note */}
                  <FormPrivacyNote />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Formatting Details...' : 'Send Enquiry (Review & Send)'}
                  </Button>
                </form>
              )}
            </div>

            {/* FAQs Accordion (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-pomegranate block">
                Common Questions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                Payment Planning FAQs
              </h2>

              <div className="space-y-3 font-sans pt-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-pearl rounded-2xl border border-ink/10 overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif text-lg font-bold text-clove"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-muted transition-transform flex-shrink-0 ${
                            isOpen ? 'rotate-180 text-pomegranate' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted leading-relaxed border-t border-ink/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-clove text-enamel text-center border-t border-brass/25">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-enamel">
            Ready to discuss your treatment options?
          </h2>
          <p className="text-sm sm:text-base font-sans text-enamel/80 max-w-lg mx-auto">
            Book a clinical consultation and our team will outline all clinical and payment options clearly.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button to="/book-appointment" variant="secondary" size="md">
              Book a Visit
            </Button>
            <Button href={CLINIC.phoneTel} variant="ghost" size="md">
              Call {CLINIC.phone.display}
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
