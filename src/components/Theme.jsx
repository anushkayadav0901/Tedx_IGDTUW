import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import retroImage from '../assets/Untitled-design.png';

gsap.registerPlugin(ScrollTrigger);

const Theme = memo(({ config }) => {
  const sectionRef = useRef(null);
  const beyondRef = useRef(null);
  const barriersRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (config?.enableSplitText && config?.enableHeavyAnimations) {
        // Split text animation for desktop - repeats on scroll
        const beyondSplit = new SplitType(beyondRef.current, { types: ['chars'] });
        const barriersSplit = new SplitType(barriersRef.current, { types: ['chars'] });

        gsap.from(beyondSplit.chars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play reverse play reverse',
            scrub: 1
          },
          x: -100,
          opacity: 0,
          stagger: 0.02
        });

        gsap.from(barriersSplit.chars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play reverse play reverse',
            scrub: 1
          },
          x: 100,
          opacity: 0,
          stagger: 0.02
        });
      } else {
        // Parallax animation for mobile/low-end - repeats on scroll
        gsap.from(beyondRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.5,
            toggleActions: 'play reverse play reverse'
          },
          x: -80,
          opacity: 0
        });

        gsap.from(barriersRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.5,
            toggleActions: 'play reverse play reverse'
          },
          x: 80,
          opacity: 0
        });
      }

      // Parallax for subtitle and lines - repeats on scroll
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 40
      });

      gsap.from(line1Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 1,
          toggleActions: 'play reverse play reverse'
        },
        scaleX: 0,
        opacity: 0
      });

      gsap.from(line2Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top 25%',
          scrub: 1,
          toggleActions: 'play reverse play reverse'
        },
        scaleX: 0,
        opacity: 0
      });

      gsap.from(descRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
          toggleActions: 'play reverse play reverse'
        },
        opacity: 0,
        y: 50
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section
      id="theme"
      ref={sectionRef}
      className="relative scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full min-w-0 text-center relative z-10 px-1">
        <div className="mb-4 max-md:mb-3 sm:mb-6">
          <h2 className="font-bold tracking-tight flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-[clamp(2.5rem,8vw+0.5rem,6rem)] leading-tight">
            <span ref={beyondRef} className="animate-text-glow">BEYOND </span>
            <span ref={barriersRef} className="text-ted-red drop-shadow-[0_0_25px_rgba(229,9,20,0.8)] animate-text-glow-red">BARRIERS</span>
          </h2>
        </div>

        <div ref={line1Ref} className="w-24 sm:w-32 h-0.5 bg-ted-red mx-auto mb-4 max-md:mb-3 sm:mb-6"></div>

        <p ref={subtitleRef} className="text-[clamp(1.25rem,3vw+0.5rem,1.875rem)] font-light mb-6 md:mb-10 text-white/90 px-2 animate-fade-in">
          Who Shapes the Future?
        </p>

        <div ref={line2Ref} className="w-20 sm:w-24 h-0.5 bg-ted-red mx-auto mb-6 md:mb-10"></div>

        <div className="card-premium cursor-hover w-full mx-auto mb-8 md:mb-12 relative overflow-hidden flex items-center justify-center">
          <img src={retroImage} loading="lazy" className="block w-full h-auto object-contain rounded-[inherit]" alt="TEDx Theme" />
        </div>

        <p ref={descRef} className="text-base sm:text-lg text-white/80 leading-snug sm:leading-relaxed max-w-2xl mx-auto">
          In a world defined by boundaries - social, technological, and personal - who dares
          to break through? This year's theme explores the pioneers, innovators, and
          changemakers who refuse to accept limitations and instead redefine what's possible.
        </p>
      </div>
    </section>
  );
});

Theme.displayName = 'Theme';

export default Theme;
