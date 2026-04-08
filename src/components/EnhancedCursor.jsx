import { useEffect, useRef } from 'react';

const EnhancedCursor = () => {
  const trailDotsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only run on desktop with fine pointer
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    // Create trail dots
    const dotCount = 8;
    const dots = [];

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      dot.style.transitionDelay = `${i * 0.03}s`;
      document.body.appendChild(dot);
      dots.push({
        element: dot,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0
      });
    }

    trailDotsRef.current = dots;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      dots.forEach((dot, index) => {
        // Each dot follows the previous one (or mouse for first dot)
        if (index === 0) {
          dot.targetX = mousePos.current.x;
          dot.targetY = mousePos.current.y;
        } else {
          dot.targetX = dots[index - 1].x;
          dot.targetY = dots[index - 1].y;
        }

        // Smooth lerp
        dot.x += (dot.targetX - dot.x) * 0.15;
        dot.y += (dot.targetY - dot.y) * 0.15;

        // Update position
        dot.element.style.transform = `translate(${dot.x - 2}px, ${dot.y - 2}px)`;
        
        // Fade based on distance from target
        const distance = Math.hypot(dot.targetX - dot.x, dot.targetY - dot.y);
        if (distance < 1) {
          dot.element.classList.add('active');
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      dots.forEach(dot => dot.element.remove());
    };
  }, []);

  return null;
};

export default EnhancedCursor;
