import React from 'react';
import { UserStar } from 'lucide-react';

import { Marquee } from '../../demos/ui/marquee';

type TeamMember = {
  image: string;
  name: string;
  role: string;
};

const teamMembers: TeamMember[] = [
  {
    image:
      'https://images.cnippet.dev/image/upload/v1770400411/a1.jpg',
    name: 'Patrick Stewart',
    role: 'CEO - Founder',
  },
  {
    image:
      'https://images.cnippet.dev/image/upload/v1770400411/a2.jpg',
    name: 'Alena Rosser',
    role: 'Director of Content',
  },
  {
    image:
      'https://images.cnippet.dev/image/upload/v1770400411/a3.jpg',
    name: 'Fletch Skinner',
    role: 'Tech Manager',
  },
  {
    image:
      'https://images.cnippet.dev/image/upload/v1770400411/a4.jpg',
    name: 'Marc Spector',
    role: 'Director of Content',
  },
  {
    image:
      'https://images.cnippet.dev/image/upload/v1770400411/a5.jpg',
    name: 'Natalia Skinner',
    role: 'Cnippet Researcher',
  },
  {
    image:
      'https://images.cnippet.dev/image/upload/v1770400411/a6.jpg',
    name: 'David Kim',
    role: 'Engineering Lead',
  },
];

/**
 * Team marquee section.
 * Adapted from a Next.js/shadcn component to work in your CRA + Tailwind setup.
 */
export default function Team() {
  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-pure-black py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-2 text-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ted-red text-white">
            <UserStar size={22} />
          </div>

          <h2 className="relative mb-4 font-medium text-3xl tracking-tight text-white sm:text-5xl">
            Creative Cnippet Members
          </h2>
          <p className="max-w-2xl text-center text-white/70">
            Cnippet connects you with advanced tech solutions, empowering
            seamless communication.
          </p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-white/10 to-transparent" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              <div key={member.name} className="group flex w-64 shrink-0 flex-col">
                <div className="relative h-72 w-full overflow-hidden rounded-[var(--card-radius)] border border-white/10 bg-pure-black">
                  <img
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    loading="lazy"
                    src={member.image}
                  />
                  <div className="absolute bottom-0 w-full bg-white/5 p-3 backdrop-blur">
                    <h3 className="font-semibold text-white">{member.name}</h3>
                    <p className="text-white/70 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

