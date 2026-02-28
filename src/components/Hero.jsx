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
        console.log('=== BUTTON DEBUG ===');
        console.log('Found buttons:', buttons.length);
        console.log('Button 1:', buttons[0]);
        console.log('Button 2:', buttons[1]);
        console.log('Container:', ctaRef.current);
        console.log('Container children:', ctaRef.current.children);
        
        // Just set opacity to 1 immediately - no animation
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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
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

      <div className="text-center max-w-5xl relative z-10">
        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold tracking-tight mb-6"
        >
          TEDx<span className="text-ted-red">IGDTUW</span>
        </h1>
        
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-ted-red"></div>
        </div>
        
        <h2 
          ref={subtitleRef}
          className="text-2xl md:text-4xl font-light mb-16 tracking-wide"
        >
          Beyond Barriers: Who Shapes the Future?
        </h2>
        
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-2xl mx-auto">
          <button 
            className="magnetic-btn w-full sm:w-auto px-10 py-4 bg-ted-red text-white font-medium text-lg tracking-wide hover:scale-105 transition-transform duration-300 cursor-hover opacity-0" 
            aria-label="Apply to speak at TEDxIGDTUW"
          >
            APPLY TO SPEAK
          </button>
          <button 
            className="magnetic-btn w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-medium text-lg tracking-wide hover:bg-white hover:text-pure-black transition-all duration-300 cursor-hover opacity-0" 
            aria-label="Get tickets for TEDxIGDTUW"
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
