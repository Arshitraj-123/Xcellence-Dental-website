import React, { useState } from 'react';
import { Printer, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { CLINIC } from '../../data/clinic';
import { Button } from '../common/Button';

export const PatientRegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    medications: '',
    reasonForVisit: '',
  });

  const [conditions, setConditions] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const availableConditions = [
    'High Blood Pressure',
    'Heart Condition',
    'Diabetes',
    'Asthma / Breathing Difficulties',
    'Bleeding Disorder',
    'Taking Blood Thinners',
    'Joint Replacement',
    'Pregnant or Nursing',
    'Kidney / Liver Condition',
    'Other Medical Condition',
  ];

  const availableAllergies = [
    'Penicillin or Other Antibiotics',
    'Local Anesthetics',
    'Latex',
    'Pain Relievers / NSAIDs',
    'Other Allergy',
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const toggleCondition = (cond: string) => {
    setConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const toggleAllergy = (alg: string) => {
    setAllergies((prev) =>
      prev.includes(alg) ? prev.filter((a) => a !== alg) : [...prev, alg]
    );
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('Please enter your first and last name.');
        return;
      }
      if (!formData.phone.trim()) {
        setError('Please enter a contact phone number.');
        return;
      }
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="bg-pearl rounded-3xl p-6 sm:p-10 shadow-card-elevated border border-ink/10">
      {/* Steps Progress */}
      <div className="mb-8">
        <div className="flex gap-3 mb-2">
          {[0, 1, 2].map((stepIdx) => (
            <div
              key={stepIdx}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                currentStep >= stepIdx ? 'bg-pomegranate' : 'bg-linen'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-sans font-bold text-pomegranate uppercase tracking-wider">
          Step {currentStep + 1} of 3: {['Personal Information', 'Health History', 'Review & Print'][currentStep]}
        </span>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-rosewater/60 text-pomegranate text-xs font-sans font-semibold">
          {error}
        </div>
      )}

      {/* STEP 1: PERSONAL INFORMATION */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
              About You
            </h2>
            <p className="text-sm font-sans text-muted mt-1">
              Your confidential information stays on your device until you print or submit it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reg-fn" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                First Name *
              </label>
              <input
                id="reg-fn"
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleTextChange}
                placeholder="First name"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reg-ln" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Last Name *
              </label>
              <input
                id="reg-ln"
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleTextChange}
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reg-dob" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Date of Birth
              </label>
              <input
                id="reg-dob"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleTextChange}
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reg-ph" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Contact Phone *
              </label>
              <input
                id="reg-ph"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleTextChange}
                placeholder="+91 96433 65651"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reg-em" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Email Address
              </label>
              <input
                id="reg-em"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reg-addr" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Home Address
              </label>
              <input
                id="reg-addr"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleTextChange}
                placeholder="Residential address in Haridwar or surrounding area"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reg-ec" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Emergency Contact Name
              </label>
              <input
                id="reg-ec"
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleTextChange}
                placeholder="Spouse / Parent / Sibling name"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reg-ecp" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Emergency Contact Phone
              </label>
              <input
                id="reg-ecp"
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleTextChange}
                placeholder="Emergency phone number"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button onClick={handleNext} variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Continue to Health History
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: HEALTH HISTORY */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
              Health & Dental History
            </h2>
            <p className="text-sm font-sans text-muted mt-1">
              Select any conditions that apply. This helps our dentists treat you safely and comfortably.
            </p>
          </div>

          {/* Medical Conditions */}
          <div>
            <span className="text-xs font-sans font-bold text-ink uppercase tracking-wider block mb-2.5">
              Medical Conditions (Select all that apply)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableConditions.map((cond) => {
                const isChecked = conditions.includes(cond);
                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => toggleCondition(cond)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm font-sans transition-all ${
                      isChecked
                        ? 'border-pomegranate bg-rosewater/30 font-semibold text-ink'
                        : 'border-ink/15 hover:border-pomegranate/40 bg-enamel/20 text-muted'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 ${
                        isChecked
                          ? 'bg-pomegranate border-pomegranate text-pearl'
                          : 'border-ink/30 bg-pearl'
                      }`}
                    >
                      {isChecked && <span className="text-[10px]">✓</span>}
                    </span>
                    <span>{cond}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <span className="text-xs font-sans font-bold text-ink uppercase tracking-wider block mb-2.5">
              Allergies
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableAllergies.map((alg) => {
                const isChecked = allergies.includes(alg);
                return (
                  <button
                    key={alg}
                    type="button"
                    onClick={() => toggleAllergy(alg)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm font-sans transition-all ${
                      isChecked
                        ? 'border-pomegranate bg-rosewater/30 font-semibold text-ink'
                        : 'border-ink/15 hover:border-pomegranate/40 bg-enamel/20 text-muted'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 ${
                        isChecked
                          ? 'bg-pomegranate border-pomegranate text-pearl'
                          : 'border-ink/30 bg-pearl'
                      }`}
                    >
                      {isChecked && <span className="text-[10px]">✓</span>}
                    </span>
                    <span>{alg}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Medications & Chief Complaint */}
          <div className="space-y-4 pt-2">
            <div>
              <label htmlFor="reg-med" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Current Medications (If any)
              </label>
              <textarea
                id="reg-med"
                name="medications"
                rows={2}
                value={formData.medications}
                onChange={handleTextChange}
                placeholder="List any prescriptions, supplements, or blood thinners..."
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="reg-rsn" className="block text-xs font-sans font-bold uppercase tracking-wider text-ink mb-1.5">
                Main Reason for Visit / Current Concern
              </label>
              <input
                id="reg-rsn"
                type="text"
                name="reasonForVisit"
                value={formData.reasonForVisit}
                onChange={handleTextChange}
                placeholder="e.g. Toothache, routine cleaning, dental implant consultation"
                className="w-full px-4 py-3 rounded-xl border border-ink/20 bg-enamel/20 font-sans text-ink focus:border-pomegranate focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button onClick={handleBack} variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button onClick={handleNext} variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Review Summary & Print
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & PRINT */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
                Review Your Information
              </h2>
              <p className="text-sm font-sans text-muted mt-1">
                Print or save this form and bring it to your appointment.
              </p>
            </div>

            <Button
              onClick={() => window.print()}
              variant="secondary"
              icon={<Printer className="w-4 h-4" />}
            >
              Print / Save PDF
            </Button>
          </div>

          {/* Printable Document Container */}
          <div
            id="printable-patient-sheet"
            className="border-2 border-dashed border-ink/20 rounded-2xl p-6 sm:p-8 bg-enamel/40 space-y-6 text-sm font-sans text-ink"
          >
            {/* Header in printed document */}
            <div className="border-b border-ink/15 pb-4">
              <h3 className="font-serif text-2xl font-bold text-clove">
                {CLINIC.name} — Patient Registration
              </h3>
              <p className="text-xs text-muted mt-1">
                {CLINIC.address.full} · Phone: {CLINIC.phone.display}
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs sm:text-sm">
              <div>
                <dt className="text-muted font-normal">Patient Name:</dt>
                <dd className="font-bold text-ink">
                  {formData.firstName} {formData.lastName || '—'}
                </dd>
              </div>

              <div>
                <dt className="text-muted font-normal">Date of Birth:</dt>
                <dd className="font-bold text-ink">{formData.dateOfBirth || '—'}</dd>
              </div>

              <div>
                <dt className="text-muted font-normal">Phone:</dt>
                <dd className="font-bold text-ink">{formData.phone || '—'}</dd>
              </div>

              <div>
                <dt className="text-muted font-normal">Email:</dt>
                <dd className="font-bold text-ink">{formData.email || '—'}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted font-normal">Address:</dt>
                <dd className="font-bold text-ink">{formData.address || '—'}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted font-normal">Emergency Contact:</dt>
                <dd className="font-bold text-ink">
                  {formData.emergencyName ? `${formData.emergencyName} (${formData.emergencyPhone})` : '—'}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted font-normal">Reported Medical Conditions:</dt>
                <dd className="font-bold text-ink">
                  {conditions.length > 0 ? conditions.join(', ') : 'None reported'}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted font-normal">Allergies:</dt>
                <dd className="font-bold text-ink">
                  {allergies.length > 0 ? allergies.join(', ') : 'None reported'}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted font-normal">Medications:</dt>
                <dd className="font-bold text-ink">{formData.medications || 'None reported'}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-muted font-normal">Reason for Visit:</dt>
                <dd className="font-bold text-ink">{formData.reasonForVisit || '—'}</dd>
              </div>
            </dl>

            {/* Signature Area */}
            <div className="pt-8 border-t border-ink/20 grid grid-cols-2 gap-8 text-xs text-muted">
              <div>
                <div className="border-b border-ink/40 h-8" />
                <span className="block mt-1 font-medium">Patient / Guardian Signature</span>
              </div>
              <div>
                <div className="border-b border-ink/40 h-8" />
                <span className="block mt-1 font-medium">Date</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button onClick={handleBack} variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
              Back & Edit
            </Button>
            <Button
              onClick={() => window.print()}
              variant="primary"
              icon={<Printer className="w-4 h-4" />}
            >
              Print Form
            </Button>
          </div>
        </div>
      )}

      {/* Privacy note */}
      <div className="mt-8 pt-4 border-t border-ink/10 flex items-center gap-2.5 text-xs text-muted font-sans">
        <Shield className="w-4 h-4 text-brass-deep flex-shrink-0" />
        <span>
          Nothing you type here is sent or stored.
        </span>
      </div>
    </div>
  );
};
