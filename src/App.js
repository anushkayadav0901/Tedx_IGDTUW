import React, { useEffect, useState, useMemo } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RedVelvetCurtainLoader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Theme from './components/Theme';
import EventOverview from './components/EventOverview';
import Speakers from './components/Speakers';
import Experience from './components/Experience';
import Timeline from './components/Timeline';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import FloatingWelcomeOrb from './components/FloatingWelcomeOrb';
import Team from './components/ui/team';

gsap.registerPlugin(ScrollTrigger);

const isMobileWidth = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;
const isTouchDevice = () =>
  typeof window !== 'undefined' && 'ontouchstart' in window;

function App() {
  const [loading, setLoading] = useState(true);
  const [mobile, setMobile] = useState(() => isMobileWidth());
  const [touch] = useState(isTouchDevice());

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  
  const config = useMemo(() => ({
    enableHeavyAnimations: !mobile,
    enableParallax: !mobile,
    enableCustomCursor: !mobile && !touch,
    enableMagneticButtons: !mobile && !touch,
    enableSplitText: !mobile,
    lerpValue: mobile ? 0.08 : 0.1,
    scrollMultiplier: mobile ? 1.5 : 1
  }), [mobile, touch]);

  useEffect(() => {
    // Don't initialize Lenis until loader completes
    if (loading) return;

    // Initialize Lenis with performance-tuned settings
    const lenis = new Lenis({
      lerp: config.lerpValue,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: config.scrollMultiplier,
      touchMultiplier: 2,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger (single rAF loop only - avoid double velocity / layout thrash)
    lenis.on('scroll', ScrollTrigger.update);

    // Magnetic button effect (only on desktop)
    if (config.enableMagneticButtons) {
      const setupMagneticButtons = () => {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(btn => {
          const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.3,
              ease: 'power2.out'
            });
          };

          const handleMouseLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.35,
              ease: 'power2.out'
            });
          };

          btn.addEventListener('mousemove', handleMouseMove);
          btn.addEventListener('mouseleave', handleMouseLeave);
        });
      };

      // Delay setup until after initial render
      setTimeout(setupMagneticButtons, 500);
    }

    return () => {
      lenis.destroy();
    };
  }, [config, loading]);

  return (
    <>
      {loading && <RedVelvetCurtainLoader onComplete={() => setLoading(false)} />}
      {config.enableCustomCursor && <CustomCursor />}
      {!loading && <Navbar />}
      <div
        className={`bg-pure-black min-h-screen w-full max-w-full overflow-x-hidden ${config.enableCustomCursor ? 'cursor-none' : ''}`}
      >
        <Hero config={config} />
        <About config={config} />
        <Theme config={config} />
        <EventOverview />
        <Speakers config={config} />
        <Experience config={config} />
        <Timeline config={config} />
        <Sponsors config={config} />
        <Team />
        <Footer />
      </div>
      {!loading && <FloatingWelcomeOrb />}
    </>
  );
}

export default App;
