import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  const t = {
    LT: {
      aria: 'Grįžti į viršų',
      title: 'Grįžti į viršų',
    },
    EN: {
      aria: 'Back to top',
      title: 'Back to top',
    },
  };

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.gtag?.('event', 'back_to_top_click', {
      event_category: 'engagement',
      event_label: 'Back To Top Button',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type='button'
      onClick={scrollTop}
      aria-label={t[lang].aria}
      title={t[lang].title}
      className={`
        fixed bottom-6 right-6 z-50
        backdrop-blur-lg bg-white/30
        shadow-[0_8px_20px_rgba(0,0,0,0.25)]
        border border-white/40
        text-[#C1A173]
        w-12 h-12 rounded-full
        flex items-center justify-center
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#C1A173]/60
        ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <ChevronUp size={24} strokeWidth={2} aria-hidden='true' />
    </button>
  );
}
