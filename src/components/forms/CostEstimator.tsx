import React, { useState } from 'react';
import { Phone, Calculator, Info } from 'lucide-react';
import { CLINIC } from '@/data/clinic';
import { formatRupees } from '@/lib/format';
import { Button } from '@/components/common/Button';

interface CostEstimatorProps {
  onEstimateChange?: (data: {
    treatmentCost: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    months: number;
    monthlyPayment: number;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onEstimateChange }) => {
  const [treatmentCost, setTreatmentCost] = useState(35000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(10);
  const [months, setMonths] = useState(6);

  // 3 / 6 / 9 / 12 months only
  const availableMonths = [3, 6, 9, 12];

  const downPaymentAmount = Math.round((treatmentCost * downPaymentPercent) / 100);
  const remainingBalance = treatmentCost - downPaymentAmount;
  const monthlyPayment = Math.round(remainingBalance / months);

  const updateCost = (val: number) => {
    setTreatmentCost(val);
    onEstimateChange?.({
      treatmentCost: val,
      downPaymentPercent,
      downPaymentAmount: Math.round((val * downPaymentPercent) / 100),
      months,
      monthlyPayment: Math.round((val - Math.round((val * downPaymentPercent) / 100)) / months),
    });
  };

  const updateDownPayment = (val: number) => {
    setDownPaymentPercent(val);
    const dp = Math.round((treatmentCost * val) / 100);
    onEstimateChange?.({
      treatmentCost,
      downPaymentPercent: val,
      downPaymentAmount: dp,
      months,
      monthlyPayment: Math.round((treatmentCost - dp) / months),
    });
  };

  const updateMonths = (m: number) => {
    setMonths(m);
    onEstimateChange?.({
      treatmentCost,
      downPaymentPercent,
      downPaymentAmount,
      months: m,
      monthlyPayment: Math.round(remainingBalance / m),
    });
  };

  return (
    <div className="bg-pearl rounded-3xl p-6 sm:p-10 shadow-card-elevated border border-ink/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Area (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-brass-deep font-sans font-bold text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Interactive Financing Calculator</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-clove">
              Estimate Your Monthly Plan
            </h2>
            <p className="text-sm font-sans text-muted mt-1">
              Adjust the sliders to see how your treatment cost can be comfortably spread across manageable installments.
            </p>
          </div>

          {/* Slider 1: Treatment Cost (₹5,000 to ₹3,00,000) */}
          <div className="space-y-2 font-sans">
            <div className="flex justify-between items-baseline">
              <label htmlFor="est-cost" className="text-xs font-bold uppercase tracking-wider text-ink">
                Estimated Treatment Cost
              </label>
              <span className="font-serif text-xl sm:text-2xl font-bold text-pomegranate">
                {formatRupees(treatmentCost)}
              </span>
            </div>
            <input
              id="est-cost"
              type="range"
              min={5000}
              max={300000}
              step={2500}
              value={treatmentCost}
              onChange={(e) => updateCost(Number(e.target.value))}
              className="w-full h-2 bg-linen rounded-lg appearance-none cursor-pointer accent-pomegranate"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>₹5,000</span>
              <span>₹1,50,000</span>
              <span>₹3,00,000</span>
            </div>
          </div>

          {/* Slider 2: Down Payment (0 to 50%) */}
          <div className="space-y-2 font-sans">
            <div className="flex justify-between items-baseline">
              <label htmlFor="est-dp" className="text-xs font-bold uppercase tracking-wider text-ink">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-semibold text-ink">
                {formatRupees(downPaymentAmount)}
              </span>
            </div>
            <input
              id="est-dp"
              type="range"
              min={0}
              max={50}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => updateDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-linen rounded-lg appearance-none cursor-pointer accent-brass-deep"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>0% (No initial deposit)</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Duration Selector (3, 6, 9, 12 months) */}
          <div className="space-y-2 font-sans">
            <label className="text-xs font-bold uppercase tracking-wider text-ink block">
              Repayment Duration
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {availableMonths.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => updateMonths(m)}
                  className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    months === m
                      ? 'border-pomegranate bg-pomegranate text-pearl shadow-sm'
                      : 'border-ink/15 hover:border-pomegranate/50 bg-enamel/30 text-ink'
                  }`}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card (Right 5 cols) */}
        <div className="lg:col-span-5 bg-clove text-enamel rounded-3xl p-6 sm:p-8 shadow-card-elevated border border-brass/25 text-center space-y-5 font-sans">
          <span className="text-xs font-bold uppercase tracking-wider text-brass block">
            Estimated Monthly Installment
          </span>

          <div className="my-2">
            <span className="font-serif text-4xl sm:text-5xl font-bold text-enamel block tracking-tight">
              {formatRupees(monthlyPayment)}
            </span>
            <span className="text-xs text-brass/80 font-medium block mt-1">
              for {months} consecutive months
            </span>
          </div>

          <div className="border-t border-enamel/15 pt-4 space-y-2.5 text-xs sm:text-sm text-left">
            <div className="flex justify-between">
              <span className="text-enamel/70">Treatment Total:</span>
              <span className="font-semibold text-enamel">{formatRupees(treatmentCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-enamel/70">Initial Deposit Today:</span>
              <span className="font-semibold text-brass">{formatRupees(downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between border-t border-enamel/10 pt-2 font-medium">
              <span className="text-enamel/70">Financed Balance:</span>
              <span className="font-semibold text-enamel">{formatRupees(remainingBalance)}</span>
            </div>
          </div>

          {/* Mandatory Clinic Estimate Note */}
          <div className="p-3 rounded-xl bg-pearl/10 border border-brass/25 text-xs text-enamel/80 flex items-start gap-2 text-left">
            <Info className="w-4 h-4 text-brass flex-shrink-0 mt-0.5" />
            <span>
              A simple estimate with no interest or fees. Final terms are confirmed by the clinic.
            </span>
          </div>

          <div className="pt-1">
            <Button
              href={CLINIC.phoneTel}
              variant="secondary"
              size="md"
              fullWidth
              icon={<Phone className="w-4 h-4" />}
            >
              Call to Setup a Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
