import React, { useEffect, useState, useCallback, memo } from 'react';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'theme', label: 'Theme' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'partners', label: 'Partners' },
  { id: 'team', label: 'Team' },
];

const Navbar = memo(() => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 bg-black/70 backdrop-blur-md supports-[backdrop-filter]:bg-black/60 shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/40 blur-sm pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-[4.25rem] relative z-10">
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
              className={`relative text-sm font-medium transition-all duration-200 cursor-hover whitespace-nowrap ${
                active === id
                  ? "text-red-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "text-white/70 hover:text-white"
              }`}
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
              className={`relative py-3.5 text-center text-lg font-medium border-b border-white/10 transition-all duration-200 ease-out cursor-hover active:opacity-80 ${
                active === id
                  ? "text-red-500 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "text-white hover:text-ted-red"
              }`}
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
