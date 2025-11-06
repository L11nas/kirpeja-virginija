import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const TOTAL_IMAGES = 51;

// automatiškai sugeneruoja masyvą su visais keliais
const images = Array.from({ length: TOTAL_IMAGES - 1 }, (_, i) => ({
  thumb: `/${i + 2}.webp`,
  full: `/${i + 2}.webp`,
}));

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // pradžioje rodom 12
  const { lang } = useLanguage();

  const t = {
    LT: {
      title: 'Galerija',
      alt: (i) => `Kirpėja Virginija – nuotrauka ${i}`,
      more: 'Rodyti daugiau',
    },
    EN: {
      title: 'Gallery',
      alt: (i) => `Hairdresser Virginija – photo ${i}`,
      more: 'Show more',
    },
  };

  return (
    <section className='py-20 bg-[#F8F7F4]' id='galerija'>
      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-3xl font-serif text-center mb-10'>
          {t[lang].title}
        </h2>

        {/* Image grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {images.slice(0, visibleCount).map((img, index) => (
            <div
              key={index}
              className='cursor-pointer overflow-hidden rounded-xl group'
              onClick={() => setSelected(img.full)}
            >
              <img
                src={img.thumb}
                data-full={img.full}
                alt={t[lang].alt(index + 1)}
                loading='lazy'
                className='object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 bg-[#EDEBE8]'
              />
            </div>
          ))}
        </div>

        {/* "Rodyti daugiau" mygtukas */}
        {visibleCount < images.length && (
          <div className='text-center mt-10'>
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className='px-6 py-2 bg-[#C1A173] hover:bg-[#a88b5f] text-white rounded-md transition'
            >
              {t[lang].more}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt={t[lang].alt('didelė')}
            className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl'
            loading='eager'
          />
        </div>
      )}
    </section>
  );
}
