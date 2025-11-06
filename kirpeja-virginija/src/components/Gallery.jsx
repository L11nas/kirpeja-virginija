import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
  '/2.webp',
  '/3.webp',
  '/4.webp',
  '/5.webp',
  '/6.webp',
  '/7.webp',
  '/8.webp',
  '/9.webp',
  '/10.webp',
  '/11.webp',
  '/12.webp',
  '/13.webp',
  '/14.webp',
  '/15.webp',
  '/16.webp',
  '/17.webp',
  '/18.webp',
  '/19.webp',
  '/20.webp',
  '/21.webp',
  '/22.webp',
  '/23.webp',
  '/24.webp',
  '/25.webp',
  '/26.webp',
  '/27.webp',
  '/29.webp',
  '/30.webp',
  '/31.webp',
  '/32.webp',
  '/33.webp',
  '/34.webp',
  '/35.webp',
  '/36.webp',
  '/37.webp',
  '/38.webp',
  '/39.webp',
  '/40.webp',
  '/41.webp',
  '/42.webp',
  '/43.webp',
  '/44.webp',
  '/45.webp',
  '/46.webp',
  '/47.webp',
  '/48.webp',
  '/49.webp',
  '/50.webp',
  '/51.webp',
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const { lang } = useLanguage();

  const t = {
    LT: {
      title: 'Galerija',
      alt: (i) => `Kirpėja Virginija – nuotrauka ${i}`,
    },
    EN: {
      title: 'Gallery',
      alt: (i) => `Hairdresser Virginija – photo ${i}`,
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
          {images.map((src, index) => (
            <div
              key={index}
              className='cursor-pointer overflow-hidden rounded-xl group'
              onClick={() => setSelected(src)}
            >
              <img
                src={src}
                alt={t[lang].alt(index + 1)}
                loading='lazy'
                className='object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300'
              />
            </div>
          ))}
        </div>
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
          />
        </div>
      )}
    </section>
  );
}
