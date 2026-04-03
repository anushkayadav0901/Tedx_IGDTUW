import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const objectives = [
  'Inspire ideas and innovation',
  'Encourage intellectual discussion',
  'Empower future leaders',
  'Promote holistic education',
];

const EventOverview = memo(() => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const detailsRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.75,
        ease: 'power3.out',
      })
        .from(
          detailsRef.current?.children || [],
          {
            opacity: 0,
            y: 28,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .from(
          listRef.current?.children || [],
          {
            opacity: 0,
            x: -16,
            stagger: 0.06,
            duration: 0.55,
            ease: 'power3.out',
          },
          '-=0.25',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="event-overview"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-4 sm:px-6 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2
          ref={titleRef}
          className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-8 md:mb-12 text-center px-2"
        >
          Event <span className="text-ted-red">Overview</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div
            ref={detailsRef}
            className="card-premium glass-panel-light p-5 sm:p-8 md:p-10 space-y-4 sm:space-y-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ted-red/90">
              Event details
            </h3>
            <dl className="space-y-3 sm:space-y-5">
              <div className="border-b border-white/10 pb-4 sm:pb-5">
                <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                  Edition
                </dt>
                <dd className="text-xl sm:text-2xl font-semibold text-white">
                  TEDxIGDTU 2026
                </dd>
              </div>
              <div className="border-b border-white/10 pb-4 sm:pb-5">
                <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                  Dates
                </dt>
                <dd className="text-base sm:text-lg text-white/90 leading-snug sm:leading-relaxed">
                  <span className="text-white font-medium">9 April</span>
                  <span className="text-white/70"> - Pre-event</span>
                  <br />
                  <span className="text-white font-medium">10 April</span>
                  <span className="text-white/70"> - Main event</span>
                </dd>
              </div>
              <div className="border-b border-white/10 pb-4 sm:pb-5">
                <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                  Venue
                </dt>
                <dd className="text-base sm:text-lg text-white/90">
                  IGDTUW Campus
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/50 mb-1">
                  Scale
                </dt>
                <dd className="text-base sm:text-lg text-white/90">
                  100+ attendees
                </dd>
              </div>
            </dl>
          </div>

          <div className="min-w-0 rounded-[var(--card-radius)] border border-white/10 px-5 py-6 sm:px-8 sm:py-10 glass-panel-light">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-ted-red/90 mb-4 sm:mb-6">
              Objectives
            </h3>
            <ul
              ref={listRef}
              className="space-y-3 sm:space-y-4"
            >
              {objectives.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 sm:gap-4 items-start text-base sm:text-lg text-white/85 leading-snug"
                >
                  <span
                    className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-ted-red shadow-[0_0_12px_rgba(255,0,0,0.35)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

EventOverview.displayName = 'EventOverview';

export default EventOverview;
