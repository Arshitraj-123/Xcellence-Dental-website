import React, { useState, useId, useRef, useCallback, useEffect } from 'react';

/* ─── Tabs ─── */
interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  /** Visual variant for the tab bar */
  variant?: 'underline' | 'pill';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  className = '',
  variant = 'underline',
}) => {
  const [activeId, setActiveId] = useState(defaultTab || tabs[0]?.id || '');
  const groupId = useId();
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIdx = tabs.findIndex((t) => t.id === activeId);
      let nextIdx = currentIdx;

      if (e.key === 'ArrowRight') {
        nextIdx = (currentIdx + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIdx = (currentIdx - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = tabs.length - 1;
      } else {
        return;
      }

      e.preventDefault();
      const nextTab = tabs[nextIdx];
      setActiveId(nextTab.id);
      tabRefs.current.get(nextTab.id)?.focus();
    },
    [activeId, tabs],
  );

  useEffect(() => {
    if (!tabs.find((t) => t.id === activeId) && tabs.length > 0) {
      setActiveId(tabs[0].id);
    }
  }, [tabs, activeId]);

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={
          variant === 'underline'
            ? 'flex gap-1 border-b border-linen overflow-x-auto scrollbar-none'
            : 'inline-flex gap-1 rounded-full bg-linen p-1'
        }
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          const tabId = `${groupId}-tab-${tab.id}`;
          const panelId = `${groupId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              className={
                variant === 'underline'
                  ? [
                      'flex-shrink-0 px-4 py-2.5 font-sans text-fluid-sm font-medium transition-colors',
                      'border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate focus-visible:ring-offset-2 rounded-t-lg',
                      isActive
                        ? 'border-pomegranate text-pomegranate'
                        : 'border-transparent text-muted hover:text-ink hover:border-linen',
                    ].join(' ')
                  : [
                      'px-4 py-2 font-sans text-fluid-sm font-medium rounded-full transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate focus-visible:ring-offset-1',
                      isActive
                        ? 'bg-pearl text-pomegranate shadow-sm'
                        : 'text-muted hover:text-ink',
                    ].join(' ')
              }
            >
              {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        const tabId = `${groupId}-tab-${tab.id}`;
        const panelId = `${groupId}-panel-${tab.id}`;

        return (
          <div
            key={tab.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isActive}
            className="pt-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pomegranate rounded-lg"
          >
            {isActive && tab.content}
          </div>
        );
      })}
    </div>
  );
};
