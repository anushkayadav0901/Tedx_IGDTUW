import React, { useEffect, useRef, memo, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import poornimaSeetharaman from '../assets/speakers/poornima-seetharaman.jpg';
import nehaSingh from '../assets/speakers/neha-singh.jpg';
import himankTripathi from '../assets/speakers/himank-tripathi.jpg';
import prachiPratap from '../assets/speakers/prachi-pratap.jpg';
import drVarunaSrinivasan from '../assets/speakers/dr-varuna-srinivasan.jpg';

gsap.registerPlugin(ScrollTrigger);

const pastSpeakers = [
  {
    role: 'Poornima Seetharaman',
    focus: 'A renowned TEDx speaker and the first Indian woman inducted into the Women in Games Hall of Fame. She is a leading game designer and founder of WIGIN, contributing significantly to the gaming industry.',
    image: poornimaSeetharaman
  },
  {
    role: 'Neha Singh',
    focus: 'Founder of Womoneysta, a women-centric personal finance platform. With 14+ years of experience, she empowers women to become financially independent and has built a strong community of 500+ members.',
    image: nehaSingh
  },
  {
    role: 'Himank Tripathi',
    focus: 'Former President of External Affairs and Investment Relations at EaseMyTrip. A communications expert with nearly two decades of experience in branding, marketing, and digital strategy.',
    image: himankTripathi
  },
  {
    role: 'Prachi Pratap',
    focus: 'An advocate at the Supreme Court of India and part of the American Bar Association. She actively promotes legal awareness and is known for her strong stance on law and justice.',
    image: prachiPratap
  },
  {
    role: 'Dr. Varuna Srinivasan',
    focus: 'A strong advocate for body positivity and inclusivity. She founded the TARA community and was featured in Vogue for celebrating women of courage.',
    image: drVarunaSrinivasan
  },
];

/* ── Card position config for the deck stack ── */
const getCardStyle = (offset, total) => {
  // offset: how far behind the front card (0 = front)
  // Positive offsets go right-and-back, negative go left-and-back
  const absOffset = Math.abs(offset);
  const sign = offset >= 0 ? 1 : -1;

  if (absOffset === 0) {
    return {
      scale: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 50,
    };
  }

  // Cards behind fan out with diminishing offsets
  const configs = [
    null, // index 0 handled above
    { scale: 0.92, x: 55 * sign, y: 10, rotateY: -4 * sign, rotateZ: 1.5 * sign, opacity: 0.55, blur: 1.5, z: 40 },
    { scale: 0.85, x: 100 * sign, y: 18, rotateY: -7 * sign, rotateZ: 2.5 * sign, opacity: 0.35, blur: 3, z: 30 },
  ];

  if (absOffset <= 2) {
    const c = configs[absOffset];
    return {
      scale: c.scale,
      x: c.x,
      y: c.y,
      rotateY: c.rotateY,
      rotateZ: c.rotateZ,
      opacity: c.opacity,
      filter: `blur(${c.blur}px)`,
      zIndex: c.z,
    };
  }

  // Further back cards (hidden)
  return {
    scale: 0.78,
    x: 130 * sign,
    y: 24,
    rotateY: -9 * sign,
    rotateZ: 3 * sign,
    opacity: 0,
    filter: 'blur(6px)',
    zIndex: 10,
  };
};

/* ── Compute visible offset for each card relative to active ── */
const getOffset = (index, activeIndex, total) => {
  let diff = index - activeIndex;
  // Wrap around for infinite feel
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
};

const Speakers = memo(({ config = { enableHeavyAnimations: true } }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const deckRef = useRef(null);
  const cardRefs = useRef([]);
  const touchRef = useRef({ startX: 0, startY: 0, active: false });
  const autoPlayRef = useRef(null);

  const total = pastSpeakers.length;

  // ── Navigate to next/prev card with GSAP animation ──
  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentCard = cardRefs.current[activeIndex];
    const nextIndex = direction === 'right'
      ? (activeIndex + 1) % total
      : (activeIndex - 1 + total) % total;

    const exitX = direction === 'right' ? -500 : 500;
    const exitRotateY = direction === 'right' ? 20 : -20;

    // Animate the current front card out
    if (currentCard) {
      gsap.to(currentCard, {
        x: exitX,
        rotateY: exitRotateY,
        rotateZ: direction === 'right' ? -5 : 5,
        scale: 0.8,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          // After exit animation, snap the card to its new stack position
          setActiveIndex(nextIndex);

          // Reset the exited card position instantly (it's now in the back)
          requestAnimationFrame(() => {
            const offset = getOffset(activeIndex, nextIndex, total);
            const style = getCardStyle(offset, total);
            gsap.set(currentCard, {
              x: style.x,
              y: style.y,
              scale: style.scale,
              rotateY: style.rotateY,
              rotateZ: style.rotateZ,
              opacity: style.opacity,
              filter: style.filter,
              zIndex: style.zIndex,
            });

            // Animate all cards to their new positions
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              const off = getOffset(i, nextIndex, total);
              const s = getCardStyle(off, total);
              gsap.to(card, {
                x: s.x,
                y: s.y,
                scale: s.scale,
                rotateY: s.rotateY,
                rotateZ: s.rotateZ,
                opacity: s.opacity,
                filter: s.filter,
                zIndex: s.zIndex,
                duration: 0.5,
                ease: 'power3.out',
                overwrite: 'auto',
              });
            });

            setTimeout(() => setIsAnimating(false), 500);
          });
        }
      });
    }
  }, [activeIndex, isAnimating, total]);

  // ── Jump to a specific card (dot click) ──
  const jumpTo = useCallback((targetIndex) => {
    if (isAnimating || targetIndex === activeIndex) return;
    const direction = targetIndex > activeIndex ? 'right' : 'left';
    setIsAnimating(true);

    setActiveIndex(targetIndex);

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const off = getOffset(i, targetIndex, total);
      const s = getCardStyle(off, total);
      gsap.to(card, {
        x: s.x,
        y: s.y,
        scale: s.scale,
        rotateY: s.rotateY,
        rotateZ: s.rotateZ,
        opacity: s.opacity,
        filter: s.filter,
        zIndex: s.zIndex,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });

    setTimeout(() => setIsAnimating(false), 600);
  }, [activeIndex, isAnimating, total]);

  // ── Title entrance animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Entrance: animate the deck in
      if (deckRef.current) {
        gsap.from(deckRef.current, {
          scrollTrigger: {
            trigger: deckRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Set initial card positions ──
  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const offset = getOffset(i, activeIndex, total);
      const style = getCardStyle(offset, total);
      gsap.set(card, {
        x: style.x,
        y: style.y,
        scale: style.scale,
        rotateY: style.rotateY,
        rotateZ: style.rotateZ,
        opacity: style.opacity,
        filter: style.filter,
        zIndex: style.zIndex,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Keyboard navigation ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') navigate('right');
      if (e.key === 'ArrowLeft') navigate('left');
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  // ── Touch / swipe handlers ──
  const handleTouchStart = useCallback((e) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.startY = e.touches[0].clientY;
    touchRef.current.active = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!touchRef.current.active) return;
    // Prevent default only if horizontal swipe
    const dx = Math.abs(e.touches[0].clientX - touchRef.current.startX);
    const dy = Math.abs(e.touches[0].clientY - touchRef.current.startY);
    if (dx > dy && dx > 10) {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchRef.current.active) return;
    touchRef.current.active = false;

    const endX = e.changedTouches[0].clientX;
    const diff = touchRef.current.startX - endX;

    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 'right' : 'left');
    }
  }, [navigate]);

  // ── Auto-rotation (pause on hover/touch) ──
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        navigate('right');
      }, 5000);
    };

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };

    startAutoPlay();

    const deck = deckRef.current;
    if (deck) {
      deck.addEventListener('mouseenter', stopAutoPlay);
      deck.addEventListener('mouseleave', startAutoPlay);
      deck.addEventListener('touchstart', stopAutoPlay, { passive: true });
      deck.addEventListener('touchend', () => {
        // Restart after a delay on touch end
        setTimeout(startAutoPlay, 3000);
      });
    }

    return () => {
      stopAutoPlay();
      if (deck) {
        deck.removeEventListener('mouseenter', stopAutoPlay);
        deck.removeEventListener('mouseleave', startAutoPlay);
      }
    };
  }, [navigate]);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="scroll-mt-24 md:scroll-mt-28 py-12 md:py-20 lg:py-24 px-0 sm:px-6 border-t border-white/10 overflow-hidden speaker-deck-section"
    >
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <h2 ref={titleRef} className="text-[clamp(2rem,5vw+1rem,3.75rem)] md:text-6xl font-bold mb-6 sm:mb-10 text-center px-4">
          Past <span className="text-ted-red">Speakers</span>
        </h2>
        <p className="text-center text-white/60 text-sm sm:text-base max-w-2xl mx-auto mb-10 md:mb-16 px-4">
          Voices spanning leadership, policy, alumni excellence, digital culture, and deep expertise — unified by ideas worth spreading.
        </p>

        {/* ── Card Deck ── */}
        <div
          ref={deckRef}
          className="relative mx-auto"
          style={{ maxWidth: '600px' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows */}
          <div className="speaker-deck-nav speaker-deck-nav--left">
            <button
              className="speaker-deck-nav-btn"
              onClick={() => navigate('left')}
              aria-label="Previous speaker"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          </div>

          <div className="speaker-deck-nav speaker-deck-nav--right">
            <button
              className="speaker-deck-nav-btn"
              onClick={() => navigate('right')}
              aria-label="Next speaker"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Card Stack */}
          <div className="speaker-deck-wrapper">
            {pastSpeakers.map((speaker, index) => {
              const offset = getOffset(index, activeIndex, total);
              const isActive = offset === 0;

              return (
                <article
                  key={speaker.role}
                  ref={(el) => { cardRefs.current[index] = el; }}
                  className={`speaker-deck-card ${isActive ? 'speaker-deck-card--active' : ''}`}
                  onClick={() => {
                    if (!isActive) jumpTo(index);
                  }}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Speaker: ${speaker.role}`}
                >
                  {/* Speaker Image */}
                  {speaker.image && (
                    <img
                      src={speaker.image}
                      alt={speaker.role}
                      className="speaker-deck-card__image"
                      loading="lazy"
                      draggable={false}
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="speaker-deck-card__overlay" />

                  {/* Speaker Info */}
                  <div className="speaker-deck-card__info">
                    <h3 className="speaker-deck-card__name">{speaker.role}</h3>
                    <div className="speaker-deck-card__rule" />
                    <p className="speaker-deck-card__focus">{speaker.focus}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="speaker-deck-dots">
            {pastSpeakers.map((speaker, index) => (
              <button
                key={speaker.role}
                className={`speaker-deck-dot ${index === activeIndex ? 'speaker-deck-dot--active' : ''}`}
                onClick={() => jumpTo(index)}
                aria-label={`Go to ${speaker.role}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="speaker-deck-counter">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
});

Speakers.displayName = 'Speakers';

export default Speakers;
