import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

const TOTAL_IMAGES = 34;
const DIR_THUMBS = '/gallery/thumbs';
const DIR_FULL = '/gallery/full';
const EXT = 'webp';

const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  thumb: `${DIR_THUMBS}/${i + 1}.${EXT}`,
  full: `${DIR_FULL}/${i + 1}.${EXT}`,
  index: i + 1,
}));

export default function Gallery() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState(null);

  const t = {
    LT: {
      title: 'Galerija',
      desc: 'Kirpėja Virginija – darbų galerija, profesionalūs moterų ir vyrų kirpimai, šukuosenos, dažymai Kaune.',
      alt: (i) =>
        `Kirpėja Virginija – nuotrauka ${i}, kirpimas ir šukuosenos Kaune`,
      more: 'Rodyti daugiau',
      close: 'Uždaryti nuotrauką',
    },
    EN: {
      title: 'Gallery',
      desc: 'Hairdresser Virginija – professional haircut & hairstyle gallery in Kaunas.',
      alt: (i) =>
        `Hairdresser Virginija – photo ${i}, professional hairstyles in Kaunas`,
      more: 'Show more',
      close: 'Close image',
    },
  };

  // ESC close listener
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section
      id='galerija'
      aria-labelledby='gallery-heading'
      className='py-20 bg-[#F8F7F4]'
      role='region'
    >
      <Helmet>
        <title>{`${t[lang].title} | Kirpėja Virginija Kaunas`}</title>
        <meta name='description' content={t[lang].desc} />
        <link rel='canonical' href='https://kirpeja-virginija.lt/#galerija' />
      </Helmet>

      <div className='max-w-6xl mx-auto px-6'>
        <h2
          id='gallery-heading'
          className='text-3xl font-serif text-center mb-10 text-[#3E3B38]'
        >
          {t[lang].title}
        </h2>

        {/* ---- ACCESSIBLE LIST ---- */}
        <ul
          className='grid grid-cols-2 md:grid-cols-3 gap-4'
          aria-label={t[lang].title}
        >
          {images.slice(0, visible).map((img) => (
            <li key={img.index} className='list-none'>
              <button
                onClick={() => setSelected(img.full)}
                aria-label={t[lang].alt(img.index)}
                className='relative overflow-hidden rounded-xl group w-full focus:outline-none focus:ring-2 focus:ring-[#8A744F] transition'
              >
                <img
                  src={img.thumb}
                  alt={t[lang].alt(img.index)}
                  loading='lazy'
                  decoding='async'
                  width='400'
                  height='400'
                  className='object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105 bg-[#EDEBE8]'
                />
              </button>
            </li>
          ))}
        </ul>

        {/* ---- LOAD MORE ---- */}
        {visible < images.length && (
          <div className='text-center mt-10'>
            <button
              onClick={() => setVisible((v) => v + 9)}
              className='px-6 py-2 bg-[#8A744F] hover:bg-[#746042] text-white rounded-md transition focus:ring-2 focus:ring-[#8A744F]'
            >
              {t[lang].more}
            </button>
          </div>
        )}
      </div>

      {/* ---- MODAL ---- */}
      {selected && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm'
          role='dialog'
          aria-modal='true'
          aria-label={
            lang === 'LT' ? 'Pilno dydžio nuotrauka' : 'Full size photo'
          }
          onClick={() => setSelected(null)}
        >
          <div className='relative'>
            <button
              onClick={() => setSelected(null)}
              aria-label={t[lang].close}
              className='absolute top-3 right-3 bg-white/70 hover:bg-white text-black rounded-full p-2 text-sm font-semibold shadow focus:ring-2 focus:ring-white'
            >
              ✕
            </button>

            <img
              src={selected}
              alt={
                lang === 'LT' ? 'Kirpyklos darbo nuotrauka' : 'Hair salon work'
              }
              className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border border-white/10'
              loading='eager'
            />
          </div>
        </div>
      )}
    </section>
  );
}
