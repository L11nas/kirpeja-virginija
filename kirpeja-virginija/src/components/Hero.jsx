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
      className='relative h-[70vh] flex items-center justify-center overflow-hidden'
      id='hero'
    >
      {/* Background video */}
      <video
        className='absolute inset-0 w-full h-full object-cover'
        src='/hero.mp4'
        autoPlay
        muted
        loop
        playsInline
        preload='none'
      />
      <div className='absolute inset-0 bg-black/30' />

      {/* Text content */}
      <div className='relative z-10 text-center px-4'>
        <h1 className='text-4xl md:text-5xl font-serif text-white drop-shadow-lg'>
          {t[lang].title}
        </h1>
        <p className='text-white/90 text-lg mt-4 max-w-xl mx-auto'>
          {t[lang].subtitle}
        </p>
        <a
          href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
          target='_blank'
          rel='noreferrer'
          className='inline-block mt-8 px-8 py-3 bg-[#C1A173] text-white font-medium rounded-md hover:bg-[#a88b5f] transition'
        >
          {t[lang].button}
        </a>
      </div>
    </section>
  );
}
