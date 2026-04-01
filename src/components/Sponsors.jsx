import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  { name: 'Sponsor 1', tier: 'platinum' },
  { name: 'Sponsor 2', tier: 'platinum' },
  { name: 'Sponsor 3', tier: 'gold' },
  { name: 'Sponsor 4', tier: 'gold' },
  { name: 'Sponsor 5', tier: 'silver' },
  { name: 'Sponsor 6', tier: 'silver' },
];

const Sponsors = memo(() => {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Batch cards animation
      ScrollTrigger.batch(cardsRef.current, {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            scale: 0.9,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out'
          });
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 py-20 sm:py-28 md:py-32 px-4 sm:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-10 sm:mb-14 md:mb-16 text-center px-2">
          Our <span className="text-ted-red">Partners</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="card-premium group cursor-hover min-h-[7rem] sm:h-32 py-6 px-3 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-[250ms] ease-out"
            >
              <p className="text-white/40 text-sm group-hover:text-white/90 transition-colors duration-[250ms] ease-out">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';

export default Sponsors;
