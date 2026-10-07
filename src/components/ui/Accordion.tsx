import React, { useState, useId, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

/* ─── Accordion ─── */
interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once */
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const groupId = useId();

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <div className={`divide-y divide-linen ${className}`} role="presentation">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${groupId}-trigger-${item.id}`;
        const panelId = `${groupId}-panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={
                  'flex w-full items-center justify-between gap-4 py-4 sm:py-5 ' +
                  'text-left font-sans text-fluid-base font-semibold text-ink ' +
                  'transition-colors hover:text-pomegranate ' +
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate focus-visible:ring-offset-2 rounded-lg'
                }
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-muted transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={
                'overflow-hidden transition-all duration-200 motion-reduce:transition-none ' +
                (isOpen ? 'pb-5' : '')
              }
            >
              <div className="text-fluid-sm text-muted leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
