import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
  'public/1.webp',
  'public/2.webp',
  'public/3.webp',
  'public/4.webp',
  'public/5.webp',
  'public/6.webp',
  'public/7.webp',
  'public/8.webp',
  'public/9.webp',
  'public/10.webp',
  'public/11.webp',
  'public/12.webp',
  'public/13.webp',
  'public/14.webp',
  'public/15.webp',
  'public/16.webp',
  'public/17.webp',
  'public/18.webp',
  'public/19.webp',
  'public/20.webp',
  'public/21.webp',
  'public/22.webp',
  'public/23.webp',
  'public/24.webp',
  'public/25.webp',
  'public/26.webp',
  'public/27.webp',
  'public/29.webp',
  'public/30.webp',
  'public/31.webp',
  'public/32.webp',
  'public/33.webp',
  'public/34.webp',
  'public/35.webp',
  'public/36.webp',
  'public/37.webp',
  'public/38.webp',
  'public/39.webp',
  'public/40.webp',
  'public/41.webp',
  'public/42.webp',
  'public/43.webp',
  'public/44.webp',
  'public/45.webp',
  'public/46.webp',
  'public/47.webp',
  'public/48.webp',
  'public/49.webp',
  'public/50.webp',
  'public/51.webp',
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
