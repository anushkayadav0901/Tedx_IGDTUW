import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const speakersData = [
  { name: 'Speaker Name', title: 'Innovator & Entrepreneur', image: null },
  { name: 'Speaker Name', title: 'Social Activist', image: null },
  { name: 'Speaker Name', title: 'Tech Pioneer', image: null },
  { name: 'Speaker Name', title: 'Artist & Creator', image: null },
  { name: 'Speaker Name', title: 'Researcher', image: null },
  { name: 'Speaker Name', title: 'Changemaker', image: null },
];

const Speakers = memo(({ config }) => {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
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

      // Batch card animations for better performance
      ScrollTrigger.batch(cardsRef.current, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 60,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, card) => {
    if (!config.enableHeavyAnimations) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (card) => {
    if (!config.enableHeavyAnimations) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-bold mb-16 text-center">
          Our <span className="text-ted-red">Speakers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakersData.map((speaker, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group cursor-hover"
              onMouseMove={(e) => handleMouseMove(e, cardsRef.current[index])}
              onMouseLeave={() => handleMouseLeave(cardsRef.current[index])}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative bg-pure-black border border-white/20 h-80 mb-4 flex items-center justify-center overflow-hidden group-hover:border-ted-red transition-colors duration-500">
                <p className="text-white/40 text-sm">Speaker Photo</p>
                <div className="absolute inset-0 bg-ted-red/0 group-hover:bg-ted-red/5 transition-colors duration-500"></div>
              </div>
              <div className="overflow-hidden">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-ted-red transition-all duration-300 transform group-hover:-translate-y-1">
                  {speaker.name}
                </h3>
              </div>
              <div className="w-12 h-0.5 bg-ted-red mb-2 transform origin-left group-hover:scale-x-[2.5] transition-transform duration-500"></div>
              <p className="text-white/70">{speaker.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Speakers.displayName = 'Speakers';

export default Speakers;
