import React, { useState, useMemo } from 'react';
import { Clock, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { getEnabledServices } from '@/data/services';
import { Button } from '@/components/common/Button';
import { FormPrivacyNote } from './FormPrivacyNote';
import { ReviewAndSendDialog } from './ReviewAndSendDialog';
import {
  submitForm,
  validateName,
  validateIndianMobile,
  validateEmail,
  sanitizeText,
  ReviewActionData,
} from '@/lib/submitForm';
import { AppointmentProgressTeeth } from '@/components/motion/AppointmentProgressTeeth';

// Hourly slot chips from 10:00 AM to 8:00 PM
const TIME_SLOTS = [
  { label: '10:00 AM', hour24: 10 },
  { label: '11:00 AM', hour24: 11 },
  { label: '12:00 PM', hour24: 12 },
  { label: '1:00 PM',  hour24: 13 },
  { label: '2:00 PM',  hour24: 14 },
  { label: '3:00 PM',  hour24: 15 },
  { label: '4:00 PM',  hour24: 16 },
  { label: '5:00 PM',  hour24: 17 },
  { label: '6:00 PM',  hour24: 18 },
  { label: '7:00 PM',  hour24: 19 },
  { label: '8:00 PM',  hour24: 20 },
];

export const AppointmentForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [selectedService, setSelectedService] = useState<string>('Laser Dentistry');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('No preference');
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [botField, setBotField] = useState(''); // honeypot

  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; time?: string }>({});

  // Submission state & Dialog
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState<ReviewActionData | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [endpointSuccess, setEndpointSuccess] = useState<string | null>(null);

  // Enabled services (Laser Dentistry, Implantology, Periodontics first)
  const enabledServices = useMemo(() => getEnabledServices(), []);

  // Doctors list strictly matching CLIENT FACTS
  const doctorsList = [
    { name: 'No preference', role: 'First available clinic doctor' },
    { name: 'Dr Himanshi Sharma', role: 'Periodontist and Implantologist (BDS, MDS)' },
    { name: 'Dr Shailesh Sharma', role: 'Certified Laser Dentist and Implantologist' },
  ];

  // Generate 14 upcoming days
  const days = useMemo(() => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const isToday = i === 0;
      return {
        idx: i,
        dayName: isToday ? 'Today' : dayNames[d.getDay()],
        dayNumber: d.getDate(),
        monthName: monthNames[d.getMonth()],
        dateStr: `${d.getDate()} ${monthNames[d.getMonth()]}, ${dayNames[d.getDay()]}`,
        isToday,
      };
    });
  }, []);

  const selectedDay = days[selectedDayIdx] || days[0];

  // Current hour in Asia/Kolkata (IST) to disable past slots for today
  const currentIstHour = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        hour12: false,
      }).formatToParts(new Date());
      const hourPart = parts.find((p) => p.type === 'hour')?.value;
      return hourPart ? parseInt(hourPart, 10) : new Date().getHours();
    } catch {
      return new Date().getHours();
    }
  }, []);

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrors: typeof errors = {};

    if (step === 2 && !selectedTime) {
      newErrors.time = 'Please select a preferred appointment time.';
    }

    if (step === 3) {
      const nameRes = validateName(fullName);
      if (!nameRes.isValid) newErrors.name = nameRes.error;

      const phoneRes = validateIndianMobile(phone);
      if (!phoneRes.isValid) newErrors.phone = phoneRes.error;

      if (email.trim()) {
        const emailRes = validateEmail(email);
        if (!emailRes.isValid) newErrors.email = emailRes.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      formType: 'appointment' as const,
      name: sanitizeText(fullName),
      phone: sanitizeText(phone),
      email: email ? sanitizeText(email) : undefined,
      service: selectedService,
      doctor: selectedDoctor,
      preferredDate: selectedDay.dateStr,
      preferredTime: selectedTime,
      notes: notes ? sanitizeText(notes) : undefined,
      botField,
    };

    try {
      const result = await submitForm(payload);

      if (result.mode === 'endpoint' && result.success) {
        setEndpointSuccess(result.message || 'Appointment requested successfully.');
      } else if (result.mode === 'review' && result.reviewData) {
        setReviewData(result.reviewData);
        setDialogOpen(true);
      } else {
        // Offline or server failure: open review dialog with fallback
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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Wizard Form Area (Left 8 cols) */}
        <div className="lg:col-span-8 bg-pearl rounded-3xl p-6 sm:p-10 shadow-card-elevated border border-ink/10 font-sans">
          {/* Progress Tracker (4 Steps) */}
          <div className="mb-8" aria-label="Booking steps progress">
            <AppointmentProgressTeeth
              currentStep={currentStep}
              totalSteps={4}
              isCompleted={Boolean(endpointSuccess)}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-muted border-t border-linen pt-3">
              <span className="text-pomegranate">Step {Math.min(currentStep + 1, 4)} of 4</span>
              <span>
                {['Select Dental Service', 'Choose Doctor', 'Pick Day & Time', 'Your Contact Details'][currentStep]}
              </span>
            </div>
          </div>

          {endpointSuccess ? (
            /* Verified Endpoint Success Banner */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-clove">
                Appointment Request Received
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                {endpointSuccess}
              </p>
              <div className="pt-4">
                <Button to="/" variant="primary">
                  Return to Homepage
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Hidden Honeypot Field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="hp-appointment">Leave blank</label>
                <input
                  id="hp-appointment"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </div>

              {/* ──────────────── STEP 1: SERVICE SELECTION ──────────────── */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                      What dental care do you need?
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1">
                      Choose a specialty below. Walk-ins and routine exams are always welcome.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Dental services">
                    {enabledServices.map((service) => {
                      const isSelected = selectedService === service.name;
                      return (
                        <button
                          key={service.slug}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedService(service.name)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between group ${
                            isSelected
                              ? 'border-pomegranate bg-rosewater/40 shadow-sm ring-2 ring-pomegranate/20'
                              : 'border-ink/15 hover:border-pomegranate/40 bg-enamel/30'
                          }`}
                        >
                          <div className="pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-serif text-base sm:text-lg font-bold text-clove">
                                {service.name}
                              </span>
                              {service.flagship && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pomegranate text-pearl uppercase tracking-wider font-semibold">
                                  Flagship
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-muted block line-clamp-1 mt-0.5">
                              {service.short}
                            </span>
                          </div>
                          <span
                            className={`w-4 h-4 rounded-full border mt-1 flex-shrink-0 flex items-center justify-center ${
                              isSelected ? 'border-pomegranate bg-pomegranate' : 'border-ink/30 bg-pearl'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-pearl" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleNext} variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      Continue to Doctor Choice
                    </Button>
                  </div>
                </div>
              )}

              {/* ──────────────── STEP 2: DOCTOR SELECTION ──────────────── */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                      Do you have a preferred doctor?
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1">
                      Both specialists consult daily at our Haridwar clinic.
                    </p>
                  </div>

                  <div className="space-y-3" role="radiogroup" aria-label="Doctor preference">
                    {doctorsList.map((doc) => {
                      const isSelected = selectedDoctor === doc.name;
                      return (
                        <button
                          key={doc.name}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedDoctor(doc.name)}
                          className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                            isSelected
                              ? 'border-pomegranate bg-rosewater/40 shadow-sm ring-2 ring-pomegranate/20'
                              : 'border-ink/15 hover:border-pomegranate/40 bg-enamel/30'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isSelected ? 'bg-pomegranate text-pearl' : 'bg-linen text-clove'
                              }`}
                            >
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="font-serif text-lg font-bold text-clove block">
                                {doc.name}
                              </span>
                              <span className="text-xs text-muted block mt-0.5">
                                {doc.role}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                              isSelected ? 'border-pomegranate bg-pomegranate' : 'border-ink/30 bg-pearl'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-pearl" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Button onClick={handleBack} variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                      Back
                    </Button>
                    <Button onClick={handleNext} variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      Continue to Date & Time
                    </Button>
                  </div>
                </div>
              )}

              {/* ──────────────── STEP 3: DAY & HOURLY SLOTS ──────────────── */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                      Select preferred date & time
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1">
                      Clinic hours: 10:00 AM to 9:00 PM daily. Past hours for today are disabled.
                    </p>
                  </div>

                  {/* Day Chips for next 14 days */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-2">
                      1. Preferred Day (Next 14 Days)
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {days.map((day) => {
                        const isSelected = selectedDayIdx === day.idx;
                        return (
                          <button
                            key={day.idx}
                            type="button"
                            onClick={() => {
                              setSelectedDayIdx(day.idx);
                              // Clear selected time if it's now invalid for today
                              setSelectedTime('');
                            }}
                            className={`min-w-[76px] p-3 rounded-2xl border text-center transition-all flex-shrink-0 ${
                              isSelected
                                ? 'border-pomegranate bg-pomegranate text-pearl shadow-sm'
                                : 'border-ink/15 hover:border-pomegranate/50 bg-enamel/40 text-ink'
                            }`}
                          >
                            <span className="text-[11px] font-sans font-semibold uppercase block opacity-80">
                              {day.dayName}
                            </span>
                            <span className="font-serif text-2xl font-bold block my-0.5">
                              {day.dayNumber}
                            </span>
                            <span className="text-[10px] font-mono block opacity-80">
                              {day.monthName}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hourly Slot Chips (10 AM to 8 PM) */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-ink mb-2">
                      2. Preferred Hourly Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((slot) => {
                        // If selected day is today, disable past hour slots
                        const isPastToday = selectedDay.isToday && slot.hour24 <= currentIstHour;
                        const isSelected = selectedTime === slot.label;

                        return (
                          <button
                            key={slot.label}
                            type="button"
                            disabled={isPastToday}
                            onClick={() => {
                              setSelectedTime(slot.label);
                              setErrors((prev) => ({ ...prev, time: undefined }));
                            }}
                            className={`p-3 rounded-xl border text-xs sm:text-sm font-sans font-semibold transition-all ${
                              isPastToday
                                ? 'border-ink/10 bg-linen/50 text-muted/40 cursor-not-allowed line-through'
                                : isSelected
                                ? 'border-pomegranate bg-rosewater text-pomegranate font-bold ring-2 ring-pomegranate/20'
                                : 'border-ink/15 hover:border-pomegranate/40 bg-enamel/30 text-ink'
                            }`}
                          >
                            {slot.label}
                          </button>
                        );
                      })}
                    </div>

                    {errors.time && (
                      <p className="text-xs text-rose-600 mt-2 font-semibold">
                        {errors.time}
                      </p>
                    )}

                    {/* Preference Note */}
                    <p className="text-xs text-muted font-sans mt-3 italic">
                      Times are preferences. We will confirm by phone.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Button onClick={handleBack} variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                      Back
                    </Button>
                    <Button onClick={handleNext} variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      Continue to Details
                    </Button>
                  </div>
                </div>
              )}

              {/* ──────────────── STEP 4: CONTACT DETAILS ──────────────── */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                      Who is this visit for?
                    </h2>
                    <p className="text-xs sm:text-sm text-muted mt-1">
                      Enter contact information for appointment confirmation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="bk-name" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="bk-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/30 text-sm text-ink focus:border-pomegranate focus:outline-none"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="bk-phone" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                        Indian Mobile Number *
                      </label>
                      <input
                        id="bk-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="+91 96433 65651"
                        className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/30 text-sm text-ink focus:border-pomegranate focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Optional Email */}
                  <div>
                    <label htmlFor="bk-email" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      id="bk-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/30 text-sm text-ink focus:border-pomegranate focus:outline-none"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 font-semibold">{errors.email}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="bk-notes" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Dental Concern / Notes (Optional)
                    </label>
                    <textarea
                      id="bk-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Briefly describe what you'd like to address..."
                      className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/30 text-sm text-ink focus:border-pomegranate focus:outline-none"
                    />
                  </div>

                  {/* Shared Privacy Note */}
                  <FormPrivacyNote />

                  <div className="pt-4 flex items-center justify-between">
                    <Button onClick={handleBack} variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Preparing Details...' : 'Review & Confirm Request'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Live Summary Side Panel (Right 4 cols) */}
        <div className="lg:col-span-4 bg-clove text-enamel rounded-3xl p-6 sm:p-7 shadow-card-elevated border border-brass/25 space-y-5 sticky top-28 font-sans">
          <div>
            <span className="text-xs font-mono font-bold text-brass uppercase tracking-wider block">
              Live Overview
            </span>
            <h3 className="font-serif text-2xl font-bold text-enamel mt-0.5">
              Visit Details
            </h3>
          </div>

          <div className="space-y-3.5 text-sm border-t border-enamel/15 pt-4">
            <div>
              <span className="text-xs text-brass block">Treatment / Service</span>
              <span className="font-semibold text-enamel block mt-0.5">
                {selectedService || 'Not selected'}
              </span>
            </div>

            <div>
              <span className="text-xs text-brass block">Doctor</span>
              <span className="font-semibold text-enamel block mt-0.5">
                {selectedDoctor}
              </span>
            </div>

            <div>
              <span className="text-xs text-brass block">Preferred Time</span>
              <span className="font-semibold text-enamel block mt-0.5">
                {selectedDay.dateStr}
                {selectedTime ? ` at ${selectedTime}` : ' (Time pending)'}
              </span>
            </div>

            <div>
              <span className="text-xs text-brass block">Clinic Location</span>
              <span className="font-medium text-enamel/80 block mt-0.5 text-xs">
                {CLINIC.address.full}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-enamel/15 text-xs text-enamel/75 space-y-2">
            <div className="flex items-center gap-2 text-brass">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>Open daily: 10:00 AM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

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
