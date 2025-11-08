import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const TOTAL_IMAGES = 34;
const DIR = '/gallery';
const EXT = 'webp';

// automatiškai sugeneruoja masyvą su visais keliais
const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const n = i + 1;
  return {
    full: `${DIR}/${n}.${EXT}`, // pagrindinė versija
    blur: `${DIR}/${n}_small.${EXT}`, // mažoji 100–200px blur versija
    index: n,
  };
});

export default function Gallery() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState(null);

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

  // leidžia uždaryti modal ESC klavišu
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id='galerija' className='py-20 bg-[#F8F7F4]'>
      {/* Preload pirmoms 3 nuotraukoms */}
      <Helmet>
        {images.slice(0, 3).map((img) => (
          <link key={img.index} rel='preload' as='image' href={img.full} />
        ))}
      </Helmet>

      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-3xl font-serif text-center mb-10'>
          {t[lang].title}
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {images.slice(0, visible).map((img, i) => (
            <button
              key={img.index}
              onClick={() => setSelected(img.full)}
              className='cursor-pointer overflow-hidden rounded-xl group relative'
              aria-label={t[lang].alt(img.index)}
            >
              {/* blur-up fono sluoksnis */}
              <div
                className='absolute inset-0 bg-center bg-cover blur-lg scale-110'
                style={{
                  backgroundImage: `url(${img.blur})`,
                }}
              />
              {/* tikrasis paveikslas */}
              <img
                src={img.full}
                alt={t[lang].alt(img.index)}
                loading={i < 4 ? 'eager' : 'lazy'}
                fetchpriority={i < 2 ? 'high' : 'auto'}
                decoding='async'
                className='relative object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300'
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

      {/* Modal */}
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
