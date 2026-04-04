import React, { useEffect, useRef, memo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import poornimaSeetharaman from '../assets/speakers/poornima-seetharaman.jpg';
import nehaSingh from '../assets/speakers/neha-singh.jpg';
import himankTripathi from '../assets/speakers/himank-tripathi.jpg';
import prachiPratap from '../assets/speakers/prachi-pratap.jpg';
import drVarunaSrinivasan from '../assets/speakers/dr-varuna-srinivasan.jpg';

gsap.registerPlugin(ScrollTrigger);

const pastSpeakers = [
  {
    role: 'Poornima Seetharaman',
    focus: 'A renowned TEDx speaker and the first Indian woman inducted into the Women in Games Hall of Fame. She is a leading game designer and founder of WIGIN, contributing significantly to the gaming industry.',
    image: poornimaSeetharaman
  },
  {
    role: 'Neha Singh',
    focus: 'Founder of Womoneysta, a women-centric personal finance platform. With 14+ years of experience, she empowers women to become financially independent and has built a strong community of 500+ members.',
    image: nehaSingh
  },
  {
    role: 'Himank Tripathi',
    focus: 'Former President of External Affairs and Investment Relations at EaseMyTrip. A communications expert with nearly two decades of experience in branding, marketing, and digital strategy.',
    image: himankTripathi
  },
  {
    role: 'Prachi Pratap',
    focus: 'An advocate at the Supreme Court of India and part of the American Bar Association. She actively promotes legal awareness and is known for her strong stance on law and justice.',
    image: prachiPratap
  },
  {
    role: 'Dr. Varuna Srinivasan',
    focus: 'A strong advocate for body positivity and inclusivity. She founded the TARA community and was featured in Vogue for celebrating women of courage.',
    image: drVarunaSrinivasan
  },
];

const Speakers = memo(({ config = { enableHeavyAnimations: true } }) => {
  const scrollContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const tiltRefs = useRef([]);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);
  
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [activeMobileCard, setActiveMobileCard] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      ScrollTrigger.batch(cardsRef.current, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.fromTo(batch, 
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              duration: 1,
              ease: 'power3.out'
            }
          );
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Only run intersection observer for mobile snap focus effect
    if (window.innerWidth >= 768) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const index = Number(entry.target.dataset.index);
          setActiveMobileCard(index);
        }
      });
    }, {
      root: scrollContainerRef.current,
      threshold: 0.6
    });

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e, tiltEl) => {
    if (!config.enableHeavyAnimations || !tiltEl) return;

    const rect = tiltEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    gsap.to(tiltEl, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (tiltEl) => {
    if (!config.enableHeavyAnimations || !tiltEl) return;

    gsap.to(tiltEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-0 sm:px-6 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-6 sm:mb-10 text-center px-4">
          Past <span className="text-ted-red">Speakers</span>
        </h2>
        <p className="text-center text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-10 md:mb-16 px-4">
          Voices spanning leadership, policy, alumni excellence, digital culture, and deep expertise - unified by ideas worth spreading.
        </p>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center space-x-3 text-white/40 mb-4 opacity-80">
          <svg className="w-4 h-4 animate-pulse relative -left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-medium">Swipe to explore</span>
          <svg className="w-4 h-4 animate-pulse relative -right-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory pt-4 pb-12 px-4 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-y-visible scrollbar-hide md:overflow-visible"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            }
          `}</style>

          {pastSpeakers.map((speaker, index) => {
            const isMobileActive = activeMobileCard === index;

            return (
              <article
                key={speaker.role}
                ref={(el) => { cardsRef.current[index] = el; }}
                data-index={index}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={`
                  group/card relative flex flex-col min-w-[75vw] sm:min-w-[50vw] md:min-w-0 snap-center
                  cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                  rounded-2xl bg-pure-black border border-white/5
                  active:scale-[0.97] md:active:scale-100 will-change-transform
                  
                  ${isMobileActive ? 'scale-100 opacity-100 shadow-[0_15px_40px_rgba(230,43,30,0.2)] border-ted-red/30 z-20 -translate-y-2' : 'scale-[0.93] opacity-60 z-10 translate-y-0 shadow-none'}
                  
                  md:scale-100 md:opacity-100 md:translate-y-0 md:shadow-none md:border-white/5 md:blur-0
                  
                  md:hover:-translate-y-4 md:hover:scale-[1.04] md:hover:shadow-[0_20px_50px_rgba(230,43,30,0.3)] md:hover:border-ted-red/40 md:hover:z-30
                  ${hoveredCardIndex !== null && hoveredCardIndex !== index ? 'md:!scale-[0.93] md:!opacity-40 md:!blur-[3px] md:!z-0' : ''}
                `}
              >
                <div
                  ref={(el) => { tiltRefs.current[index] = el; }}
                  className="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-t-2xl bg-[#0a0a0a]"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleMouseMove(e, tiltRefs.current[index])}
                  onMouseLeave={() => handleMouseLeave(tiltRefs.current[index])}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {speaker.image ? (
                      <img 
                        src={speaker.image} 
                        alt={speaker.role} 
                        className="w-full h-full object-cover object-center transition-transform duration-[850ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] md:group-hover/card:scale-[1.1] max-md:scale-105" 
                      />
                    ) : (
                      <p className="text-white/40 text-xs sm:text-sm relative z-[1] px-4 text-center">
                        Speaker visual - forthcoming
                      </p>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-pure-black via-pure-black/20 to-transparent opacity-90 transition-opacity duration-700 md:group-hover/card:opacity-60" />
                </div>
                
                <div className="relative px-5 py-6 md:px-7 md:py-8 flex flex-col flex-1 bg-pure-black rounded-b-2xl z-10 transition-colors duration-700 md:group-hover/card:bg-gradient-to-b md:group-hover/card:from-pure-black md:group-hover/card:to-[#140202]">
                  <h3 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold mb-2 text-white transition-colors duration-300 md:group-hover/card:text-ted-red">
                    {speaker.role}
                  </h3>
                  <div className="w-12 h-1 bg-ted-red mb-3 md:mb-4 rounded-full transform origin-left transition-transform duration-500 ease-out md:group-hover/card:scale-x-[1.8]" />
                  
                  <div className="
                    text-white/70 text-sm sm:text-base leading-relaxed
                    line-clamp-3 md:line-clamp-none
                    md:grid md:grid-rows-[0fr] md:opacity-0 md:group-hover/card:grid-rows-[1fr] md:group-hover/card:opacity-100 md:group-hover/card:mt-1
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                  ">
                    <div className="overflow-hidden">
                      <p className="md:translate-y-4 md:group-hover/card:translate-y-0 transition-transform duration-500 ease-out pb-1">{speaker.focus}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Speakers.displayName = 'Speakers';

export default Speakers;
