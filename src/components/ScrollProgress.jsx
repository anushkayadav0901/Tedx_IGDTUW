import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: 0.3
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === progress) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
