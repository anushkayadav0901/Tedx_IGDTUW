# TEDxIGDTUW Landing Page

A cinematic, Awwwards-level landing page for TEDxIGDTUW with advanced animations and interactions.

## Design Philosophy

- Pure black background (#000000)
- TED red accent (#E50914)
- White text
- No gradients, no glassmorphism, no neon
- Motion-driven design with GSAP
- Smooth scrolling with Lenis
- Premium micro-interactions

## Tech Stack

- React 18
- Tailwind CSS 3
- GSAP 3 with ScrollTrigger
- Lenis smooth scroll
- Custom cursor
- Advanced parallax effects

## Features

### Cinematic Loader
- Full-screen curtain animation
- Red line reveal effect
- Smooth GSAP transitions

### Smooth Scrolling
- Lenis inertia scroll
- Fluid, premium feel
- Integrated with GSAP ScrollTrigger

### Hero Section
- Multi-layer parallax
- Grain texture overlay
- Floating red particles
- Mouse-move parallax
- Split text animations

### Theme Section
- "BEYOND" slides from left
- "BARRIERS" slides from right in red
- Animated barrier blocks
- Red divider line animations
- Scroll-based reveals

### Horizontal Scroll Experience
- Vertical scroll controls horizontal movement
- Pinned section with ScrollTrigger
- Smooth card transitions

### Speaker Cards
- 3D tilt on hover
- Red animated borders
- Name slides upward
- Stagger reveal on scroll

### Magnetic Buttons
- Cursor proximity effect
- Elastic bounce on leave
- Smooth scaling

### Custom Cursor
- White dot cursor
- Red ring on hover
- Expands on interactive elements

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Performance

- Transform-based animations
- will-change optimizations
- Lazy loading ready
- Smooth 60fps animations

## Structure

```
src/
├── components/
│   ├── Loader.jsx          # Curtain loader
│   ├── CustomCursor.jsx    # Custom cursor
│   ├── Hero.jsx            # Hero with parallax
│   ├── About.jsx           # About section
│   ├── Theme.jsx           # Theme with split text
│   ├── Speakers.jsx        # 3D tilt cards
│   ├── Experience.jsx      # Horizontal scroll
│   ├── Timeline.jsx        # Vertical timeline
│   ├── Sponsors.jsx        # Partner grid
│   └── Footer.jsx          # Footer
├── utils/
│   └── splitText.js        # Text splitting utility
├── App.js                  # Main app with Lenis
└── index.css               # Global styles
```

## Customization

- Update speaker data in `src/components/Speakers.jsx`
- Modify timeline in `src/components/Timeline.jsx`
- Add sponsor logos in `src/components/Sponsors.jsx`
- Integrate 3D models in About and Theme sections (placeholders ready)

## Animation Details

- All scroll animations use GSAP ScrollTrigger with scrub
- Magnetic buttons use elastic easing
- Text splits use stagger for cinematic reveals
- Parallax uses transform for performance
- Custom cursor uses GSAP for smooth tracking

## Notes

- Fully responsive design
- Ready for 3D integration (Three.js/React Three Fiber)
- Optimized for performance
- Awwwards-level interactions
- Professional TEDx aesthetic

