import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import retroImage from '../assets/campus-retro.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = memo(({ config }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section
      id="about"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-16 items-center">
          <div className="min-w-0">
            <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              What is <span className="text-ted-red">TEDx</span>?
            </h2>
            <div ref={textRef}>
              <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
                TEDx carries forward TED's mission of{' '}
                <span className="text-white font-medium">ideas worth spreading</span>
                - short, powerful talks that spark curiosity and conversation.
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed">
                TEDxIGDTU is a <span className="text-white font-medium">community-driven</span>{' '}
                gathering on campus: independent, locally organised, and designed to connect our
                audience with voices that matter.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-snug sm:leading-relaxed">
                Together we bridge the <span className="text-white font-medium">global TED ethos</span>{' '}
                with <span className="text-white font-medium">local stories</span> - ideas that travel
                the world, rooted in our own backyard.
              </p>
            </div>
          </div>

          <div
            ref={placeholderRef}
            className="card-premium group cursor-hover w-full max-w-full relative overflow-hidden"
          >
            <img src={retroImage} className="block w-full h-auto object-cover" alt="TEDx Image" />
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
