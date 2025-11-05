import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const images = [
  'public/1.WebP',
  'public/2.WebP',
  'public/3.WebP',
  'public/4.WebP',
  'public/5.WebP',
  'public/6.WebP',
  'public/7.WebP',
  'public/8.WebP',
  'public/9.WebP',
  'public/10.WebP',
  'public/11.WebP',
  'public/12.WebP',
  'public/13.WebP',
  'public/14.WebP',
  'public/15.WebP',
  'public/16.WebP',
  'public/17.WebP',
  'public/18.WebP',
  'public/19.WebP',
  'public/20.WebP',
  'public/21.WebP',
  'public/22.WebP',
  'public/23.WebP',
  'public/24.WebP',
  'public/25.WebP',
  'public/26.WebP',
  'public/27.WebP',
  'public/29.WebP',
  'public/30.WebP',
  'public/31.WebP',
  'public/32.WebP',
  'public/33.WebP',
  'public/34.WebP',
  'public/35.WebP',
  'public/36.WebP',
  'public/37.WebP',
  'public/38.WebP',
  'public/39.WebP',
  'public/40.WebP',
  'public/41.WebP',
  'public/42.WebP',
  'public/43.WebP',
  'public/44.WebP',
  'public/45.WebP',
  'public/46.WebP',
  'public/47.WebP',
  'public/48.WebP',
  'public/49.WebP',
  'public/50.WebP',
  'public/51.WebP',
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
