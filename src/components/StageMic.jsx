import React, { useState, useEffect, useRef, memo } from 'react';

/* ──────────────────────────────────────────────
   Section-aware messages – changes as user scrolls
   ────────────────────────────────────────────── */
const SECTION_MESSAGES = {
  hero: "Ideas worth spreading.",
  about: "Every great idea starts with a spark.",
  theme: "This year's theme- reimagined.",
  speakers: "Voices that move the world forward.",
  experience: "Not just a talk- an experience.",
  timeline: "Mark your calendar. Be there.",
  partners: "Built with incredible partners.",
  team: "The minds behind the magic.",
};

const SECTION_ORDER = ['hero', 'about', 'theme', 'speakers', 'experience', 'timeline', 'partners', 'team'];

const DEFAULT_MSG = "Ideas worth spreading.";

/* ──────────────────────────────────────────────
   Premium Stage Microphone SVG
   Full-bodied, high-contrast, TEDx red+black
   ────────────────────────────────────────────── */
const MicIcon = memo(() => (
  <svg
    viewBox="0 0 100 200"
    width="100%"
    height="100%"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stage-mic__svg"
    aria-hidden="true"
  >
    <defs>
      {/* ── Mic head (capsule) gradients ── */}
      <linearGradient id="micHeadMain" x1="20" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#5a5a5a" />
        <stop offset="25%" stopColor="#3d3d3d" />
        <stop offset="55%" stopColor="#2a2a2a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      <linearGradient id="micGrilleGrad" x1="28" y1="8" x2="72" y2="62" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#666666" />
        <stop offset="40%" stopColor="#444444" />
        <stop offset="100%" stopColor="#2a2a2a" />
      </linearGradient>
      {/* Top specular highlight */}
      <radialGradient id="micTopHighlight" cx="42" cy="16" r="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.32" />
        <stop offset="60%" stopColor="white" stopOpacity="0.08" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </radialGradient>
      {/* Edge rim highlight */}
      <linearGradient id="micRimHighlight" x1="25" y1="0" x2="25" y2="70" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.2" />
        <stop offset="50%" stopColor="white" stopOpacity="0.06" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* ── Handle gradients ── */}
      <linearGradient id="handleGrad" x1="40" y1="78" x2="60" y2="170" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#333333" />
        <stop offset="30%" stopColor="#222222" />
        <stop offset="70%" stopColor="#1a1a1a" />
        <stop offset="100%" stopColor="#111111" />
      </linearGradient>
      <linearGradient id="handleHighlight" x1="44" y1="80" x2="44" y2="165" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.12" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>

      {/* ── Red accent ring ── */}
      <linearGradient id="redRingGrad" x1="30" y1="72" x2="70" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff3030" />
        <stop offset="50%" stopColor="#E50914" />
        <stop offset="100%" stopColor="#b00710" />
      </linearGradient>
      <radialGradient id="redRingGlow" cx="50" cy="78" r="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff2020" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#ff0000" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
      </radialGradient>

      {/* ── Spotlight glow beneath ── */}
      <radialGradient id="spotlightGlow" cx="50" cy="186" r="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E50914" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#E50914" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#E50914" stopOpacity="0" />
      </radialGradient>

      {/* ── Filters ── */}
      <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="heavyGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Grille clip path */}
      <clipPath id="grilleClip">
        <ellipse cx="50" cy="36" rx="20" ry="28" />
      </clipPath>
    </defs>

    {/* ═══ SPOTLIGHT BEAM (behind mic) ═══ */}
    <polygon
      points="30,0 70,0 85,200 15,200"
      fill="url(#spotlightGlow)"
      opacity="0.18"
      className="stage-mic__beam"
    />

    {/* ═══ HANDLE / BODY ═══ */}
    {/* Main handle shaft – thick cylinder */}
    <rect x="40" y="78" width="20" height="92" rx="10" fill="url(#handleGrad)" />
    {/* Handle left edge highlight */}
    <rect x="42" y="82" width="3" height="84" rx="1.5" fill="url(#handleHighlight)" />
    {/* Handle right subtle edge */}
    <rect x="56" y="85" width="1.5" height="78" rx="0.75" fill="white" opacity="0.04" />
    {/* Handle grip texture – subtle rings */}
    {[100, 110, 120, 130, 140, 150].map((y) => (
      <line key={y} x1="41" y1={y} x2="59" y2={y} stroke="white" strokeWidth="0.4" opacity="0.06" />
    ))}

    {/* Handle base / bottom cap */}
    <ellipse cx="50" cy="170" rx="11" ry="4" fill="#1a1a1a" />
    <ellipse cx="50" cy="170" rx="11" ry="4" fill="none" stroke="#333" strokeWidth="0.6" />
    <ellipse cx="50" cy="170" rx="8" ry="2.5" fill="#111" />

    {/* ═══ RED ACCENT BAND ═══ */}
    <rect x="36" y="73" width="28" height="8" rx="4" fill="url(#redRingGrad)" filter="url(#softGlow)" />
    <rect x="36" y="73" width="28" height="8" rx="4" fill="none" stroke="#ff4444" strokeWidth="0.5" opacity="0.5" />
    {/* Red glow ambient */}
    <ellipse cx="50" cy="78" rx="28" ry="10" fill="url(#redRingGlow)" />

    {/* ═══ MIC HEAD (CAPSULE) ═══ */}
    {/* Outer shell */}
    <ellipse cx="50" cy="36" rx="24" ry="34" fill="url(#micHeadMain)" />
    <ellipse cx="50" cy="36" rx="24" ry="34" fill="none" stroke="#555" strokeWidth="1.2" />

    {/* Inner grille area */}
    <ellipse cx="50" cy="34" rx="20" ry="28" fill="url(#micGrilleGrad)" />
    <ellipse cx="50" cy="34" rx="20" ry="28" fill="none" stroke="#4a4a4a" strokeWidth="0.6" />

    {/* Grille mesh pattern – horizontal lines */}
    <g clipPath="url(#grilleClip)">
      {[10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((y) => (
        <line key={`h${y}`} x1="28" y1={y} x2="72" y2={y} stroke="#555" strokeWidth="0.7" opacity="0.55" />
      ))}
      {/* Vertical mesh lines */}
      {[34, 38, 42, 46, 50, 54, 58, 62, 66].map((x) => (
        <line key={`v${x}`} x1={x} y1="4" x2={x} y2="66" stroke="#555" strokeWidth="0.5" opacity="0.4" />
      ))}
      {/* Cross-hatch for extra texture */}
      {[12, 22, 32, 42, 52].map((y) => (
        <line key={`d${y}`} x1="30" y1={y} x2="70" y2={y + 8} stroke="#4a4a4a" strokeWidth="0.3" opacity="0.2" />
      ))}
    </g>

    {/* Top specular highlight (glossy sheen) */}
    <ellipse cx="42" cy="18" rx="14" ry="14" fill="url(#micTopHighlight)" />

    {/* Left rim shine */}
    <path
      d="M28,20 Q26,36 30,55"
      stroke="url(#micRimHighlight)"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* ═══ INDICATOR LIGHT ═══ */}
    <circle cx="50" cy="64" r="2.5" fill="#ff2020" filter="url(#softGlow)">
      <animate attributeName="opacity" values="1;0.4;1" dur="2.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="50" cy="64" r="1.2" fill="#ff6060" opacity="0.8" />

    {/* ═══ BOTTOM SPOTLIGHT POOL ═══ */}
    <ellipse cx="50" cy="186" rx="35" ry="10" fill="url(#spotlightGlow)" filter="url(#heavyGlow)">
      <animate attributeName="opacity" values="0.7;0.45;0.7" dur="3s" repeatCount="indefinite" />
    </ellipse>
  </svg>
));

MicIcon.displayName = 'MicIcon';

/* ──────────────────────────────────────────────
   Main Component
   ────────────────────────────────────────────── */
const StageMic = memo(() => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [displayMsg, setDisplayMsg] = useState(DEFAULT_MSG);
  const [animKey, setAnimKey] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const prevSection = useRef('hero');

  /* Intersection Observer – detect which section is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    SECTION_ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Update message when section changes */
  useEffect(() => {
    if (currentSection === prevSection.current) return;
    prevSection.current = currentSection;

    setBubbleVisible(false);

    const timer = setTimeout(() => {
      setDisplayMsg(SECTION_MESSAGES[currentSection] || DEFAULT_MSG);
      setAnimKey((k) => k + 1);
      setBubbleVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentSection]);

  return (
    <div
      id="stage-mic-root"
      className="stage-mic"
      aria-label="Stage microphone with ideas"
    >
      {/* Speech bubble */}
      <div
        className={`stage-mic__bubble ${bubbleVisible ? 'stage-mic__bubble--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        <span className="stage-mic__bubble-accent" aria-hidden="true" />
        <p key={animKey} className="stage-mic__bubble-text">
          {displayMsg}
        </p>
        <span className="stage-mic__bubble-tail" aria-hidden="true" />
      </div>

      {/* Microphone element */}
      <div className="stage-mic__body">
        <MicIcon />
      </div>
    </div>
  );
});

StageMic.displayName = 'StageMic';

export default StageMic;
