import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

/* ─── Types ─── */
type ToastVariant = 'info' | 'success' | 'error';

interface ToastMessage {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextType {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void;
  showToast: (message: string, duration?: number) => void;
}

/* ─── Context ─── */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

const icons: Record<ToastVariant, React.ReactNode> = {
  info:    <Info className="w-5 h-5 flex-shrink-0" />,
  success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
  error:   <AlertCircle className="w-5 h-5 flex-shrink-0" />,
};

const variantStyles: Record<ToastVariant, string> = {
  info:    'bg-clove text-enamel border-brass/30',
  success: 'bg-clove text-enamel border-emerald-500/30',
  error:   'bg-clove text-enamel border-pomegranate/50',
};

/* ─── Provider ─── */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 3500) => {
      const id = ++toastId;
      setToasts((prev) => [...prev.slice(-4), { id, message, variant }]);
      const timer = setTimeout(() => dismiss(id), duration);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const showToast = useCallback(
    (message: string, duration?: number) => {
      toast(message, 'info', duration);
    },
    [toast],
  );

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}

      {/* Toast container */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none w-full max-w-md px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={[
              'pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full border',
              'font-sans text-fluid-sm font-medium shadow-card-elevated',
              'animate-slide-in-bottom motion-reduce:animate-fade-in',
              variantStyles[t.variant],
            ].join(' ')}
          >
            {icons[t.variant]}
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="flex-shrink-0 p-1 rounded-full hover:bg-pearl/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/* ─── Hook ─── */
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
