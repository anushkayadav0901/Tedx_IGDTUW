// Card 3D tilt effect utility
export const initCardTilt = (element) => {
  if (!element) return;

  // Only on desktop with fine pointer
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isDesktop) return;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    element.style.setProperty('--tilt-x', `${rotateX}deg`);
    element.style.setProperty('--tilt-y', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
  };

  element.addEventListener('mousemove', handleMouseMove, { passive: true });
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
