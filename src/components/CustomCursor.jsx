import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';

const CustomCursor = memo(() => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      gsap.to(cursorRingRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      gsap.to(cursorRingRef.current, {
        scale: 1.5,
        borderColor: '#E50914',
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      gsap.to(cursorRingRef.current, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Use event delegation for better performance
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target && (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-hover')
      )) {
        handleMouseEnter();
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target && (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-hover')
      )) {
        handleMouseLeave();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorRingRef}
        className="fixed w-8 h-8 border rounded-full pointer-events-none z-[9999] transition-colors duration-300"
        style={{ 
          transform: 'translate(-50%, -50%)',
          borderColor: 'rgba(255, 255, 255, 0.5)'
        }}
      />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';

export default CustomCursor;
