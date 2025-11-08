import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const COUNT = 34; // kiek turi failų (1..COUNT)
const EXT = 'webp'; // jei keisi į jpg/png – pakeisk čia
const DIR = '/gallery'; // public/gallery

const images = Array.from({ length: COUNT }, (_, i) => {
  const n = i + 1;
  const src = `${DIR}/${n}.${EXT}`;
  return { src, n };
});

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(12);
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

  // Uždarymas su ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id='galerija' className='py-20 bg-[#F8F7F4]'>
      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-3xl font-serif text-center mb-10'>
          {t[lang].title}
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {images.slice(0, visible).map(({ src, n }, i) => (
            <button
              key={n}
              onClick={() => setSelected(src)}
              className='cursor-pointer overflow-hidden rounded-xl group'
              aria-label={t[lang].alt(n)}
            >
              <img
                src={src}
                alt={t[lang].alt(n)}
                className='object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300 bg-[#EDEBE8]'
                loading={i < 4 ? 'eager' : 'lazy'} // pirmi keli kadrai – greitesniam LCP
                fetchpriority={i < 2 ? 'high' : 'auto'}
                decoding='async'
              />
            </button>
          ))}
        </div>

        {visible < images.length && (
          <div className='text-center mt-10'>
            <button
              onClick={() => setVisible((v) => v + 9)}
              className='px-6 py-2 bg-[#C1A173] hover:bg-[#a88b5f] text-white rounded-md transition'
            >
              {t[lang].more}
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
          onClick={() => setSelected(null)}
          role='dialog'
          aria-modal='true'
        >
          <img
            src={selected}
            alt={t[lang].alt('didelė')}
            className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl'
            loading='eager'
            decoding='async'
          />
        </div>
      )}
    </section>
  );
}
