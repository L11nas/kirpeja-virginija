// src/components/BackToTop.jsx

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Rodyti mygtuką tik kai nuscrollina žemyn
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label='Grįžti į viršų'
      className={`
        fixed bottom-6 right-6 z-50
        backdrop-blur-lg bg-white/30
        shadow-[0_8px_20px_rgba(0,0,0,0.25)]
        border border-white/40
        text-[#C1A173]
        w-12 h-12 rounded-full
        flex items-center justify-center
        transition-all duration-300
        ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
      <ChevronUp size={24} strokeWidth={2} />
    </button>
  );
}
