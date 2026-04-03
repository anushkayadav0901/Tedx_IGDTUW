import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = memo(() => {
  const footerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(footerRef.current.children, {
        start: 'top 90%',
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
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
    <footer ref={sectionRef} className="border-t border-white/10 py-10 md:py-16 px-4 sm:px-6">
      <div ref={footerRef} className="max-w-7xl mx-auto w-full min-w-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-8 md:gap-6 mb-6 sm:mb-12 text-center md:text-left">
          <div className="md:mb-0 w-full md:w-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              TEDx<span className="text-ted-red">IGDTU</span>
            </h3>
            <p className="text-white/60">Beyond Barriers: Who Shapes the Future?</p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-5 sm:gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ted-red transition-colors text-2xl cursor-hover">
              <span>𝕏</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ted-red transition-colors text-2xl cursor-hover">
              <span>in</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ted-red transition-colors text-2xl cursor-hover">
              <span>IG</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-ted-red transition-colors text-2xl cursor-hover">
              <span>YT</span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            This independent TEDx event is operated under license from TED. TED is a nonprofit
            organization devoted to Ideas Worth Spreading, usually in the form of short, powerful
            talks (18 minutes or fewer) delivered by today's leading thinkers and doers.
          </p>
          <p className="text-white/40 text-sm">
            © 2026 TEDxIGDTU. Organized by students of Indira Gandhi Delhi Technical University for Women.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
