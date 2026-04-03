import React, { useEffect, useRef, memo, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Talks',
    description: 'Inspiring speakers sharing ideas worth spreading',
    icon: '💬'
  },
  {
    title: 'Performances',
    description: 'Live artistic expressions that move and inspire',
    icon: '🎭'
  },
  {
    title: 'Networking',
    description: 'Connect with innovators and changemakers',
    icon: '🤝'
  },
  {
    title: 'Workshops',
    description: 'Interactive sessions to learn and grow',
    icon: '⚡'
  }
];

const Experience = memo(({ config }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [selected, setSelected] = useState(() => new Set());
  const toggleCard = useCallback((index) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    if (!config.enableHeavyAnimations) {
      // Simple fade-in for mobile/low-end
      const ctx = gsap.context(() => {
        ScrollTrigger.batch(cardsRef.current, {
          start: 'top 85%',
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
      }, sectionRef);

      return () => ctx.revert();
    }

    // Horizontal scroll for desktop
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [config]);

  if (!config.enableHeavyAnimations) {
    // Grid layout for mobile
    return (
      <section
        id="experience"
        ref={sectionRef}
        className="scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto w-full min-w-0">
          <h2 className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-8 md:mb-12 text-center px-2">
            The <span className="text-ted-red">Experience</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="card-premium group cursor-hover min-w-0 p-5 md:p-10 text-center sm:text-left flex flex-col items-center sm:items-start"
              >
                <div className="text-4xl sm:text-6xl mb-6 sm:mb-8 grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-[250ms] ease-out">{exp.icon}</div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-ted-red lg:text-white lg:group-hover:text-ted-red transition-colors duration-[250ms] ease-out">{exp.title}</h3>
                <div className="w-16 h-0.5 bg-ted-red mb-6 transform origin-center sm:origin-left scale-x-100 lg:scale-x-0 lg:group-hover:scale-x-100 transition-transform duration-[250ms] ease-out"></div>
                <p className="text-white/70 leading-relaxed text-base sm:text-lg">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Horizontal scroll for desktop
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative h-screen min-h-[100dvh] border-t border-white/10 overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      <div className="sticky top-0 h-screen min-h-[100dvh] flex items-center">
        <div ref={containerRef} className="flex gap-6 lg:gap-8 px-4 sm:px-6 w-max max-w-none">
          <div className="min-w-[16rem] sm:min-w-[22rem] md:min-w-[26rem] max-w-[28rem] flex items-center justify-center shrink-0">
            <h2 className="text-[clamp(2rem,5vw+1rem,4.5rem)] font-bold text-center px-2">
              The <span className="text-ted-red">Experience</span>
            </h2>
          </div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="card-premium glass-panel-light group cursor-hover shrink-0 min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] p-8 sm:p-10 md:p-12 flex flex-col items-start"
            >
              <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-[250ms] ease-out">{exp.icon}</div>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-ted-red transition-colors duration-[250ms] ease-out">{exp.title}</h3>
              <div className="w-16 h-0.5 bg-ted-red mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[250ms] ease-out"></div>
              <p className="text-white/70 leading-relaxed text-base sm:text-lg">{exp.description}</p>
            </div>
          ))}

          <div className="min-w-[8rem] sm:min-w-[12rem] md:min-w-[16rem] shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;
