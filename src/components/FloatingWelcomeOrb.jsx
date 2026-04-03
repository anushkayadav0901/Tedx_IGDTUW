import React, { useState, useRef, useEffect, memo, useCallback } from 'react';

const LINE1 = 'TEDxIGDTU';
const LINE2 =
  'Welcome to a day of ideas worth spreading - thought-provoking talks and meaningful connections, live on campus.';

const FloatingWelcomeOrb = memo(() => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocPointerDown);
    document.addEventListener('touchstart', onDocPointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDocPointerDown);
      document.removeEventListener('touchstart', onDocPointerDown);
    };
  }, [open]);

  const toggle = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  return (
    <div
      ref={rootRef}
      className="floating-welcome pointer-events-none fixed z-[90] left-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] md:left-6 md:bottom-8 w-[min(19rem,calc(100%-1.5rem))] max-md:w-[min(17.5rem,calc(100%-1.25rem))] max-md:left-2"
    >
      <div
        className={[
          'floating-welcome-card pointer-events-auto mb-2.5 origin-bottom-left rounded-2xl border border-white/50 bg-white/[0.88] px-3.5 py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 ease-out md:px-4 md:py-3.5',
          open
            ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
            : 'opacity-0 translate-y-2 translate-x-0.5 scale-[0.98] pointer-events-none',
        ].join(' ')}
        role="dialog"
        aria-label="Welcome message"
        aria-hidden={!open}
      >
        <p className="font-heading text-sm font-bold tracking-tight text-[#ff0000] mb-1.5">
          {LINE1}
        </p>
        <p className="text-[0.8125rem] md:text-sm leading-relaxed text-neutral-800/95 font-normal">
          {LINE2}
        </p>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? 'Close message' : 'Open welcome message'}
        className="btn-icon-press floating-welcome-trigger pointer-events-auto flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#E50914] text-white shadow-[0_6px_20px_rgba(229,9,20,0.4)] border border-white/20 opacity-[0.88] transition-[transform,box-shadow,opacity] duration-200 ease-out hover:scale-105 hover:opacity-100 hover:shadow-[0_8px_26px_rgba(229,9,20,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000] max-md:h-9 max-md:w-9"
      >
        <span className="sr-only">{open ? 'Close' : 'Open welcome message'}</span>
        <span
          className="block h-2 w-2 rounded-full bg-white/95 shadow-[0_0_10px_rgba(255,255,255,0.6)]"
          aria-hidden
        />
      </button>
    </div>
  );
});

FloatingWelcomeOrb.displayName = 'FloatingWelcomeOrb';

export default FloatingWelcomeOrb;
