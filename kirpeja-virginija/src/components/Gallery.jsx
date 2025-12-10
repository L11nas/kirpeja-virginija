import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button';
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
  const [selectedIndex, setSelectedIndex] = useState(null); // now storing index
  const touchStartRef = useRef(0);

  const t = {
    LT: {
      title: 'Galerija',
      desc: 'Kirpėja Virginija – darbų galerija, profesionalūs moterų ir vyrų kirpimai, šukuosenos, dažymai Kaune.',
      alt: (i) =>
        `Kirpėja Virginija – nuotrauka ${i}, kirpimas ir šukuosenos Kaune`,
      more: 'Rodyti daugiau',
      close: 'Uždaryti',
    },
    EN: {
      title: 'Gallery',
      desc: 'Hairdresser Virginija – professional haircut & hairstyle gallery in Kaunas, Lithuania.',
      alt: (i) =>
        `Hairdresser Virginija – photo ${i}, professional hairstyles in Kaunas`,
      more: 'Show more',
      close: 'Close',
    },
  };

  const selected = selectedIndex !== null ? images[selectedIndex].full : null;

  // TRACK SCROLL
  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('galerija');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        if (window.gtag) {
          window.gtag('event', 'scroll_gallery', {
            event_category: 'scroll',
            event_label: 'Reached Gallery Section',
          });
        }
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // CLOSE MODAL
  const closeModal = () => {
    if (window.gtag) {
      window.gtag('event', 'gallery_close', {
        event_category: 'engagement',
        event_label: 'Modal closed',
      });
    }
    setSelectedIndex(null);
  };

  // NEXT + PREV
  const showNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // KEYBOARD CONTROLS
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  return (
    <section
      id='galerija'
      className='py-20 bg-[#F8F7F4]'
      aria-labelledby='gallery-heading'
    >
      {/* SEO */}
      <Helmet>
        <title>{`${t[lang].title} | Kirpėja Virginija Kaunas`}</title>
        <meta name='description' content={t[lang].desc} />
        <meta
          property='og:title'
          content={`${t[lang].title} | Kirpėja Virginija`}
        />
        <meta property='og:description' content={t[lang].desc} />
        <meta property='og:type' content='website' />
        <meta
          property='og:locale'
          content={lang === 'LT' ? 'lt_LT' : 'en_GB'}
        />

        <link rel='canonical' href='https://kirpeja-virginija.lt/#galerija' />

        {images.slice(0, 3).map((img) => (
          <link
            key={img.index}
            rel='preload'
            as='image'
            href={img.thumb}
            imagesrcset={`${img.thumb} 1x, ${img.full} 2x`}
          />
        ))}
      </Helmet>

      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-3xl font-serif text-center mb-10 text-[#3E3B38]'>
          {t[lang].title}
        </h2>

        {/* GALLERY GRID */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {images.slice(0, visible).map((img, i) => (
            <button
              key={img.index}
              onClick={() => {
                setSelectedIndex(i);

                if (window.gtag) {
                  window.gtag('event', 'gallery_open', {
                    event_category: 'engagement',
                    event_label: `photo_${img.index}`,
                  });
                }
              }}
              className='relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-[#C1A173] transition-all'
              aria-label={t[lang].alt(img.index)}
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
          ))}
        </div>

        {/* LOAD MORE */}
        {visible < images.length && (
          <div className='text-center mt-10'>
            <Button
              onClick={() => {
                setVisible((v) => v + 9);

                if (window.gtag) {
                  window.gtag('event', 'gallery_load_more', {
                    event_category: 'engagement',
                    event_label: `Load more pressed (now visible ${
                      visible + 9
                    })`,
                  });
                }
              }}
              className='px-6 py-2'
            >
              {t[lang].more}
            </Button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedIndex !== null && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn'
          onClick={closeModal}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className='absolute top-6 right-6 text-white bg-black/50 hover:bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-xl font-semibold z-50 transition'
          >
            ✕
          </button>

          {/* PREV BUTTON (hidden on small screens) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className='hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-3 z-50 transition select-none'
            aria-label='Previous'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              fill='white'
              viewBox='0 0 24 24'
            >
              <path d='M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
            </svg>
          </button>

          {/* NEXT BUTTON (hidden on small screens) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className='hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-3 z-50 transition select-none'
            aria-label='Next'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              fill='white'
              viewBox='0 0 24 24'
            >
              <path d='M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z' />
            </svg>
          </button>

          {/* IMAGE + MOBILE SWIPE */}
          <img
            src={selected}
            alt='Full size'
            className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border border-white/10 animate-zoomIn'
            loading='eager'
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => (touchStartRef.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const endX = e.changedTouches[0].clientX;
              const diff = endX - touchStartRef.current;
              if (diff > 50) showPrev();
              if (diff < -50) showNext();
            }}
          />
        </div>
      )}
    </section>
  );
}
