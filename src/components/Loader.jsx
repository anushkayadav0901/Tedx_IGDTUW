import React, { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';

const RedVelvetCurtainLoader = memo(({ onComplete }) => {
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const loaderRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    // Lock scroll during loader
    document.body.style.overflow = 'hidden';

    // Wait a brief moment to ensure everything is loaded
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Restore scroll
          document.body.style.overflow = '';
          
          // Clean exit
          if (loaderRef.current) {
            loaderRef.current.style.pointerEvents = 'none';
          }
          
          if (onComplete) {
            onComplete();
          }
        }
      });

      // Fade in shadow as curtains start to open
      tl.to(shadowRef.current, {
        opacity: 0.5,
        duration: 0.6,
        ease: 'power2.out'
      })
      // Split curtains with soft cloth motion
      .to(leftCurtainRef.current, {
        x: '-100%',
        scaleX: 0.97,
        skewX: -0.8,
        duration: 1.6,
        ease: 'power4.inOut'
      }, '-=0.3')
      .to(rightCurtainRef.current, {
        x: '100%',
        scaleX: 0.97,
        skewX: 0.8,
        duration: 1.6,
        ease: 'power4.inOut'
      }, '-=1.6')
      // Reset scale and skew for natural settle
      .to([leftCurtainRef.current, rightCurtainRef.current], {
        scaleX: 1,
        skewX: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.7)'
      }, '-=0.5')
      // Fade out shadow
      .to(shadowRef.current, {
        opacity: 0,
        duration: 0.6
      }, '-=0.7')
      // Fade out entire loader
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
        }
      });
    }, 400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'all',
        backgroundColor: '#000000',
        overflow: 'hidden'
      }}
    >
      {/* Shadow cast on background */}
      <div
        ref={shadowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 100%)',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Left Red Velvet Curtain */}
      <svg
        ref={leftCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '51%',
          height: '100%',
          willChange: 'transform',
          transformOrigin: 'right center',
          filter: 'drop-shadow(8px 0 20px rgba(0,0,0,0.6))'
        }}
        viewBox="0 0 510 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Base velvet gradient - deep red with shadows */}
          <linearGradient id="leftVelvetBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a0000" />
            <stop offset="8%" stopColor="#8a0000" />
            <stop offset="16%" stopColor="#6a0000" />
            <stop offset="24%" stopColor="#9a0000" />
            <stop offset="32%" stopColor="#7a0000" />
            <stop offset="40%" stopColor="#a50000" />
            <stop offset="48%" stopColor="#8a0000" />
            <stop offset="56%" stopColor="#b30000" />
            <stop offset="64%" stopColor="#8a0000" />
            <stop offset="72%" stopColor="#a50000" />
            <stop offset="80%" stopColor="#7a0000" />
            <stop offset="88%" stopColor="#9a0000" />
            <stop offset="96%" stopColor="#6a0000" />
            <stop offset="100%" stopColor="#5a0000" />
          </linearGradient>
          
          {/* Vertical lighting for depth */}
          <linearGradient id="leftVerticalLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a0000" stopOpacity="0.7" />
            <stop offset="15%" stopColor="#5a0000" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#b30000" stopOpacity="0" />
            <stop offset="85%" stopColor="#5a0000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3a0000" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Fabric wrinkle highlights */}
          <linearGradient id="leftWrinkles" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="6%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="12%" stopColor="rgba(255,255,255,0)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="24%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="36%" stopColor="rgba(255,255,255,0)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="48%" stopColor="rgba(255,255,255,0)" />
            <stop offset="54%" stopColor="rgba(255,255,255,0.09)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
            <stop offset="66%" stopColor="rgba(255,255,255,0.13)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0)" />
            <stop offset="78%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="84%" stopColor="rgba(255,255,255,0)" />
            <stop offset="90%" stopColor="rgba(255,255,255,0.11)" />
            <stop offset="96%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          
          {/* Stage light sheen */}
          <radialGradient id="leftSheen" cx="70%" cy="40%">
            <stop offset="0%" stopColor="rgba(255,42,42,0.3)" />
            <stop offset="40%" stopColor="rgba(255,42,42,0.1)" />
            <stop offset="100%" stopColor="rgba(255,42,42,0)" />
          </radialGradient>
          
          {/* Inner fold shadow */}
          <linearGradient id="leftFoldShadow" x1="100%" y1="0%" x2="85%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          
          {/* Top drape shadow */}
          <linearGradient id="leftTopShadow" x1="0%" y1="0%" x2="0%" y2="15%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        
        {/* Main curtain shape with curved drapes */}
        <path
          d="M 0,0 
             Q 75,35 125,0 
             Q 175,32 225,0 
             Q 275,38 325,0 
             Q 375,30 425,0 
             Q 475,36 510,0 
             L 508,1000 
             Q 475,992 425,1000 
             Q 375,988 325,1000 
             Q 275,994 225,1000 
             Q 175,990 125,1000 
             Q 75,996 25,1000 
             L 0,1000 Z"
          fill="url(#leftVelvetBase)"
        />
        
        {/* Vertical lighting overlay */}
        <path
          d="M 0,0 
             Q 75,35 125,0 
             Q 175,32 225,0 
             Q 275,38 325,0 
             Q 375,30 425,0 
             Q 475,36 510,0 
             L 508,1000 
             Q 475,992 425,1000 
             Q 375,988 325,1000 
             Q 275,994 225,1000 
             Q 175,990 125,1000 
             Q 75,996 25,1000 
             L 0,1000 Z"
          fill="url(#leftVerticalLight)"
        />
        
        {/* Fabric wrinkle highlights */}
        <path
          d="M 0,0 
             Q 75,35 125,0 
             Q 175,32 225,0 
             Q 275,38 325,0 
             Q 375,30 425,0 
             Q 475,36 510,0 
             L 508,1000 
             Q 475,992 425,1000 
             Q 375,988 325,1000 
             Q 275,994 225,1000 
             Q 175,990 125,1000 
             Q 75,996 25,1000 
             L 0,1000 Z"
          fill="url(#leftWrinkles)"
        />
        
        {/* Stage light sheen */}
        <path
          d="M 0,0 
             Q 75,35 125,0 
             Q 175,32 225,0 
             Q 275,38 325,0 
             Q 375,30 425,0 
             Q 475,36 510,0 
             L 508,1000 
             Q 475,992 425,1000 
             Q 375,988 325,1000 
             Q 275,994 225,1000 
             Q 175,990 125,1000 
             Q 75,996 25,1000 
             L 0,1000 Z"
          fill="url(#leftSheen)"
        />
        
        {/* Inner fold shadow on right edge */}
        <rect x="460" y="0" width="50" height="1000" fill="url(#leftFoldShadow)" />
        
        {/* Top drape shadow */}
        <rect x="0" y="0" width="510" height="150" fill="url(#leftTopShadow)" />
      </svg>

      {/* Right Red Velvet Curtain */}
      <svg
        ref={rightCurtainRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '51%',
          height: '100%',
          willChange: 'transform',
          transformOrigin: 'left center',
          filter: 'drop-shadow(-8px 0 20px rgba(0,0,0,0.6))'
        }}
        viewBox="0 0 510 1000"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Base velvet gradient - deep red with shadows (mirrored pattern) */}
          <linearGradient id="rightVelvetBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a0000" />
            <stop offset="4%" stopColor="#6a0000" />
            <stop offset="12%" stopColor="#9a0000" />
            <stop offset="20%" stopColor="#7a0000" />
            <stop offset="28%" stopColor="#a50000" />
            <stop offset="36%" stopColor="#8a0000" />
            <stop offset="44%" stopColor="#b30000" />
            <stop offset="52%" stopColor="#8a0000" />
            <stop offset="60%" stopColor="#a50000" />
            <stop offset="68%" stopColor="#7a0000" />
            <stop offset="76%" stopColor="#9a0000" />
            <stop offset="84%" stopColor="#6a0000" />
            <stop offset="92%" stopColor="#8a0000" />
            <stop offset="100%" stopColor="#5a0000" />
          </linearGradient>
          
          {/* Vertical lighting for depth */}
          <linearGradient id="rightVerticalLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3a0000" stopOpacity="0.7" />
            <stop offset="15%" stopColor="#5a0000" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#b30000" stopOpacity="0" />
            <stop offset="85%" stopColor="#5a0000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3a0000" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Fabric wrinkle highlights (different pattern) */}
          <linearGradient id="rightWrinkles" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="7%" stopColor="rgba(255,255,255,0)" />
            <stop offset="14%" stopColor="rgba(255,255,255,0.11)" />
            <stop offset="21%" stopColor="rgba(255,255,255,0)" />
            <stop offset="28%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="49%" stopColor="rgba(255,255,255,0)" />
            <stop offset="56%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="63%" stopColor="rgba(255,255,255,0)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="77%" stopColor="rgba(255,255,255,0)" />
            <stop offset="84%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="91%" stopColor="rgba(255,255,255,0)" />
            <stop offset="98%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          
          {/* Stage light sheen */}
          <radialGradient id="rightSheen" cx="30%" cy="40%">
            <stop offset="0%" stopColor="rgba(255,42,42,0.3)" />
            <stop offset="40%" stopColor="rgba(255,42,42,0.1)" />
            <stop offset="100%" stopColor="rgba(255,42,42,0)" />
          </radialGradient>
          
          {/* Inner fold shadow */}
          <linearGradient id="rightFoldShadow" x1="0%" y1="0%" x2="15%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
          
          {/* Top drape shadow */}
          <linearGradient id="rightTopShadow" x1="0%" y1="0%" x2="0%" y2="15%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        
        {/* Main curtain shape with curved drapes (mirrored) */}
        <path
          d="M 510,0 
             Q 435,33 385,0 
             Q 335,36 285,0 
             Q 235,31 185,0 
             Q 135,37 85,0 
             Q 35,34 0,0 
             L 2,1000 
             Q 35,991 85,1000 
             Q 135,995 185,1000 
             Q 235,989 285,1000 
             Q 335,993 385,1000 
             Q 435,997 485,1000 
             L 510,1000 Z"
          fill="url(#rightVelvetBase)"
        />
        
        {/* Vertical lighting overlay */}
        <path
          d="M 510,0 
             Q 435,33 385,0 
             Q 335,36 285,0 
             Q 235,31 185,0 
             Q 135,37 85,0 
             Q 35,34 0,0 
             L 2,1000 
             Q 35,991 85,1000 
             Q 135,995 185,1000 
             Q 235,989 285,1000 
             Q 335,993 385,1000 
             Q 435,997 485,1000 
             L 510,1000 Z"
          fill="url(#rightVerticalLight)"
        />
        
        {/* Fabric wrinkle highlights */}
        <path
          d="M 510,0 
             Q 435,33 385,0 
             Q 335,36 285,0 
             Q 235,31 185,0 
             Q 135,37 85,0 
             Q 35,34 0,0 
             L 2,1000 
             Q 35,991 85,1000 
             Q 135,995 185,1000 
             Q 235,989 285,1000 
             Q 335,993 385,1000 
             Q 435,997 485,1000 
             L 510,1000 Z"
          fill="url(#rightWrinkles)"
        />
        
        {/* Stage light sheen */}
        <path
          d="M 510,0 
             Q 435,33 385,0 
             Q 335,36 285,0 
             Q 235,31 185,0 
             Q 135,37 85,0 
             Q 35,34 0,0 
             L 2,1000 
             Q 35,991 85,1000 
             Q 135,995 185,1000 
             Q 235,989 285,1000 
             Q 335,993 385,1000 
             Q 435,997 485,1000 
             L 510,1000 Z"
          fill="url(#rightSheen)"
        />
        
        {/* Inner fold shadow on left edge */}
        <rect x="0" y="0" width="50" height="1000" fill="url(#rightFoldShadow)" />
        
        {/* Top drape shadow */}
        <rect x="0" y="0" width="510" height="150" fill="url(#rightTopShadow)" />
      </svg>
    </div>
  );
});

RedVelvetCurtainLoader.displayName = 'RedVelvetCurtainLoader';

export default RedVelvetCurtainLoader;
