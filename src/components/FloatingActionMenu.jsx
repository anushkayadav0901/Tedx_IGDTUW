import React, { useState, useRef, useEffect, memo, useCallback } from 'react';

/* ──────────────────────────────────────────────
   Menu actions – each maps to a section id or URL
   ────────────────────────────────────────────── */
const ACTIONS = [
  {
    id: 'fab-apply',
    label: 'Apply to Speak',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    action: 'scroll',
    target: 'about', // scroll to about / apply section
  },
  {
    id: 'fab-tickets',
    label: 'Get Tickets',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
      </svg>
    ),
    action: 'scroll',
    target: 'hero',
  },
  {
    id: 'fab-speakers',
    label: 'Speakers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    action: 'scroll',
    target: 'speakers',
  },
  {
    id: 'fab-timeline',
    label: 'Timeline',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    action: 'scroll',
    target: 'timeline',
  },
];

/* ──────────────────────────────────────────────
   Geometry helpers
   ────────────────────────────────────────────── */

/**
 * Both desktop & mobile: items fan from LEFT (180°) to straight UP (270°).
 * This keeps every item within the viewport since the FAB sits at bottom-right.
 *
 * 180° → cos = -1, sin =  0  → straight left
 * 270° → cos =  0, sin = -1  → straight up
 */

function desktopPosition(index, total, radius) {
  const startAngle = 180;
  const endAngle = 270;
  const step = (endAngle - startAngle) / (total - 1);
  const angleDeg = startAngle + step * index;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(angleRad) * radius,
    y: Math.sin(angleRad) * radius,
  };
}

function mobilePosition(index, total, radius) {
  const startAngle = 180;
  const endAngle = 270;
  const step = (endAngle - startAngle) / (total - 1);
  const angleDeg = startAngle + step * index;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(angleRad) * radius,
    y: Math.sin(angleRad) * radius,
  };
}

const FloatingActionMenu = memo(() => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const rootRef = useRef(null);

  /* Responsive detection */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const handleAction = useCallback((item) => {
    if (item.action === 'scroll') {
      const el = document.getElementById(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (item.action === 'url') {
      window.open(item.target, '_blank', 'noopener');
    }
    setOpen(false);
  }, []);

  const radius = isMobile ? 95 : 110;
  const total = ACTIONS.length;

  return (
    <div
      ref={rootRef}
      id="fab-menu-root"
      className="fab-root"
      aria-label="Quick actions"
    >
      {/* Backdrop overlay when open */}
      <div
        className={`fab-backdrop ${open ? 'fab-backdrop--visible' : ''}`}
        aria-hidden="true"
      />

      {/* Radial action items */}
      <div className="fab-items" aria-hidden={!open}>
        {ACTIONS.map((item, i) => {
          const pos = isMobile
            ? mobilePosition(i, total, radius)
            : desktopPosition(i, total, radius);

          return (
            <button
              key={item.id}
              id={item.id}
              type="button"
              className={`fab-item ${open ? 'fab-item--open' : ''}`}
              style={{
                '--fab-x': `${pos.x}px`,
                '--fab-y': `${pos.y}px`,
                '--fab-delay': `${i * 55}ms`,
                transitionDelay: open ? `${i * 55}ms` : `${(total - 1 - i) * 35}ms`,
              }}
              onClick={() => handleAction(item)}
              aria-label={item.label}
              tabIndex={open ? 0 : -1}
            >
              <span className="fab-item__icon">{item.icon}</span>
              <span className="fab-item__label">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main FAB trigger */}
      <button
        type="button"
        id="fab-main-trigger"
        className={`fab-trigger ${open ? 'fab-trigger--open' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? 'Close quick actions' : 'Open quick actions'}
      >
        <span className="fab-trigger__icon" aria-hidden="true">
          {/* Plus → X morph */}
          <span className="fab-trigger__bar fab-trigger__bar--h" />
          <span className="fab-trigger__bar fab-trigger__bar--v" />
        </span>
      </button>
    </div>
  );
});

FloatingActionMenu.displayName = 'FloatingActionMenu';

export default FloatingActionMenu;
