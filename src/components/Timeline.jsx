import React, { useEffect, useRef, memo, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import timelineBgVideo from '../assets/Timeline-bg-video.mp4';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    date: 'March 15, 2026',
    title: 'Speaker Applications Open',
    description: 'Submit your idea worth spreading'
  },
  {
    date: 'March 25, 2026',
    title: 'Early Bird Registration',
    description: 'Get your tickets at special rates'
  },
  {
    date: 'April 9, 2026',
    title: 'Pre-Event',
    description: 'Opening activities'
  },
  {
    date: 'April 10, 2026',
    title: 'Main Event',
    description: 'TEDx conference'
  }
];

const Timeline = memo(() => {
  const titleRef = useRef(null);
  const itemsRef = useRef([]);
  const lineRef = useRef(null);
  const sectionRef = useRef(null);
  const [selected, setSelected] = useState(() => new Set());
  const toggleItem = useCallback((index) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

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

      // Timeline line draw
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
          end: 'bottom 30%',
          scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top'
      });

      // Batch timeline items
      ScrollTrigger.batch(itemsRef.current, {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            x: (i) => i % 2 === 0 ? -50 : 50,
            stagger: 0.15,
            duration: 0.8,
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
      id="timeline"
      ref={sectionRef}
      className="relative overflow-hidden scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-white/10"
    >
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover brightness-[0.5] contrast-[0.8] saturate-[0.6] blur-[2px] z-0 pointer-events-none">
        <source src={timelineBgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

      <div className="relative z-20">
        <div className="max-w-4xl mx-auto w-full min-w-0">
          <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-8 md:mb-12 text-center px-2">
            Event <span className="text-ted-red">Timeline</span>
          </h2>

          <div className="relative pl-0 md:pl-0">
            <div
              ref={lineRef}
              className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-white/20 md:-translate-x-1/2"
            />

            {timelineData.map((item, index) => (
              <div
                key={index}
                ref={el => itemsRef.current[index] = el}
                className={`relative mb-8 md:mb-16 last:mb-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'
                  } md:w-1/2 cursor-hover group`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-ted-red rounded-full border-4 border-pure-black md:group-hover:scale-150 transition-transform duration-300 left-[7px] -translate-x-1/2 md:translate-x-0 ${index % 2 === 0 ? 'md:left-auto md:right-[-9px]' : 'md:left-[-9px] md:right-auto'
                    }`}
                />

                <div className="pl-8 md:pl-0 min-w-0">
                  <div className="card-premium group cursor-hover p-4 sm:p-6 text-left md:text-inherit">
                    <p className="text-ted-red font-medium mb-1 sm:mb-2 text-sm sm:text-base">{item.date}</p>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-ted-red lg:text-white lg:group-hover:text-ted-red transition-colors duration-[250ms] ease-out break-words">{item.title}</h3>
                    <p className="text-white/70 text-sm sm:text-base">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
