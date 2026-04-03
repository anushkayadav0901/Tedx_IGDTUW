import React, { useMemo } from 'react';

type MarqueeProps = {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  paused?: boolean;
  className?: string;
  /**
   * Animation duration in seconds.
   * If not provided, CSS falls back to its default.
   */
  durationSeconds?: number;
};

/**
 * Lightweight marquee implementation (CSS keyframes) for CRA + Tailwind.
 * Assumes children are "cards" with fixed widths and no wrapping.
 */
export function Marquee({
  children,
  pauseOnHover = false,
  paused = false,
  className,
  durationSeconds,
}: MarqueeProps) {
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div
      className={[
        'tedx-marquee',
        pauseOnHover ? 'tedx-marquee--pauseOnHover' : '',
        paused ? 'tedx-marquee--paused' : '',
        className ?? '',
      ].join(' ')}
      style={
        typeof durationSeconds === 'number'
          ? ({ ['--marquee-duration' as any]: `${durationSeconds}s` } as React.CSSProperties)
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

