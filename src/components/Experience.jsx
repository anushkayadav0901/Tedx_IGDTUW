import React, { useEffect, useRef, memo } from 'react';
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
      <section ref={sectionRef} className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
            The <span className="text-ted-red">Experience</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="border border-white/20 p-12 hover:border-ted-red transition-colors cursor-hover group"
              >
                <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">{exp.icon}</div>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-ted-red transition-colors">{exp.title}</h3>
                <div className="w-16 h-0.5 bg-ted-red mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <p className="text-white/70 leading-relaxed text-lg">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Horizontal scroll for desktop
  return (
    <section ref={sectionRef} className="relative h-screen border-t border-white/10 overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center">
        <div ref={containerRef} className="flex gap-8 px-6">
          <div className="min-w-[50vw] flex items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-bold">
              The <span className="text-ted-red">Experience</span>
            </h2>
          </div>
          
          {experiences.map((exp, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="min-w-[400px] border border-white/20 p-12 hover:border-ted-red transition-colors cursor-hover group"
            >
              <div className="text-6xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500">{exp.icon}</div>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-ted-red transition-colors">{exp.title}</h3>
              <div className="w-16 h-0.5 bg-ted-red mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <p className="text-white/70 leading-relaxed text-lg">{exp.description}</p>
            </div>
          ))}
          
          <div className="min-w-[50vw]"></div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;
