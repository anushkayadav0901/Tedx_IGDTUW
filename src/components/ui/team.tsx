import { useState, useCallback } from 'react';
import { UserStar } from 'lucide-react';
import { Marquee } from '../../demos/ui/marquee';

// Import all director images
import anousha from '../../assets/directors/Anousha.jpeg';
import ayushiDel from '../../assets/directors/Ayushi-del.jpeg';
import ayushi from '../../assets/directors/Ayushi.jpeg';
import harshita from '../../assets/directors/Harshita.jpeg';
import kanak from '../../assets/directors/Kanak.jpeg';
import manishika from '../../assets/directors/Manishika.jpeg';
import parnika from '../../assets/directors/Parnika.jpeg';
import pratistha from '../../assets/directors/Pratistha.jpeg';
import raksha from '../../assets/directors/Raksha.jpeg';
import shivaniPrezi from '../../assets/directors/Shivani-prezi.jpeg';
import shivya from '../../assets/directors/Shivya.jpeg';
import shreya from '../../assets/directors/Shreya.jpeg';
import snehaPrezi from '../../assets/directors/Sneha-prezi.jpeg';
import vamika from '../../assets/directors/Vamika.jpeg';

type Director = {
  image: string;
  filename: string;
};

// Presidents (static at top)
const presidents: Director[] = [
  { image: shivaniPrezi, filename: 'Shivani Jha' },
  { image: snehaPrezi, filename: 'Sneha Roychowdhury' },
];

// Other directors (rolling marquee)
const otherDirectors: Director[] = [
  { image: anousha, filename: 'Anousha.jpeg' },
  { image: ayushiDel, filename: 'Ayushi-del.jpeg' },
  { image: ayushi, filename: 'Ayushi.jpeg' },
  { image: harshita, filename: 'Harshita.jpeg' },
  { image: kanak, filename: 'Kanak.jpeg' },
  { image: manishika, filename: 'Manishika.jpeg' },
  { image: parnika, filename: 'Parnika.jpeg' },
  { image: pratistha, filename: 'Pratistha.jpeg' },
  { image: raksha, filename: 'Raksha.jpeg' },
  { image: shivya, filename: 'Shivya.jpeg' },
  { image: shreya, filename: 'Shreya.jpeg' },
  { image: vamika, filename: 'Vamika.jpeg' },
];

const getNameFromFilename = (filename: string): string => {
  const nameWithoutExt = filename.replace(/\.(jpeg|jpg|png)$/i, '');
  return nameWithoutExt.replace(/[-_]/g, ' ');
};

const isPrezi = (filename: string): boolean => filename.toLowerCase().includes('prezi');

export default function Team() {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const toggleMarquee = useCallback(() => {
    setMarqueePaused((p) => !p);
  }, []);

  return (
    <section id="team" className="relative w-full overflow-hidden border-t border-white/10 bg-pure-black py-12 sm:py-24 md:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 sm:mb-16 flex max-w-5xl flex-col items-center px-2 text-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ted-red text-white">
            <UserStar size={22} />
          </div>

          <h2 className="relative mb-3 text-[clamp(2rem,5vw+1rem,3.75rem)] font-bold tracking-tight text-white sm:text-6xl px-2 animate-text-glow">
            The <span className="text-ted-red drop-shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-text-glow-red">Team</span>
          </h2>
          <h3 className="mb-5 sm:mb-8 text-[clamp(1.125rem,3vw+0.5rem,1.875rem)] font-light text-white/80 px-2 leading-snug">
            Meet the leaders behind TEDxIGDTU
          </h3>
        </div>

        {/* Presidents - Static at top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mx-auto w-full max-w-3xl mb-12 sm:mb-16">
          {presidents.map((president, index) => (
            <div key={index} className="group flex w-full flex-col items-center">
              <div className="relative aspect-[3/4] h-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-pure-black">
                <img
                  alt={president.filename}
                  className="h-full w-full object-cover transition-all duration-300"
                  loading="eager"
                  src={president.image}
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12">
                  <h3 className="font-semibold text-lg text-white mb-1">{president.filename}</h3>
                  <div className="w-10 h-0.5 bg-ted-red mb-2"></div>
                  <p className="text-white/80 text-sm tracking-wide">President</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Directors - Rolling Marquee */}

        <div className="relative w-full">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-pure-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-pure-black to-transparent" />

          <Marquee className="[--gap:1.5rem]" paused={marqueePaused} pauseOnHover={false}>
            {otherDirectors.map((director, index) => {
              const displayName = getNameFromFilename(director.filename);

              return (
                <div
                  key={index}
                  className="group flex w-64 shrink-0 flex-col cursor-pointer rounded-[var(--card-radius)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ted-red"
                  role="button"
                  tabIndex={0}
                  aria-label={`${displayName}. Tap to ${marqueePaused ? 'resume' : 'pause'} marquee.`}
                  onClick={toggleMarquee}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMarquee();
                    }
                  }}
                >
                  <div className="relative h-72 w-full overflow-hidden rounded-[var(--card-radius)] border border-white/10 bg-pure-black">
                    <img
                      alt={displayName}
                      className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                      loading="lazy"
                      src={director.image}
                    />
                  </div>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
