import React, { useMemo } from 'react';

/**
 * Lightweight marquee implementation (CSS keyframes) for CRA + Tailwind.
 * Expects children to be fixed-width "cards" (no wrapping).
 */
export function Marquee({
  children,
  pauseOnHover = false,
  paused = false,
  className,
  durationSeconds,
}) {
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className={[
        'tedx-marquee',
        pauseOnHover ? 'tedx-marquee--pauseOnHover' : '',
        paused ? 'tedx-marquee--paused' : '',
        className || '',
      ].join(' ')}
      style={
        typeof durationSeconds === 'number'
          ? ({ '--marquee-duration': `${durationSeconds}s` })
          : undefined
      }
    >
      <div className="tedx-marquee__track" aria-hidden="true">
        {doubled.map((child, idx) => (
          <React.Fragment key={idx}>{child}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

