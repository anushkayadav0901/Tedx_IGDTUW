import React from 'react';
import { UserStar } from 'lucide-react';

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

// Map images with their filenames
const directorsData = [
  { image: anousha, filename: 'Anousha.jpeg' },
  { image: ayushiDel, filename: 'Ayushi-del.jpeg' },
  { image: ayushi, filename: 'Ayushi.jpeg' },
  { image: harshita, filename: 'Harshita.jpeg' },
  { image: kanak, filename: 'Kanak.jpeg' },
  { image: manishika, filename: 'Manishika.jpeg' },
  { image: parnika, filename: 'Parnika.jpeg' },
  { image: pratistha, filename: 'Pratistha.jpeg' },
  { image: raksha, filename: 'Raksha.jpeg' },
  { image: shivaniPrezi, filename: 'Shivani-prezi.jpeg' },
  { image: shivya, filename: 'Shivya.jpeg' },
  { image: shreya, filename: 'Shreya.jpeg' },
  { image: snehaPrezi, filename: 'Sneha-prezi.jpeg' },
  { image: vamika, filename: 'Vamika.jpeg' },
];

// Helper function to extract and format name from filename
const getNameFromFilename = (filename) => {
  // Remove extension
  const nameWithoutExt = filename.replace(/\.(jpeg|jpg|png)$/i, '');
  // Replace hyphens and underscores with spaces
  const formattedName = nameWithoutExt.replace(/[-_]/g, ' ');
  return formattedName;
};

// Check if filename contains "prezi"
const isPrezi = (filename) => filename.toLowerCase().includes('prezi');

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mx-auto w-full">
          {directorsData.map((director, index) => {
            const showName = isPrezi(director.filename);
            const displayName = showName ? getNameFromFilename(director.filename) : '';

            return (
              <div key={index} className="group flex w-full flex-col items-center">
                <div className="relative aspect-[3/4] h-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-pure-black">
                  <img
                    loading="lazy"
                    alt={displayName || 'Team member'}
                    className="h-full w-full object-cover transition-all duration-300"
                    src={director.image}
                  />
                  {showName && (
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10">
                      <h3 className="font-semibold text-base text-white mb-1">{displayName}</h3>
                      <div className="w-8 h-0.5 bg-ted-red"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
