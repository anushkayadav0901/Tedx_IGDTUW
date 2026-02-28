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
    <section ref={sectionRef} className="py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-16 text-center">
          Our <span className="text-ted-red">Partners</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="border border-white/20 h-32 flex items-center justify-center grayscale hover:grayscale-0 hover:border-ted-red transition-all cursor-hover group"
            >
              <p className="text-white/40 text-sm group-hover:text-white/80 transition-colors">{sponsor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';

export default Sponsors;
