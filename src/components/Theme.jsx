import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const Theme = memo(({ config }) => {
  const sectionRef = useRef(null);
  const beyondRef = useRef(null);
  const barriersRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const blockRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (config.enableSplitText && config.enableHeavyAnimations) {
        // Split text animation for desktop
        const beyondSplit = new SplitType(beyondRef.current, { types: ['chars'] });
        const barriersSplit = new SplitType(barriersRef.current, { types: ['chars'] });

        gsap.from(beyondSplit.chars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          },
          x: -100,
          opacity: 0,
          stagger: 0.03
        });

        gsap.from(barriersSplit.chars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          },
          x: 100,
          opacity: 0,
          stagger: 0.03
        });
      } else {
        // Simple fade for mobile/low-end
        gsap.from([beyondRef.current, barriersRef.current], {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          },
          opacity: 0,
          y: 50
        });
      }

      // Batch remaining animations
      const elements = [subtitleRef.current, line1Ref.current, line2Ref.current, descRef.current];
      
      ScrollTrigger.batch(elements, {
        start: 'top 80%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
        once: true
      });

      // Barrier blocks (only on desktop)
      if (config.enableHeavyAnimations) {
        blockRefs.current.forEach((block, i) => {
          if (block) {
            gsap.from(block, {
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 50%',
                end: 'top 20%',
                scrub: 1
              },
              x: i % 2 === 0 ? -50 : 50,
              opacity: 0
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 border-t border-white/10 overflow-hidden">
      {/* Barrier-like blocks (desktop only) */}
      {config.enableHeavyAnimations && (
        <div className="absolute inset-0 pointer-events-none">
          <div ref={el => blockRefs.current[0] = el} className="absolute top-20 left-10 w-1 h-32 bg-ted-red/20"></div>
          <div ref={el => blockRefs.current[1] = el} className="absolute top-40 right-20 w-1 h-48 bg-ted-red/20"></div>
          <div ref={el => blockRefs.current[2] = el} className="absolute bottom-40 left-1/4 w-1 h-40 bg-ted-red/20"></div>
          <div ref={el => blockRefs.current[3] = el} className="absolute bottom-20 right-1/3 w-1 h-56 bg-ted-red/20"></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight inline-block">
            <span ref={beyondRef}>BEYOND </span>
            <span ref={barriersRef} className="text-ted-red">BARRIERS</span>
          </h2>
        </div>
        
        <div ref={line1Ref} className="w-32 h-0.5 bg-ted-red mx-auto mb-6"></div>
        
        <p ref={subtitleRef} className="text-2xl md:text-3xl font-light mb-12 text-white/90">
          Who Shapes the Future?
        </p>
        
        <div ref={line2Ref} className="w-24 h-0.5 bg-ted-red mx-auto mb-12"></div>
        
        <div className="h-64 border border-white/20 mb-12 flex items-center justify-center relative overflow-hidden cursor-hover group">
          <p className="text-white/40 text-sm">3D Interactive Element Space</p>
          <div className="absolute inset-0 border-2 border-ted-red/0 group-hover:border-ted-red/30 transition-colors duration-500"></div>
        </div>
        
        <p ref={descRef} className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
          In a world defined by boundaries—social, technological, and personal—who dares 
          to break through? This year's theme explores the pioneers, innovators, and 
          changemakers who refuse to accept limitations and instead redefine what's possible.
        </p>
      </div>
    </section>
  );
});

Theme.displayName = 'Theme';

export default Theme;
