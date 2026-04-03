import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const distinguishedSpeakers = [
  {
    role: 'Chief Minister',
    focus: 'Governance, policy, and long-term sustainability.',
  },
  {
    role: 'IRS Chief Commissioner',
    focus: 'Fiscal policy, compliance, and transparent institutions.',
  },
  {
    role: 'Alumni Speaker',
    focus: 'An IGDTU alumna story - leadership, grit, and growth.',
  },
  {
    role: 'Social Media Influencer',
    focus: 'Digital impact and an authentic modern voice.',
  },
  {
    role: 'Topic Expert',
    focus: 'Emerging tech and global challenges, made tangible.',
  },
];

const Speakers = memo(({ config }) => {
  const cardsRef = useRef([]);
  const tiltRefs = useRef([]);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

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
      className="scroll-mt-24 md:scroll-mt-28 py-20 sm:py-28 md:py-32 px-4 sm:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-4 sm:mb-6 text-center px-2">
          Distinguished <span className="text-ted-red">Speakers</span>
        </h2>
        <p className="text-center text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2">
          Voices spanning leadership, policy, alumni excellence, digital culture, and deep expertise - unified by ideas worth spreading.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {distinguishedSpeakers.map((speaker, index) => (
            <article
              key={speaker.role}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="speaker-card group cursor-hover flex flex-col min-w-0"
            >
              <div
                ref={(el) => {
                  tiltRefs.current[index] = el;
                }}
                className="speaker-card-tilt relative h-52 sm:h-64 lg:h-72 overflow-hidden bg-pure-black"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => handleMouseMove(e, tiltRefs.current[index])}
                onMouseLeave={() => handleMouseLeave(tiltRefs.current[index])}
              >
                <div className="speaker-card-media-inner absolute inset-0 flex items-center justify-center">
                  <p className="text-white/40 text-xs sm:text-sm relative z-[1] px-4 text-center">
                    Speaker visual - forthcoming
                  </p>
                </div>
                <div className="speaker-card-media-fade" aria-hidden />
              </div>
              <div className="px-5 py-5 sm:px-6 sm:py-6 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-ted-red transition-colors duration-[250ms] ease-out">
                  {speaker.role}
                </h3>
                <div className="w-12 h-0.5 bg-ted-red mb-3 transform origin-left scale-x-100 group-hover:scale-x-[1.15] transition-transform duration-[250ms] ease-out" />
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">{speaker.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

Speakers.displayName = 'Speakers';

export default Speakers;
