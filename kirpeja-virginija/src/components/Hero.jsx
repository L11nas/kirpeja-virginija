import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { lang } = useLanguage();

  const t = {
    LT: {
      title: 'Kai kirpimas tampa ritualu',
      subtitle:
        'Jaukioje aplinkoje skiriamas laikas ne tik kirpimui, bet ir poilsiui. Dėmesys detalėms, švara ir pagarba kiekvienam klientui.',
      button: 'Rezervuok laiką',
    },
    EN: {
      title: 'When a haircut becomes a ritual',
      subtitle:
        'In a cozy atmosphere, time is devoted not only to haircuts but also to relaxation. Attention to detail, cleanliness and respect for every client.',
      button: 'Book an appointment',
    },
  };

  return (
    <section
      id='hero'
      className='relative h-[75vh] flex items-center justify-center overflow-hidden'
      aria-label={
        lang === 'LT'
          ? 'Kirpyklos įžanginė dalis'
          : 'Salon introduction section'
      }
    >
      {/* Background image */}
      <img
        src='/img/hero-bg.webp'
        alt={
          lang === 'LT'
            ? 'Kirpyklos įrankiai ant stalo'
            : 'Hairdresser tools on a table'
        }
        loading='eager'
        decoding='async'
        fetchPriority='high'
        className='absolute inset-0 w-full h-full object-cover hero-animate'
      />

      {/* Subtle light-to-white fade at bottom */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-white/90' />

      {/* Text content */}
      <div className='relative z-10 text-center px-4'>
        <h1 className='text-4xl md:text-5xl font-serif text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] mb-4 tracking-wide'>
          {t[lang].title}
        </h1>
        <p className='text-white/90 text-lg md:text-xl max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]'>
          {t[lang].subtitle}
        </p>
        <a
          href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block mt-8 px-10 py-3 bg-[#C1A173] hover:bg-[#a88b5f] text-white font-medium rounded-md transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C1A173] focus:ring-offset-2'
        >
          {t[lang].button}
        </a>
      </div>
    </section>
  );
}
