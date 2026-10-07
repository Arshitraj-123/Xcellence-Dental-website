import React from 'react';
import { Shield } from 'lucide-react';

interface FormPrivacyNoteProps {
  className?: string;
}

/**
 * Shared privacy note required under every form:
 * "Please do not share medical history or sensitive details here. We will discuss these with you in person or by phone."
 */
export const FormPrivacyNote: React.FC<FormPrivacyNoteProps> = ({ className = '' }) => {
  return (
    <div
      className={`p-3 rounded-xl bg-linen/60 border border-ink/10 text-xs text-muted font-sans flex items-start gap-2.5 ${className}`}
    >
      <Shield className="w-4 h-4 text-brass-deep flex-shrink-0 mt-0.5" aria-hidden="true" />
      <span className="leading-relaxed">
        Please do not share medical history or sensitive details here. We will discuss these with you in person or by phone.
      </span>
    </div>
  );
};
