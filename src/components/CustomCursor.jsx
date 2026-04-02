import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';

const CustomCursor = memo(() => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorGlowRef = useRef(null);
  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      gsap.to(cursorRingRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(cursorGlowRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.52,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursorRingRef.current, {
        scale: 1.5,
        borderColor: '#ff0000',
        duration: 0.3,
      });
      gsap.to(cursorGlowRef.current, {
        opacity: 0.65,
        scale: 1.06,
        duration: 0.35,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRingRef.current, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3,
      });
      gsap.to(cursorGlowRef.current, {
        opacity: 0.42,
        scale: 1,
        duration: 0.4,
      });
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.classList.contains('cursor-hover'))
      ) {
        handleMouseEnter();
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.classList.contains('cursor-hover'))
      ) {
        handleMouseLeave();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    gsap.set(cursorGlowRef.current, {
      opacity: 0.42,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorGlowRef}
        className="cursor-glow-blob pointer-events-none fixed left-0 top-0 z-[9998] h-28 w-28 rounded-full mix-blend-screen"
        aria-hidden
      />
      <div
        ref={cursorDotRef}
        className="fixed z-[9999] h-2 w-2 rounded-full bg-white mix-blend-difference pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorRingRef}
        className="fixed z-[9999] h-8 w-8 rounded-full border pointer-events-none transition-colors duration-300"
        style={{
          transform: 'translate(-50%, -50%)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
        }}
      />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
