import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    window.gtag?.('event', 'view_hero', {
      event_category: 'section_view',
      event_label: 'Hero section viewed',
    });
  }, []);

  const t = {
    LT: {
      title: 'Jauki aplinka. Profesionalus dėmesys. Tobulas rezultatas.',
      subtitle:
        'Jaukioje aplinkoje skiriamas laikas ne tik kirpimui, bet ir poilsiui. Dėmesys detalėms, švara ir pagarba kiekvienam klientui.',
      button: 'Rezervuok laiką',
      alt: 'Kirpyklos įrankiai ant medinio stalo',
      aria: 'Kirpyklos įžanginė skiltis su foniniu vaizdu',
    },
    EN: {
      title: 'Cozy environment. Professional attention. Perfect result.',
      subtitle:
        'In a cozy atmosphere, time is devoted not only to haircuts but also to relaxation. Attention to detail, cleanliness and respect for every client.',
      button: 'Book an appointment',
      alt: 'Hairdressing tools on a wooden table',
      aria: 'Salon introduction section with background visual',
    },
  };

  return (
    <section
      id='hero'
      className='relative h-[75vh] flex items-center justify-center overflow-hidden'
      aria-label={t[lang].aria}
    >
      {/* Fallback image (rodoma kol video dar neužsikrovė) */}
      <img
        src='/img/hero-bg.webp'
        alt={t[lang].alt}
        loading='eager'
        decoding='async'
        fetchPriority='high'
        className={`absolute inset-0 w-full h-full object-cover hero-animate transition-opacity duration-500 ${
          videoReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* HERO VIDEO: public/hero/hero.mp4 */}
      <video
        className='absolute inset-0 w-full h-full object-cover pointer-events-none'
        style={{ filter: 'brightness(0.9)', transform: 'scale(1.05)' }}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        aria-hidden='true'
        onLoadedData={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
        onPlay={() => {
          window.gtag?.('event', 'hero_video_play', {
            event_category: 'engagement',
            event_label: 'Hero background video started',
          });
        }}
      >
        <source src='/hero/hero.mp4' type='video/mp4' />
      </video>

      {/* Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/90' />

      {/* Content */}
      <div className='relative z-10 text-center px-4'>
        <h1 className='text-4xl md:text-5xl font-serif text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] mb-4 tracking-wide'>
          {t[lang].title}
        </h1>

        <p className='text-white/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'>
          {t[lang].subtitle}
        </p>

        <Button
          as='a'
          href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
          target='_blank'
          rel='noopener noreferrer'
          className='mt-8 px-10'
          onClick={() => {
            window.gtag?.('event', 'booking_click', {
              event_category: 'engagement',
              event_label: 'Hero CTA',
            });
          }}
        >
          {t[lang].button}
        </Button>
      </div>
    </section>
  );
}
