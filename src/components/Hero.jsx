import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import heroTheater from '../assets/hero-theater.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = memo(({ config = {} }) => {
  const heroRef = useRef(null);
  const spotlightSurfaceRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  const {
    enableSplitText = false,
    enableHeavyAnimations = false
  } = config;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 });

      if (enableSplitText) {
        const titleSplit = new SplitType(titleRef.current, { types: ['chars'] });
        const subtitleSplit = new SplitType(subtitleRef.current, { types: ['words'] });

        tl.from(titleSplit.chars, {
          opacity: 0,
          y: 100,
          stagger: 0.02,
          duration: 1,
          ease: 'power4.out'
        })
          .from(subtitleSplit.words, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.5');
      } else {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power4.out'
        })
          .from(subtitleRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
          }, '-=0.5');
      }

      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        gsap.set(buttons, { opacity: 1 });
      }

      if (enableHeavyAnimations) {
        gsap.to(heroRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          },
          y: 200,
          opacity: 0.3
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [enableSplitText, enableHeavyAnimations]);

  useEffect(() => {
    const surface = spotlightSurfaceRef.current;
    if (!surface) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      surface.classList.add('hero-spotlight--static');
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) {
      surface.classList.add('hero-spotlight--static');
      return;
    }

    let rafId = 0;
    let pending = null;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const applyFrame = () => {
      rafId = 0;
      if (pending) {
        tx = pending.x;
        ty = pending.y;
        pending = null;
      }
      cx = lerp(cx, tx, 0.18);
      cy = lerp(cy, ty, 0.18);
      surface.style.setProperty('--hero-spot-x', `${cx}px`);
      surface.style.setProperty('--hero-spot-y', `${cy}px`);

      const still = Math.hypot(tx - cx, ty - cy) < 0.35;
      if (!still) {
        rafId = requestAnimationFrame(applyFrame);
      }
    };

    const queueFrame = () => {
      if (!rafId) rafId = requestAnimationFrame(applyFrame);
    };

    const seedFromRect = (e) => {
      const rect = surface.getBoundingClientRect();
      tx = cx = e.clientX - rect.left;
      ty = cy = e.clientY - rect.top;
      surface.style.setProperty('--hero-spot-x', `${cx}px`);
      surface.style.setProperty('--hero-spot-y', `${cy}px`);
    };

    const onMove = (e) => {
      const rect = surface.getBoundingClientRect();
      pending = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      queueFrame();
    };

    const onLeave = () => {
      const rect = surface.getBoundingClientRect();
      pending = { x: rect.width * 0.5, y: rect.height * 0.42 };
      queueFrame();
    };

    const centerSpotlight = () => {
      const rect = surface.getBoundingClientRect();
      tx = cx = rect.width * 0.5;
      ty = cy = rect.height * 0.42;
      surface.style.setProperty('--hero-spot-x', `${cx}px`);
      surface.style.setProperty('--hero-spot-y', `${cy}px`);
    };

    centerSpotlight();

    surface.addEventListener('mousemove', onMove, { passive: true });
    surface.addEventListener('mouseenter', seedFromRect, { passive: true });
    surface.addEventListener('mouseleave', onLeave);

    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(centerSpotlight)
      : null;
    ro?.observe(surface);

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      surface.removeEventListener('mousemove', onMove);
      surface.removeEventListener('mouseenter', seedFromRect);
      surface.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative bg-pure-black overflow-hidden text-white scroll-mt-[calc(4rem+env(safe-area-inset-top,0px))] md:scroll-mt-[calc(4.25rem+env(safe-area-inset-top,0px))] mt-[calc(env(safe-area-inset-top,0px)+4rem)] md:mt-[calc(env(safe-area-inset-top,0px)+4.25rem)]"
    >
      <div
        ref={spotlightSurfaceRef}
        className="relative w-full hero-spotlight-surface [--hero-spot-x:50%] [--hero-spot-y:42%] [--hero-spot-r:clamp(160px,30vmin,480px)]"
      >
        <img
          src={heroTheater}
          alt=""
          className="block w-full h-auto max-w-full align-middle select-none pointer-events-none"
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />

        {/* Uniform subtle dim — circular "lift" comes from masked layer below */}
        <div
          className="absolute inset-0 pointer-events-none bg-black/[0.28]"
          aria-hidden="true"
        />

        {/* Circular spotlight: radial-gradient mask only (no mix-blend / box quirk) */}
        <div className="hero-cursor-spotlight absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-texture z-[2]" />

        {enableHeavyAnimations && (
          <div className="absolute inset-0 pointer-events-none z-[2]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-ted-red rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center max-w-5xl w-full pointer-events-auto mx-auto">
            <h1
              ref={titleRef}
              className="font-bold tracking-tight mb-4 sm:mb-6 text-[clamp(2.75rem,12vw+0.5rem,8rem)] leading-[1.05] break-words hero-text-glow"
            >
              TEDx<span className="text-ted-red">IGDTU</span>
            </h1>

            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="w-16 sm:w-24 h-1 bg-ted-red" />
            </div>

            <h2
              ref={subtitleRef}
              className="font-light mb-12 sm:mb-16 tracking-wide text-[clamp(1.125rem,3.5vw+0.5rem,2.25rem)] max-w-[min(100%,36rem)] mx-auto leading-snug px-1 hero-text-glow"
            >
              Beyond Barriers: Who Shapes the Future?
            </h2>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center w-full max-w-2xl mx-auto">
              <button
                type="button"
                className="magnetic-btn btn-primary rounded-none w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg tracking-wide cursor-hover opacity-0"
                aria-label="Apply to speak at TEDxIGDTU"
              >
                APPLY TO SPEAK
              </button>
              <button
                type="button"
                className="magnetic-btn btn-secondary-outline rounded-none w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg tracking-wide cursor-hover opacity-0"
                aria-label="Get tickets for TEDxIGDTU"
              >
                GET TICKETS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
