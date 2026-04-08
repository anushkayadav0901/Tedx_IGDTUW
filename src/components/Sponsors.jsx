import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import s1 from '../assets/4700BC.jpeg';
import s2 from '../assets/MCD.avif';
import s3 from '../assets/Piclelo.avif';
import s4 from '../assets/TCP.png';
import s5 from '../assets/champion.png';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  { name: '4700BC', image: s1 },
  { name: 'MCD', image: s2 },
  { name: 'Piclelo', image: s3 },
  { name: 'TCP', image: s4 },
  { name: 'Champion', image: s5 },
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
      className="scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-8 md:mb-12 text-center px-2">
          Our <span className="text-ted-red">Partners</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.name}
              ref={el => cardsRef.current[index] = el}
              className="card-premium group cursor-hover min-h-[10rem] sm:min-h-[12rem] md:min-h-[14rem] py-6 sm:py-8 px-6 sm:px-8 flex items-center justify-center grayscale-0 lg:grayscale lg:hover:grayscale-0 hover:scale-[1.02] transition-all duration-300 ease-out"
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                loading="eager"
                onError={(e) => {
                  console.error(`Failed to load image for ${sponsor.name}:`, e.target.src);
                  e.target.style.border = '2px solid red';
                }}
                className="w-full h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-110"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';

export default Sponsors;
