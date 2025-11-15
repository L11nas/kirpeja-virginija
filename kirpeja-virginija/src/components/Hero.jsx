import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
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
      role='region'
      aria-labelledby='hero-title'
      className='relative h-[75vh] flex items-center justify-center overflow-hidden'
    >
      {/* Background image - decorative */}
      <img
        src='/img/hero-bg.webp'
        alt=''
        aria-hidden='true'
        loading='eager'
        decoding='async'
        fetchPriority='high'
        className='absolute inset-0 w-full h-full object-cover hero-animate'
      />

      {/* White fade overlay for better contrast */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-white/80' />

      {/* Text content */}
      <div className='relative z-10 text-center px-4'>
        <h1
          id='hero-title'
          className='text-4xl md:text-5xl font-serif text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)] mb-4 tracking-wide'
        >
          {t[lang].title}
        </h1>

        <p className='text-white text-lg md:text-xl max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_5px_rgba(0,0,0,0.7)]'>
          {t[lang].subtitle}
        </p>

        <Button
          label={t[lang].button}
          href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
          className='mt-8'
        />
      </div>
    </section>
  );
}
