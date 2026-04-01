import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = memo(({ config }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const elements = [titleRef.current, ...textRef.current.children];
      
      ScrollTrigger.batch(elements, {
        start: 'top 80%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 50,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
        once: true
      });

      // Placeholder parallax (only on desktop)
      if (config.enableParallax) {
        gsap.to(placeholderRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -50
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 py-20 sm:py-28 md:py-32 px-4 sm:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="min-w-0">
            <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
              What is <span className="text-ted-red">TEDx</span>?
            </h2>
            <div ref={textRef}>
              <p className="text-base sm:text-lg text-white/80 mb-6 leading-relaxed">
                TEDx is a program of local, self-organized events that bring people together 
                to share a TED-like experience. Our event is called TEDxIGDTU, where x = 
                independently organized TED event.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                At TEDxIGDTU, TED Talks video and live speakers combine to spark deep 
                discussion and connection. The TED Conference provides general guidance 
                for the TEDx program, but individual TEDx events are self-organized.
              </p>
            </div>
          </div>
          
          <div 
            ref={placeholderRef}
            className="card-premium group cursor-hover w-full max-w-full min-h-[14rem] sm:min-h-[18rem] md:h-96 md:min-h-0 aspect-[4/3] md:aspect-auto flex items-center justify-center relative overflow-hidden"
          >
            <p className="text-white/40 text-sm relative z-10">3D Model Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
