import React, { useEffect } from 'react';
import { MessageSquare, Mail, Phone, X, ShieldAlert, Info } from 'lucide-react';
import { ReviewActionData } from '@/lib/submitForm';
import { CLINIC } from '@/data/clinic';
import { Button } from '@/components/common/Button';

interface ReviewAndSendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: ReviewActionData | null;
  errorMessage?: string | null;
  isOffline?: boolean;
}

export const ReviewAndSendDialog: React.FC<ReviewAndSendDialogProps> = ({
  isOpen,
  onClose,
  data,
  errorMessage,
  isOffline,
}) => {
  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-review-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-clove/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-pearl rounded-3xl p-6 sm:p-8 shadow-dialog border border-ink/10 font-sans z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-muted hover:text-clove hover:bg-linen/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-pomegranate block">
            Direct Clinical Dispatch
          </span>
          <h3 id="dialog-review-title" className="font-serif text-2xl sm:text-3xl font-bold text-clove mt-1">
            {errorMessage ? 'Direct Contact Options' : 'Review & Send Request'}
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
            {errorMessage
              ? 'Our server is currently unreachable. You can connect with our clinic desk directly:'
              : 'Choose your preferred channel below. Your inquiry is formatted and ready for our reception desk:'}
          </p>
        </div>

        {/* Offline / Error Fallback Notice */}
        {errorMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>{isOffline ? 'You appear to be offline.' : 'Submission notice:'}</strong> {errorMessage}
            </div>
          </div>
        )}

        {/* Form Details Summary Table */}
        {data && data.summaryItems.length > 0 && (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-linen/50 border border-ink/10 space-y-2.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-clove block border-b border-ink/10 pb-2">
              Summary of Your Request
            </span>
            <dl className="space-y-1.5 text-xs sm:text-sm">
              {data.summaryItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-3">
                  <dt className="text-muted font-normal">{item.label}:</dt>
                  <dd className="font-bold text-clove text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Crucial Honest Note */}
        <div className="mt-4 p-3 rounded-xl bg-brass/10 border border-brass/25 text-xs text-clove flex items-center gap-2">
          <Info className="w-4 h-4 text-brass-deep flex-shrink-0" />
          <span className="font-semibold">
            {data?.note || 'Your request is sent when you tap Send.'}
          </span>
        </div>

        {/* 3 Real Primary Actions */}
        <div className="mt-6 space-y-3">
          {/* Action 1: Send on WhatsApp */}
          <a
            href={data?.whatsappUrl || `https://wa.me/${CLINIC.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all hover:shadow-md"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>Send on WhatsApp</span>
          </a>

          {/* Action 2: Email us */}
          <a
            href={data?.mailtoUrl || `mailto:${CLINIC.email}`}
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-2xl bg-clove hover:bg-clove/90 text-enamel font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-all hover:shadow-md"
          >
            <Mail className="w-5 h-5 text-brass" />
            <span>Email us</span>
          </a>

          {/* Action 3: Call now */}
          <a
            href={data?.callUrl || CLINIC.phoneTel}
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl border border-ink/20 hover:border-pomegranate/50 hover:bg-linen/50 text-clove font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-pomegranate" />
            <span>Call Now ({CLINIC.phone.display})</span>
          </a>
        </div>

        {/* Footer edit cancel */}
        <div className="mt-5 text-center">
          <Button onClick={onClose} variant="ghost" size="sm">
            Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
};
