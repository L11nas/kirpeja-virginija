import { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

const EXT_IMG = 'webp';
const EXT_VIDEO = 'mp4';
const ROOT = '/gallery';
const SITE_URL = 'https://kirpeja-virginija.lt/';
const GALLERY_URL = `${SITE_URL}#galerija`;

const CATEGORY_META = [
  { id: 'all' },
  { id: 'women', total: 3 },
  { id: 'men', total: 9 },
  { id: 'styling', total: 6 },
  { id: 'kids', total: 17 },
];

const VIDEO_ITEMS = [
  {
    id: 'reel-1',
    titleKey: 'videoProcess',
    poster: `${ROOT}/video/posters/reel-1.${EXT_IMG}`,
    src: `${ROOT}/video/videos/reel-1.${EXT_VIDEO}`,
  },
  {
    id: 'reel-2',
    titleKey: 'videoProcess',
    poster: `${ROOT}/video/posters/reel-2.${EXT_IMG}`,
    src: `${ROOT}/video/videos/reel-2.${EXT_VIDEO}`,
  },
  {
    id: 'reel-3',
    titleKey: 'videoProcess',
    poster: `${ROOT}/video/posters/reel-3.${EXT_IMG}`,
    src: `${ROOT}/video/videos/reel-3.${EXT_VIDEO}`,
  },
];

function buildImageItems() {
  const items = [];
  for (const c of CATEGORY_META) {
    if (c.id === 'all') continue;
    for (let i = 1; i <= (c.total ?? 0); i++) {
      items.push({
        id: `${c.id}-${i}`,
        type: 'image',
        category: c.id,
        index: i,
        thumb: `${ROOT}/${c.id}/thumbs/${i}.${EXT_IMG}`,
        full: `${ROOT}/${c.id}/full/${i}.${EXT_IMG}`,
      });
    }
  }
  return items;
}

export default function Gallery() {
  const { lang } = useLanguage();

  const [activeCat, setActiveCat] = useState('all');
  const [visible, setVisible] = useState(8);
  const [selectedId, setSelectedId] = useState(null);
  const touchStartRef = useRef(0);

  const t = {
    LT: {
      title: 'Darbų galerija',
      desc: 'Kirpėja Virginija Kaune – moterų, vyrų ir vaikų kirpimų, šukuosenų ir plaukų formavimo darbų galerija. Peržiūrėkite atliktus darbus ir registruokitės vizitui internetu.',
      more: 'Rodyti daugiau',
      close: 'Uždaryti',
      prev: 'Ankstesnis',
      next: 'Kitas',
      cats: {
        all: 'Visos',
        women: 'Moterų',
        men: 'Vyrų',
        styling: 'Šukuosenos',
        kids: 'Vaikų',
        video: 'Procesas',
      },
      itemAlt: (cat, idx) => {
        const map = {
          women: 'moterų kirpimas',
          men: 'vyrų kirpimas',
          styling: 'šukuosena arba plaukų formavimas',
          kids: 'vaikų kirpimas',
        };
        return `Kirpėja Virginija Kaune – ${map[cat] ?? 'kirpėjos darbas'} ${idx}`;
      },
      videoAlt: (id) => `Kirpėja Virginija Kaune – darbo proceso video ${id}`,
      videoLabel: 'VIDEO',
      gridAria: 'Kirpėjos darbų galerija',
      filterAria: 'Galerijos kategorijų pasirinkimas',
      openPhoto: (cat, idx) => `Atidaryti nuotrauką: ${t.LT.itemAlt(cat, idx)}`,
      openVideo: (id) => `Atidaryti video ${id}`,
      modalImageAlt: (cat, idx) =>
        `Padidinta nuotrauka: ${t.LT.itemAlt(cat, idx)}`,
    },
    EN: {
      title: 'Gallery',
      desc: 'Hairdresser Virginija in Kaunas – gallery of women’s, men’s and children’s haircuts, hairstyles and hair styling work. View completed work and book your appointment online.',
      more: 'Show more',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      cats: {
        all: 'All',
        women: "Women's",
        men: "Men's",
        styling: 'Styling',
        kids: "Kids'",
        video: 'Process',
      },
      itemAlt: (cat, idx) => {
        const map = {
          women: "women's haircut",
          men: "men's haircut",
          styling: 'hairstyle or hair styling',
          kids: "kids' haircut",
        };
        return `Hairdresser Virginija in Kaunas – ${map[cat] ?? 'hair work'} ${idx}`;
      },
      videoAlt: (id) => `Hairdresser Virginija in Kaunas – process video ${id}`,
      videoLabel: 'VIDEO',
      gridAria: 'Hairdresser work gallery',
      filterAria: 'Gallery category selection',
      openPhoto: (cat, idx) => `Open photo: ${t.EN.itemAlt(cat, idx)}`,
      openVideo: (id) => `Open video ${id}`,
      modalImageAlt: (cat, idx) => `Large image: ${t.EN.itemAlt(cat, idx)}`,
    },
  };

  const allItems = useMemo(() => {
    const imgs = buildImageItems();
    const vids = VIDEO_ITEMS.map((v) => ({
      id: v.id,
      type: 'video',
      category: 'video',
      poster: v.poster,
      src: v.src,
      titleKey: v.titleKey,
    }));
    return [...imgs, ...vids];
  }, []);

  const counts = useMemo(() => {
    return {
      all: allItems.length,
      women: allItems.filter((x) => x.category === 'women').length,
      men: allItems.filter((x) => x.category === 'men').length,
      styling: allItems.filter((x) => x.category === 'styling').length,
      kids: allItems.filter((x) => x.category === 'kids').length,
      video: allItems.filter((x) => x.category === 'video').length,
    };
  }, [allItems]);

  const filtered = useMemo(() => {
    if (activeCat === 'all') return allItems;
    return allItems.filter((x) => x.category === activeCat);
  }, [activeCat, allItems]);

  useEffect(() => {
    setVisible(12);
  }, [activeCat]);

  const selectedIndex = useMemo(() => {
    if (!selectedId) return -1;
    return filtered.findIndex((x) => x.id === selectedId);
  }, [selectedId, filtered]);

  const selectedItem = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  const galleryStructuredData = useMemo(() => {
    const images = allItems
      .filter((item) => item.type === 'image')
      .slice(0, 20)
      .map((item) => ({
        '@type': 'ImageObject',
        contentUrl: `${SITE_URL.replace(/\/$/, '')}${item.full}`,
        thumbnailUrl: `${SITE_URL.replace(/\/$/, '')}${item.thumb}`,
        name: t[lang].itemAlt(item.category, item.index),
      }));

    const videos = allItems
      .filter((item) => item.type === 'video')
      .map((item) => ({
        '@type': 'VideoObject',
        name:
          lang === 'LT' ? 'Kirpėjos darbo procesas' : 'Hairdressing process',
        contentUrl: `${SITE_URL.replace(/\/$/, '')}${item.src}`,
        thumbnailUrl: `${SITE_URL.replace(/\/$/, '')}${item.poster}`,
      }));

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: lang === 'LT' ? 'Kirpėjos darbų galerija' : 'Hairdresser gallery',
      url: SITE_URL,
      about: {
        '@type': 'HairSalon',
        name: 'Kirpėja Virginija',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Pramonės pr. 15A',
          addressLocality: 'Kaunas',
          addressCountry: 'LT',
        },
      },
      hasPart: [...images, ...videos],
    });
  }, [allItems, lang]);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('galerija');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        window.gtag?.('event', 'scroll_gallery', {
          event_category: 'scroll',
          event_label: 'Reached Gallery Section',
        });
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeModal = () => {
    window.gtag?.('event', 'gallery_close', {
      event_category: 'engagement',
      event_label: 'Modal closed',
    });
    setSelectedId(null);
  };

  const showNext = () => {
    if (!filtered.length) return;
    setSelectedId((prev) => {
      const curr = filtered.findIndex((x) => x.id === prev);
      const next = (curr + 1) % filtered.length;
      return filtered[next].id;
    });
  };

  const showPrev = () => {
    if (!filtered.length) return;
    setSelectedId((prev) => {
      const curr = filtered.findIndex((x) => x.id === prev);
      const next = (curr - 1 + filtered.length) % filtered.length;
      return filtered[next].id;
    });
  };

  useEffect(() => {
    if (!selectedId) return;

    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, filtered]);

  const canLoadMore = visible < filtered.length;

  return (
    <section
      id='galerija'
      className='py-20 bg-[#F8F7F4]'
      aria-labelledby='gallery-heading'
    >
      <Helmet>
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
        <meta property='og:url' content={SITE_URL} />
        <meta property='og:image' content={`${SITE_URL}logo.png`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content={`${t[lang].title} | Kirpėja Virginija`}
        />
        <meta name='twitter:description' content={t[lang].desc} />
        <meta name='twitter:image' content={`${SITE_URL}logo.png`} />

        {/* Jeigu galerija yra tik homepage sekcija, canonical turi likti pagrindinis */}
        <link rel='canonical' href={SITE_URL} />

        <script type='application/ld+json'>{galleryStructuredData}</script>

        {filtered
          .filter((x) => x.type === 'image')
          .slice(0, 3)
          .map((img) => (
            <link key={img.id} rel='preload' as='image' href={img.thumb} />
          ))}
      </Helmet>

      <div className='max-w-6xl mx-auto px-6'>
        <h2
          id='gallery-heading'
          className='text-3xl font-serif text-center mb-4 text-[#3E3B38]'
        >
          {t[lang].title}
        </h2>

        <p className='max-w-3xl mx-auto text-center text-sm md:text-base text-[#6B6966] mb-8'>
          {lang === 'LT'
            ? 'Peržiūrėkite Kirpėjos Virginijos atliktus moterų, vyrų ir vaikų kirpimus, šukuosenas bei kitus plaukų formavimo darbus Kaune.'
            : 'Browse women’s, men’s and children’s haircuts, hairstyles and other hair styling work by Hairdresser Virginija in Kaunas.'}
        </p>

        <div
          className='flex flex-wrap justify-center gap-2 mb-10'
          aria-label={t[lang].filterAria}
        >
          {[
            { id: 'all', label: t[lang].cats.all },
            { id: 'women', label: t[lang].cats.women },
            { id: 'men', label: t[lang].cats.men },
            { id: 'styling', label: t[lang].cats.styling },
            { id: 'kids', label: t[lang].cats.kids },
            { id: 'video', label: `🎥 ${t[lang].cats.video}` },
          ].map((c) => {
            const active = activeCat === c.id;
            return (
              <button
                key={c.id}
                type='button'
                aria-pressed={active}
                aria-label={`${c.label} (${counts[c.id] ?? 0})`}
                onClick={() => {
                  setActiveCat(c.id);
                  window.gtag?.('event', 'gallery_filter', {
                    event_category: 'engagement',
                    event_label: `category_${c.id}`,
                  });
                }}
                className={[
                  'px-4 py-2 rounded-full text-sm font-medium transition',
                  'border focus:outline-none focus:ring-2 focus:ring-[#C1A173]/60',
                  active
                    ? 'bg-[#C1A173] text-white border-[#C1A173]'
                    : 'bg-white/60 text-[#3E3B38] border-black/10 hover:bg-white',
                ].join(' ')}
              >
                {c.label}{' '}
                <span
                  className={active ? 'text-white/90' : 'text-[#3E3B38]/60'}
                >
                  ({counts[c.id] ?? 0})
                </span>
              </button>
            );
          })}
        </div>

        <div
          className='grid grid-cols-2 md:grid-cols-3 gap-4'
          aria-label={t[lang].gridAria}
        >
          {filtered.slice(0, visible).map((item, idx) => {
            if (item.type === 'video') {
              return (
                <button
                  key={item.id}
                  type='button'
                  onClick={() => {
                    setSelectedId(item.id);
                    window.gtag?.('event', 'gallery_open_video', {
                      event_category: 'engagement',
                      event_label: `video_${item.id}`,
                    });
                  }}
                  className='relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-[#C1A173] transition-all aspect-[9/16]'
                  aria-label={t[lang].openVideo(item.id)}
                >
                  <img
                    src={item.poster}
                    alt={t[lang].videoAlt(item.id)}
                    loading={idx < 1 ? 'eager' : 'lazy'}
                    fetchPriority={idx < 1 ? 'high' : 'auto'}
                    decoding='async'
                    className='object-cover w-full h-full bg-[#EDEBE8]'
                  />
                  <div className='absolute inset-0 bg-black/25 group-hover:bg-black/35 transition' />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='bg-white/90 rounded-full p-4 shadow-xl group-hover:scale-105 transition'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='26'
                        height='26'
                        viewBox='0 0 24 24'
                        fill='black'
                      >
                        <path d='M8 5v14l11-7z' />
                      </svg>
                    </div>
                  </div>
                  <span className='absolute top-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded'>
                    {t[lang].videoLabel}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type='button'
                onClick={() => {
                  setSelectedId(item.id);
                  window.gtag?.('event', 'gallery_open', {
                    event_category: 'engagement',
                    event_label: `photo_${item.id}`,
                  });
                }}
                style={{
                  contentVisibility: 'auto',
                  containIntrinsicSize: '320px 256px',
                }}
                className='relative overflow-hidden rounded-xl group focus:outline-none focus:ring-2 focus:ring-[#C1A173] transition-all'
                aria-label={t[lang].openPhoto(item.category, item.index)}
              >
                <img
                  src={item.thumb}
                  alt={t[lang].itemAlt(item.category, item.index)}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  fetchPriority={idx < 2 ? 'high' : 'auto'}
                  decoding='async'
                  width='400'
                  height='400'
                  className='object-cover w-full h-44 sm:h-56 md:h-64 transition-transform duration-300 group-hover:scale-105 bg-[#EDEBE8]'
                />
              </button>
            );
          })}
        </div>

        {canLoadMore && (
          <div className='text-center mt-10'>
            <Button
              onClick={() => {
                setVisible((v) => v + 9);
                window.gtag?.('event', 'gallery_load_more', {
                  event_category: 'engagement',
                  event_label: `Load more pressed (now visible ${Math.min(
                    visible + 9,
                    filtered.length,
                  )})`,
                });
              }}
              className='px-6 py-2'
            >
              {t[lang].more}
            </Button>
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn'
          onClick={closeModal}
          role='dialog'
          aria-modal='true'
          aria-label={lang === 'LT' ? 'Galerijos peržiūra' : 'Gallery preview'}
        >
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className='absolute top-6 right-6 text-white bg-black/50 hover:bg-black/70 backdrop-blur-md px-4 py-2 rounded-full text-xl font-semibold z-50 transition'
            aria-label={t[lang].close}
          >
            ✕
          </button>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className='hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-3 z-50 transition select-none'
            aria-label={t[lang].prev}
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

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className='hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-3 z-50 transition select-none'
            aria-label={t[lang].next}
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

          {selectedItem.type === 'image' ? (
            <img
              src={selectedItem.full}
              alt={t[lang].modalImageAlt(
                selectedItem.category,
                selectedItem.index,
              )}
              className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border border-white/10 animate-zoomIn'
              loading='eager'
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) =>
                (touchStartRef.current = e.touches[0].clientX)
              }
              onTouchEnd={(e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = endX - touchStartRef.current;
                if (diff > 50) showPrev();
                if (diff < -50) showNext();
              }}
            />
          ) : (
            <div
              className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border border-white/10 bg-black/20 animate-zoomIn overflow-hidden'
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) =>
                (touchStartRef.current = e.touches[0].clientX)
              }
              onTouchEnd={(e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = endX - touchStartRef.current;
                if (diff > 50) showPrev();
                if (diff < -50) showNext();
              }}
            >
              <video
                controls
                autoPlay
                playsInline
                preload='metadata'
                className='max-h-[90vh] max-w-[90vw]'
                aria-label={t[lang].videoAlt(selectedItem.id)}
                onPlay={() => {
                  window.gtag?.('event', 'video_play', {
                    event_category: 'engagement',
                    event_label: `video_${selectedItem.id}`,
                  });
                }}
              >
                <source src={selectedItem.src} type='video/mp4' />
              </video>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
