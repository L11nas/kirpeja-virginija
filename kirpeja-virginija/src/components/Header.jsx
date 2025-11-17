import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../components/ui/Button'; // ← Apple-style button
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { lang, toggleLang } = useLanguage();

  const t = {
    LT: {
      services: 'Paslaugos',
      gallery: 'Galerija',
      contact: 'Kontaktai',
      book: 'Registruokis',
    },
    EN: {
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact',
      book: 'Book now',
    },
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      setHidden(current > lastScrollY && current > 80);
      lastScrollY = current;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#e5e4e1]'
          : 'bg-white/90 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className='max-w-6xl mx-auto flex justify-between items-center py-3 px-6'>
        {/* Logo */}
        <a
          href='#hero'
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
          className='flex items-center gap-2 hover:opacity-90 transition'
          aria-label={lang === 'LT' ? 'Grįžti į pradžią' : 'Back to top'}
        >
          <h1 className='leading-tight font-serif text-[#3E3B38]'>
            <span className='block text-lg'>Kirpėja</span>
            <span className='block -mt-1 text-[#C1A173]'>Virginija</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-6 text-[#3E3B38]'>
          <a href='#paslaugos' className='hover:text-[#C1A173] transition'>
            {t[lang].services}
          </a>

          <a href='#galerija' className='hover:text-[#C1A173] transition'>
            {t[lang].gallery}
          </a>

          <a href='#kontaktai' className='hover:text-[#C1A173] transition'>
            {t[lang].contact}
          </a>

          {/* Apple-style Language Switch */}
          <div className='hidden md:flex items-center'>
            <div className='flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  onClick={toggleLang}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
                    lang === code
                      ? 'bg-[#C1A173] text-white shadow-sm'
                      : 'text-[#6B5A40] hover:bg-[#E8E2D8]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Apple-style CTA Button (DESKTOP) */}
          <Button
            as='a'
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='px-5 py-2'
          >
            {t[lang].book}
          </Button>
        </nav>

        {/* Mobile icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-[#3E3B38]'
          aria-label={menuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <nav className='md:hidden bg-white border-t border-[#e5e4e1] text-center py-4 space-y-3'>
          <a
            href='#paslaugos'
            className='block hover:text-[#C1A173]'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].services}
          </a>

          <a
            href='#galerija'
            className='block hover:text-[#C1A173]'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].gallery}
          </a>

          <a
            href='#kontaktai'
            className='block hover:text-[#C1A173]'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].contact}
          </a>

          {/* Apple-style CTA Button (MOBILE) */}
          <Button
            as='a'
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-auto px-6 py-2'
          >
            {t[lang].book}
          </Button>

          {/* Apple-style Language Switch (Mobile) */}
          <div className='flex justify-center'>
            <div className='flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    toggleLang();
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-1 text-sm font-medium rounded-full ${
                    lang === code
                      ? 'bg-[#C1A173] text-white'
                      : 'text-[#6B5A40] hover:bg-[#E8E2D8]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
