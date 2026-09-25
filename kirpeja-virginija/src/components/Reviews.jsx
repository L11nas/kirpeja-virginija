import { Star } from 'lucide-react';
import { useEffect } from 'react';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS } from '../data/business';

const TREATWELL_BOOK_URL =
  'https://book.treatwell.lt/salonas/kirpeja-virginija/';
const TREATWELL_REVIEWS_URL =
  'https://www.treatwell.lt/salonas/kirpeja-virginija/';

const RATING = BUSINESS.rating;
const REVIEW_COUNT = BUSINESS.reviewCount;

const SUBRATINGS = [
  { key: 'atmosphere', value: 5 },
  { key: 'staff', value: 5 },
  { key: 'cleanliness', value: 5 },
];

const TESTIMONIALS = [
  {
    id: 'tomas',
    rating: 5,
    quote: {
      lt: 'Tikra savo srities specialistė. Viskas puikiai. Sėkmės darbuose!',
      en: 'A true specialist in her field. Everything was great. Best of luck!',
    },
    author: 'Tomas',
  },
  {
    id: 'ausra',
    rating: 5,
    quote: {
      lt: 'Ačiū, labai gražiai apkirpo ir davė daug patarimų.',
      en: 'Thank you – a lovely haircut and lots of useful advice.',
    },
    author: 'Aušra',
  },
  {
    id: 'vytaute',
    rating: 5,
    quote: {
      lt: 'Labai faina kirpėja :) Didžiausios rekomendacijos!',
      en: 'Such a lovely hairdresser :) Highly recommended!',
    },
    author: 'Vytautė',
  },
  {
    id: 'sigitas',
    rating: 5,
    quote: {
      lt: 'Labai įdėmi ir įsiklausanti specialistė.',
      en: 'Very attentive specialist who really listens.',
    },
    author: 'Sigitas',
    service: { lt: 'Vyriškas kirpimas', en: "Men's haircut" },
  },
  {
    id: 'jovita',
    rating: 5,
    quote: {
      lt: 'Puikiai atliko savo darbą, buvo malonu būti, išėjus iš kirpyklos jaučiausi laiminga.',
      en: 'She did a wonderful job, it was a pleasure being there — I left the salon feeling happy.',
    },
    author: 'Jovita',
    service: { lt: 'Plaukų procedūros', en: 'Hair treatment' },
  },
];

function Stars({ count = 5, size = 18, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < count
              ? 'fill-gold text-gold'
              : 'fill-transparent text-white/25'
          }
        />
      ))}
    </span>
  );
}

export default function Reviews() {
  const { lang } = useLanguage();

  const trackEvent = (eventName, params = {}) => {
    window.gtag?.('event', eventName, {
      language: lang,
      page_path: window.location.pathname,
      page_location: window.location.href,
      ...params,
    });
  };

  const t = {
    LT: {
      eyebrow: 'Atsiliepimai',
      title: 'Klientų įvertinimai Treatwell',
      subtitle: `Įvertinta ${REVIEW_COUNT} klientų – atmosfera, personalas ir švara įvertinti maksimaliais 5 žvaigždučių balais.`,
      ratingLabel: `${RATING.toFixed(1).replace('.', ',')} iš 5`,
      reviewCountLabel: `${REVIEW_COUNT} atsiliepimai`,
      readAll: 'Skaityti visus atsiliepimus Treatwell',
      readAllAria: 'Skaityti visus atsiliepimus svetainėje Treatwell',
      book: 'Registruokis internetu',
      bookAria: 'Registruotis vizitui internetu per Treatwell',
      subratings: {
        atmosphere: 'Atmosfera',
        staff: 'Personalas',
        cleanliness: 'Švara',
      },
      verified: 'Patvirtintas atsiliepimas',
      sectionAria: 'Klientų atsiliepimų skiltis',
    },
    EN: {
      eyebrow: 'Reviews',
      title: 'Client ratings on Treatwell',
      subtitle: `Rated by ${REVIEW_COUNT} clients – atmosphere, staff and cleanliness all scored a perfect 5 out of 5.`,
      ratingLabel: `${RATING.toFixed(1)} out of 5`,
      reviewCountLabel: `${REVIEW_COUNT} reviews`,
      readAll: 'Read all reviews on Treatwell',
      readAllAria: 'Read all reviews on the Treatwell website',
      book: 'Book online',
      bookAria: 'Book an appointment online via Treatwell',
      subratings: {
        atmosphere: 'Atmosphere',
        staff: 'Staff',
        cleanliness: 'Cleanliness',
      },
      verified: 'Verified review',
      sectionAria: 'Client reviews section',
    },
  };

  const selectedLang = lang === 'LT' ? 'lt' : 'en';

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('atsiliepimai');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        window.gtag?.('event', 'scroll_reviews', {
          event_category: 'scroll',
          event_label: 'Reached Reviews Section',
        });
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id='atsiliepimai'
      className='py-20 bg-ink-deep text-white'
      aria-labelledby='reviews-heading'
      aria-label={t[lang].sectionAria}
    >
      <div className='max-w-5xl mx-auto px-6 text-center'>
        <p className='text-gold text-sm uppercase tracking-[0.2em] mb-3'>
          {t[lang].eyebrow}
        </p>

        <h2
          id='reviews-heading'
          className='text-3xl font-serif mb-4 text-white'
        >
          {t[lang].title}
        </h2>

        <div className='flex flex-col items-center gap-2 mb-3'>
          <span className='text-5xl font-serif text-white'>
            {t[lang].ratingLabel}
          </span>
          <Stars count={5} size={24} />
          <span className='text-sm text-white/70'>
            {t[lang].reviewCountLabel}
          </span>
        </div>

        <p className='max-w-2xl mx-auto text-sm md:text-base text-white/70 mb-10 leading-relaxed'>
          {t[lang].subtitle}
        </p>

        <div className='flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12'>
          {SUBRATINGS.map((s) => (
            <div key={s.key} className='flex flex-col items-center gap-1'>
              <span className='text-sm text-white/90 font-medium'>
                {t[lang].subratings[s.key]}
              </span>
              <Stars count={s.value} size={16} />
            </div>
          ))}
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mb-12'>
          {TESTIMONIALS.map((r) => (
            <div
              key={r.id}
              className='p-6 border border-white/10 rounded-xl bg-white/5'
            >
              <Stars count={r.rating} size={16} className='mb-3' />
              <p className='text-white/90 leading-relaxed mb-4'>
                “{r.quote[selectedLang]}”
              </p>
              <div className='flex items-center justify-between text-sm text-white/60'>
                <span className='font-medium text-gold'>{r.author}</span>
                {r.service && <span>{r.service[selectedLang]}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <a
            href={TREATWELL_REVIEWS_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t[lang].readAllAria}
            onClick={() =>
              trackEvent('reviews_link_click', {
                link_location: 'reviews',
                destination: 'treatwell_reviews',
              })
            }
            className='text-sm font-medium text-white underline hover:text-gold transition'
          >
            {t[lang].readAll}
          </a>

          <Button
            as='a'
            href={TREATWELL_BOOK_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={t[lang].bookAria}
            variant='light'
            className='px-8 py-3'
            onClick={() =>
              trackEvent('booking_click', {
                link_location: 'reviews',
                destination: 'treatwell',
                event_label: 'reviews_cta',
              })
            }
          >
            {t[lang].book}
          </Button>
        </div>
      </div>
    </section>
  );
}
