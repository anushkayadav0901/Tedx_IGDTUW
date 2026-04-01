import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Hero = memo(({ config = {} }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const contextRef = useRef(null);

  // Default config values
  const {
    enableSplitText = false,
    enableParallax = false,
    enableHeavyAnimations = false
  } = config;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }); // Reduced delay from 2 to 1.5

      // Split text animation (only if enabled)
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
        // Fallback simple animation
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

      // Animate buttons - TEST: No animation, just make visible
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        gsap.set(buttons, { opacity: 1 });
      }

      // Parallax effect on mouse move (desktop only)
      if (enableParallax) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const xPos = (clientX / window.innerWidth - 0.5) * 20;
          const yPos = (clientY / window.innerHeight - 0.5) * 20;

          gsap.to(titleRef.current, {
            x: xPos,
            y: yPos,
            duration: 0.5,
            ease: 'power2.out'
          });

          gsap.to(subtitleRef.current, {
            x: xPos * 0.5,
            y: yPos * 0.5,
            duration: 0.7,
            ease: 'power2.out'
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }

      // Scroll parallax (only on desktop)
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

    contextRef.current = ctx;

    return () => ctx.revert();
  }, [enableSplitText, enableParallax, enableHeavyAnimations]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 md:pt-20 md:pb-20 overflow-hidden"
    >
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grain-texture"></div>
      
      {/* Floating particles (reduced on mobile) */}
      {enableHeavyAnimations && (
        <div className="absolute inset-0 pointer-events-none">
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

      <div className="text-center max-w-5xl w-full relative z-10 mx-auto">
        <h1 
          ref={titleRef}
          className="font-bold tracking-tight mb-4 sm:mb-6 text-[clamp(2.75rem,12vw+0.5rem,8rem)] leading-[1.05] break-words"
        >
          TEDx<span className="text-ted-red">IGDTU</span>
        </h1>
        
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-16 sm:w-24 h-1 bg-ted-red"></div>
        </div>
        
        <h2 
          ref={subtitleRef}
          className="font-light mb-12 sm:mb-16 tracking-wide text-[clamp(1.125rem,3.5vw+0.5rem,2.25rem)] max-w-[min(100%,36rem)] mx-auto leading-snug px-1"
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
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
