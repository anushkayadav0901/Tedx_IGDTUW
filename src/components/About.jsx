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
    <section ref={sectionRef} className="py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-8">
              What is <span className="text-ted-red">TEDx</span>?
            </h2>
            <div ref={textRef}>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                TEDx is a program of local, self-organized events that bring people together 
                to share a TED-like experience. Our event is called TEDxIGDTUW, where x = 
                independently organized TED event.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                At TEDxIGDTUW, TED Talks video and live speakers combine to spark deep 
                discussion and connection. The TED Conference provides general guidance 
                for the TEDx program, but individual TEDx events are self-organized.
              </p>
            </div>
          </div>
          
          <div 
            ref={placeholderRef}
            className="h-96 border border-white/20 flex items-center justify-center relative overflow-hidden group cursor-hover"
          >
            <p className="text-white/40 text-sm relative z-10">3D Model Placeholder</p>
            <div className="absolute inset-0 border-2 border-ted-red/0 group-hover:border-ted-red/30 transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
