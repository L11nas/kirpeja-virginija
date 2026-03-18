import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);

  const treatwellUrl = 'https://book.treatwell.lt/salonas/kirpeja-virginija/';

  useEffect(() => {
    window.gtag?.('event', 'view_hero', {
      event_category: 'section_view',
      event_label: 'Hero section viewed',
    });
  }, []);

  const t = {
    LT: {
      eyebrow: 'Kirpėja Kaune',
      title: 'Kirpėja Virginija Kaune – moterų, vyrų ir vaikų kirpimas',
      subtitle:
        'Jaukioje aplinkoje Kaune atliekamas moterų, vyrų ir vaikų kirpimas, skiriant dėmesį detalėms, švarai ir kiekvieno kliento patogumui.',
      button: 'Registruokis internetu',
      alt: 'Kirpėjos darbo vieta salone Kaune',
      aria: 'Pagrindinė kirpyklos skiltis su foniniu vaizdu',
      ctaAria: 'Registruotis vizitui internetu per Treatwell',
    },
    EN: {
      eyebrow: 'Hairdresser in Kaunas',
      title:
        'Hairdresser Virginija in Kaunas – women’s, men’s and children’s haircuts',
      subtitle:
        'In a cozy salon in Kaunas, women’s, men’s and children’s haircuts are provided with attention to detail, cleanliness and client comfort.',
      button: 'Book online',
      alt: 'Hairdresser workspace in a salon in Kaunas',
      aria: 'Main salon hero section with background visual',
      ctaAria: 'Book an appointment online via Treatwell',
    },
  };

  return (
    <section
      id='hero'
      className='relative h-[75vh] flex items-center justify-center overflow-hidden'
      aria-label={t[lang].aria}
    >
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

      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/90' />

      <div className='relative z-10 text-center px-4 max-w-4xl'>
        <p className='text-white/85 text-sm md:text-base uppercase tracking-[0.2em] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'>
          {t[lang].eyebrow}
        </p>

        <h1 className='text-4xl md:text-5xl font-serif text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] mb-4 tracking-wide'>
          {t[lang].title}
        </h1>

        <p className='text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'>
          {t[lang].subtitle}
        </p>

        <Button
          as='a'
          href={treatwellUrl}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={t[lang].ctaAria}
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
