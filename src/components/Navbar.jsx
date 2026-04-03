import React, { useEffect, useState, useCallback, memo } from 'react';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'theme', label: 'Theme' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'experience', label: 'Experience' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'partners', label: 'Partners' },
];

const Navbar = memo(() => {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    close();
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-pure-black/90 backdrop-blur-md supports-[backdrop-filter]:bg-pure-black/80"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[4.25rem]">
        <a
          href="#hero"
          className="font-heading font-bold text-lg sm:text-xl tracking-tight cursor-hover shrink-0"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          TEDx<span className="text-ted-red">IGDTU</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Primary">
          {NAV_LINKS.slice(1).map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium text-white/90 hover:text-white transition-colors cursor-hover whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="btn-icon-press lg:hidden relative z-[110] w-11 h-11 flex items-center justify-center rounded-xl border border-white/20 text-white hover:border-ted-red hover:text-ted-red cursor-hover"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
          <span className="flex flex-col gap-1.5 w-5" aria-hidden>
            <span
              className={`block h-0.5 w-full bg-current transition-transform origin-center ${open ? 'translate-y-2 rotate-45' : ''
                }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-opacity ${open ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`block h-0.5 w-full bg-current transition-transform origin-center ${open ? '-translate-y-2 -rotate-45' : ''
                }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 top-0 z-[105] bg-pure-black/98 backdrop-blur-lg overflow-y-auto transition-[visibility,opacity] duration-300 ease-out ${open ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
          }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
        aria-hidden={!open}
      >
        <div
          className={`flex flex-col items-stretch justify-center min-h-[100dvh] px-6 pt-20 pb-10 gap-0.5 max-w-md mx-auto w-full max-[380px]:px-5 transition-[opacity,transform] duration-300 ease-out ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
        >
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="py-3.5 text-center text-lg font-medium text-white border-b border-white/10 hover:text-ted-red transition-colors duration-200 ease-out cursor-hover active:opacity-80"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
