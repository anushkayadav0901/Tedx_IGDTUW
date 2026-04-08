import React, { useEffect, useRef, memo, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import heroTheater from '../assets/hero-theater.png';
import heroTheaterPortrait from '../assets/hero-theater-portrait.png';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Floating dust particles for cinematic light beam
   ────────────────────────────────────────────── */
const DUST_COUNT_DESKTOP = 8;
const DUST_COUNT_MOBILE = 4;

const makeDust = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${8 + Math.random() * 84}%`,
    top: `${5 + Math.random() * 90}%`,
    size: 1.5 + Math.random() * 2.5,
    opacity: 0.12 + Math.random() * 0.22,
    duration: 6 + Math.random() * 12,
    delay: Math.random() * 8,
    driftX: -12 + Math.random() * 24,
    driftY: -20 + Math.random() * -10,
  }));

const Hero = memo(({ config = {} }) => {
  const heroRef = useRef(null);
  const spotlightSurfaceRef = useRef(null);
  const heroImageSlotRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const spotlightBeamRef = useRef(null);

  const {
    enableSplitText = false,
    enableHeavyAnimations = false,
  } = config;

  /* Generate dust particles array (stable across renders) */
  const dustParticles = useMemo(
    () => makeDust(enableHeavyAnimations ? DUST_COUNT_DESKTOP : DUST_COUNT_MOBILE),
    [enableHeavyAnimations]
  );

  /* ── Entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const master = gsap.timeline({ delay: 1.2 });

      /* 1. Spotlight beam fades in */
      if (spotlightBeamRef.current) {
        master.fromTo(
          spotlightBeamRef.current,
          { opacity: 0, scaleY: 0.6 },
          { opacity: 1, scaleY: 1, duration: 1.6, ease: 'power2.out' },
          0
        );
      }

      /* 2. Title appears */
      if (enableSplitText) {
        const titleSplit = new SplitType(titleRef.current, { types: ['chars'] });
        const subtitleSplit = new SplitType(subtitleRef.current, { types: ['words'] });

        master.from(titleSplit.chars, {
          opacity: 0,
          y: 100,
          stagger: 0.02,
          duration: 1,
          ease: 'power4.out',
        }, 0.4);

        master.from(subtitleSplit.words, {
          opacity: 0,
          y: 50,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5');
      } else {
        master.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power4.out',
        }, 0.4);

        master.from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.5');
      }

      /* 3. CTA buttons appear after title with soft upward motion */
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button, a');
        master.fromTo(
          buttons,
          { opacity: 0, y: 28, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.3'
        );
      }

      /* Scroll parallax (desktop) - disabled for performance */
      if (enableHeavyAnimations && false) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          y: 200,
          opacity: 0.3,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [enableSplitText, enableHeavyAnimations]);

  /* ── Cursor-tracking spotlight (existing logic, unchanged) ── */
  useEffect(() => {
    const surface = spotlightSurfaceRef.current;
    if (!surface) return;

    const spotRectTarget = () => heroImageSlotRef.current || surface;

    const mobileMq = window.matchMedia('(max-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const lowEnd =
      typeof navigator !== 'undefined' &&
      ((navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4) ||
        (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4));

    const setModeClasses = () => {
      surface.classList.remove('hero-spotlight--mobile', 'hero-spotlight--static');

      if (mobileMq.matches) {
        surface.classList.add('hero-spotlight--mobile');
        return 'mobile';
      }

      if (reducedMotion || !finePointer || lowEnd) {
        surface.classList.add('hero-spotlight--static');
        return 'static';
      }

      return 'cursor';
    };

    let rafId = 0;
    let pending = null;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let pubX = -9999;
    let pubY = -9999;
    const lerp = (a, b, t) => a + (b - a) * t;

    const applyFrame = () => {
      rafId = 0;
      if (pending) {
        tx = pending.x;
        ty = pending.y;
        pending = null;
      }
      cx = lerp(cx, tx, 0.2);
      cy = lerp(cy, ty, 0.2);

      const still = Math.hypot(tx - cx, ty - cy) < 0.45;
      const movedEnough =
        Math.abs(cx - pubX) > 0.28 || Math.abs(cy - pubY) > 0.28;

      if (movedEnough || !still) {
        surface.style.setProperty('--hero-spot-x', `${cx}px`);
        surface.style.setProperty('--hero-spot-y', `${cy}px`);
        pubX = cx;
        pubY = cy;
      }

      if (!still) {
        rafId = requestAnimationFrame(applyFrame);
      }
    };

    const queueFrame = () => {
      if (!rafId) rafId = requestAnimationFrame(applyFrame);
    };

    const seedFromRect = (e) => {
      const rect = spotRectTarget().getBoundingClientRect();
      tx = cx = e.clientX - rect.left;
      ty = cy = e.clientY - rect.top;
      surface.style.setProperty('--hero-spot-x', `${cx}px`);
      surface.style.setProperty('--hero-spot-y', `${cy}px`);
    };

    const onMove = (e) => {
      const rect = spotRectTarget().getBoundingClientRect();
      pending = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      queueFrame();
    };

    const onLeave = () => {
      const rect = spotRectTarget().getBoundingClientRect();
      pending = { x: rect.width * 0.5, y: rect.height * 0.42 };
      queueFrame();
    };

    const centerSpotlight = () => {
      const rect = spotRectTarget().getBoundingClientRect();
      tx = cx = rect.width * 0.5;
      ty = cy = rect.height * 0.42;
      surface.style.setProperty('--hero-spot-x', `${cx}px`);
      surface.style.setProperty('--hero-spot-y', `${cy}px`);
    };

    const attachCursorListeners = () => {
      centerSpotlight();
      surface.addEventListener('mousemove', onMove, { passive: true });
      surface.addEventListener('mouseenter', seedFromRect, { passive: true });
      surface.addEventListener('mouseleave', onLeave);
    };

    const detachCursorListeners = () => {
      surface.removeEventListener('mousemove', onMove);
      surface.removeEventListener('mouseenter', seedFromRect);
      surface.removeEventListener('mouseleave', onLeave);
    };

    let ro = null;

    const applyListeners = () => {
      detachCursorListeners();
      cancelAnimationFrame(rafId);
      rafId = 0;
      const mode = setModeClasses();
      if (mode === 'cursor') {
        attachCursorListeners();
        ro =
          ro ||
          (typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(centerSpotlight)
            : null);
        ro?.observe(heroImageSlotRef.current || surface);
      } else {
        ro?.disconnect();
        ro = null;
      }
    };

    applyListeners();

    const onBreak = () => applyListeners();
    mobileMq.addEventListener('change', onBreak);

    return () => {
      cancelAnimationFrame(rafId);
      mobileMq.removeEventListener('change', onBreak);
      detachCursorListeners();
      ro?.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section-mobile relative bg-pure-black overflow-x-hidden overflow-y-visible text-white scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px))] mt-[calc(env(safe-area-inset-top,0px)+4rem)] md:mt-[calc(env(safe-area-inset-top,0px)+4.25rem)]"
    >
      <div
        ref={spotlightSurfaceRef}
        className="hero-spotlight-surface hero-spotlight-isolate relative w-full max-w-full [--hero-spot-x:50%] [--hero-spot-y:42%] [--hero-spot-r:clamp(200px,38vmin,580px)] md:min-h-0"
      >
        <div
          ref={heroImageSlotRef}
          className="hero-image-slot relative w-full max-w-full min-w-0"
        >
          <img
            src={heroTheater}
            alt=""
            className="hero-img-landscape hero-hero-img hero-hero-media block w-full h-auto max-w-full align-middle select-none pointer-events-none mx-auto md:mx-0"
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
          <img
            src={heroTheaterPortrait}
            alt=""
            className="hero-img-portrait hero-hero-img hero-hero-media block w-full h-auto max-w-full align-middle select-none pointer-events-none mx-auto md:mx-0"
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />

          {/* Dim base overlay */}
          <div
            className="hero-dim-base absolute inset-0 pointer-events-none bg-black/[0.28] md:block max-md:hidden"
            aria-hidden="true"
          />

          <div
            className="hero-mobile-soft-vignette absolute inset-0 pointer-events-none md:hidden"
            aria-hidden="true"
          />

          {/* ═══ CINEMATIC SPOTLIGHT BEAM ═══ */}
          <div
            ref={spotlightBeamRef}
            className="hero-cinematic-beam absolute inset-0 pointer-events-none z-[1]"
            aria-hidden="true"
          />

          <div
            className="hero-cursor-spotlight absolute inset-0 pointer-events-none max-md:hidden md:block"
            aria-hidden="true"
          />

          <div
            className="hero-cursor-spotlight hero-cursor-spotlight-mobile-slot absolute inset-0 pointer-events-none md:hidden"
            aria-hidden="true"
          />

          <div
            className="hero-mobile-ambient-glow absolute inset-0 pointer-events-none md:hidden"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none grain-texture z-[2] max-md:hidden"
          />

          {/* ═══ FLOATING DUST PARTICLES ═══ */}
          <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden hero-dust-layer">
            {dustParticles.map((p) => (
              <span
                key={p.id}
                className="hero-dust-particle"
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: p.opacity,
                  '--dust-drift-x': `${p.driftX}px`,
                  '--dust-drift-y': `${p.driftY}px`,
                  animationDuration: `${p.duration}s`,
                  animationDelay: `${p.delay}s`,
                }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        {/* ── Content Layer ── */}
        <div className="hero-content-layer z-10 flex items-center justify-center pointer-events-none px-4 sm:px-6 py-4 sm:py-8 md:py-16 md:absolute md:inset-0 min-h-0">
          <div className="text-center max-w-5xl w-full min-w-0 pointer-events-auto mx-auto">
            <h1
              ref={titleRef}
              style={{ fontFamily: 'Times New Roman, serif' }}
              className="hero-title-text font-extrabold font-serif tracking-wide mb-3 sm:mb-6 text-[clamp(2.25rem,10vw+1rem,8rem)] md:leading-[1.05] leading-tight break-words text-balance px-1 sm:px-0 hero-text-glow"
            >
              TEDx<span className="text-ted-red">IGDTU</span>
            </h1>

            <div className="flex justify-center mb-4 sm:mb-8 hero-title-rule">
              <div className="w-16 sm:w-24 h-1 bg-ted-red hero-rule-glow" />
            </div>

            <div className="max-w-5xl mx-auto w-full px-2">
              <h2
                ref={subtitleRef}
                className="font-light mb-6 sm:mb-12 tracking-wide text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.25rem] leading-tight text-center whitespace-nowrap overflow-hidden text-ellipsis hero-text-glow hero-subtitle-mobile"
              >
                Beyond Barriers: Who Shapes the Future?
              </h2>
            </div>

            <div className="flex justify-center mb-10 sm:mb-12">
              <a
                href="/competition"
                className="inline-flex items-center px-4 py-2 text-base rounded-full bg-red-500/30 text-white border border-red-500/60 shadow-[0_0_20px_rgba(255,0,0,0.4)] animate-[pulse_3s_ease-in-out_infinite] hover:scale-105 hover:bg-red-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:animate-none transition-all duration-300 cursor-hover"
              >
                <span className="relative flex h-2 w-2 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-100" />
                </span>
                Competition Live
              </a>
            </div>

            {/* ═══ CTA BUTTONS WITH GLOW HALOS ═══ */}
            <div
              ref={ctaRef}
              className="hero-cta-row flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center w-full max-w-2xl mx-auto"
            >
              <div className="hero-cta-glow-wrap relative">
                <span className="hero-cta-halo hero-cta-halo--primary" aria-hidden="true" />
                <button
                  type="button"
                  className="magnetic-btn btn-primary hero-cta-btn rounded-none w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-lg tracking-wide cursor-hover opacity-0"
                  aria-label="Apply to speak at TEDxIGDTU"
                >
                  <span className="magnetic-btn__label">APPLY TO SPEAK</span>
                </button>
              </div>
              <div className="hero-cta-glow-wrap relative">
                <span className="hero-cta-halo hero-cta-halo--outline" aria-hidden="true" />
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeEsqlZ6jA3YaawJChTyghzlKxU2BIc44-bF_CwcdS3mCx1Gw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-btn btn-secondary-outline hero-cta-btn rounded-none w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-lg tracking-wide cursor-hover opacity-0 inline-block text-center"
                  aria-label="Get tickets for TEDxIGDTU"
                >
                  <span className="magnetic-btn__label">GET TICKETS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
