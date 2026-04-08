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
      className="scroll-mt-24 md:scroll-mt-28 py-16 md:py-24 lg:py-32 px-4 sm:px-6 border-t border-white/10 bg-gradient-to-b from-pure-black via-pure-black to-pure-black/95"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-4 text-center px-2 animate-text-glow">
          Our <span className="text-ted-red drop-shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-text-glow-red">Partners</span>
        </h2>
        <p className="text-center text-white/60 mb-12 md:mb-16 text-sm sm:text-base">
          Built with incredible partners
        </p>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-2">
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.name}
              ref={el => cardsRef.current[index] = el}
              className="group relative"
              style={{
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 p-5 sm:p-6 md:p-7 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 ease-out group-hover:bg-white/10 group-hover:border-white/30 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(229,9,20,0.3)]">
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  loading="eager"
                  className="w-full h-full object-contain filter brightness-110 contrast-110 saturate-150 transition-all duration-500 group-hover:brightness-125 group-hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';

export default Sponsors;
