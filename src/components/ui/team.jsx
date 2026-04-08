import React from 'react';
import { UserStar } from 'lucide-react';

// Import images
import shivaniImage from '../../assets/Shivani-prezi.jpeg';
import snehaImage from '../../assets/Sneha-prezi.jpeg';

const teamMembers = [
  {
    image: shivaniImage,
    name: 'Shivani Jha',
    role: 'President',
  },
  {
    image: snehaImage,
    name: 'Sneha',
    role: 'President',
  },
];

export default function Team() {
  return (
    <section id="team" className="relative w-full overflow-hidden border-t border-white/10 bg-pure-black py-12 md:py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 lg:mb-12 flex max-w-5xl flex-col items-center px-0 text-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ted-red text-white">
            <UserStar size={22} />
          </div>

          <h2 className="relative mb-3 text-[clamp(2rem,5vw+1rem,3.75rem)] font-bold tracking-tight text-white sm:text-6xl px-2">
            The <span className="text-ted-red">Team</span>
          </h2>
          <h3 className="mb-5 sm:mb-8 text-[clamp(1.125rem,3vw+0.5rem,1.875rem)] font-light text-white/80 px-2 leading-snug">
            Meet the leaders behind TEDxIGDTU
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mx-auto w-full max-w-3xl">
          {teamMembers.map((member) => (
            <div key={member.name} className="group flex w-full flex-col items-center">
              <div className="relative aspect-[3/4] h-auto w-full max-w-[20rem] sm:max-w-none overflow-hidden rounded-2xl border border-white/10 bg-pure-black">
                <img
                  loading="lazy"
                  alt={member.name}
                  className="h-full w-full object-cover grayscale-0 lg:grayscale transition-all duration-300 lg:group-hover:grayscale-0"
                  src={member.image}
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12">
                  <h3 className="font-semibold text-lg text-white mb-1">{member.name}</h3>
                  <div className="w-8 h-0.5 bg-ted-red mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="text-white/80 text-sm tracking-wide">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

