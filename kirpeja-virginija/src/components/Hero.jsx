import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import { useEffect } from 'react';
export default function Hero() {
  const { lang } = useLanguage();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'view_hero', {
        event_category: 'section_view',
        event_label: 'Hero section viewed',
      });
    }
  }, []);
  const t = {
    LT: {
      title: 'Kai kirpimas tampa ritualu',
      subtitle:
        'Jaukioje aplinkoje skiriamas laikas ne tik kirpimui, bet ir poilsiui. Dėmesys detalėms, švara ir pagarba kiekvienam klientui.',
      button: 'Rezervuok laiką',
      alt: 'Kirpyklos įrankiai ant medinio stalo',
      aria: 'Kirpyklos įžanginė skiltis su foniniu darbo įrankių paveikslu',
    },
    EN: {
      title: 'When a haircut becomes a ritual',
      subtitle:
        'In a cozy atmosphere, time is devoted not only to haircuts but also to relaxation. Attention to detail, cleanliness and respect for every client.',
      button: 'Book an appointment',
      alt: 'Hairdressing tools on a wooden table',
      aria: 'Salon introduction section with background image of hairdressing tools',
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
        className='absolute inset-0 w-full h-full object-cover hero-animate'
      />

      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-white/90' />

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
            if (window.gtag) {
              window.gtag('event', 'booking_click', {
                event_category: 'engagement',
                event_label: 'Hero CTA',
              });
            }
          }}
        >
          {t[lang].button}
        </Button>
      </div>
    </section>
  );
}
