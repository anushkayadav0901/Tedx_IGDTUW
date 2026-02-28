// Device detection and performance utilities

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isLowEndDevice = () => {
  // Check for low-end device indicators
  const memory = navigator.deviceMemory; // GB
  const cores = navigator.hardwareConcurrency;
  
  if (memory && memory < 4) return true;
  if (cores && cores < 4) return true;
  if (isMobile()) return true;
  
  return false;
};

export const getAnimationConfig = () => {
  const reduced = prefersReducedMotion();
  const lowEnd = isLowEndDevice();
  const mobile = isMobile();
  
  return {
    enableHeavyAnimations: !reduced && !lowEnd && !mobile,
    enableParallax: !reduced && !lowEnd && !mobile,
    enableCustomCursor: !mobile && !isTouchDevice(),
    enableMagneticButtons: !mobile && !isTouchDevice(),
    enableSplitText: !lowEnd,
    lerpValue: lowEnd ? 0.05 : mobile ? 0.08 : 0.1,
    scrollMultiplier: mobile ? 1.5 : 1
  };
};
