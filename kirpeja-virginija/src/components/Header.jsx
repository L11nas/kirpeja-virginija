import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { lang, setLang } = useLanguage();

  const t = {
    LT: {
      services: 'Paslaugos',
      gallery: 'Galerija',
      contact: 'Kontaktai',
      book: 'Registruokis',
      navLabel: 'Puslapio navigacija',
    },
    EN: {
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact',
      book: 'Book now',
      navLabel: 'Website navigation',
    },
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#e5e4e1]'
          : 'bg-white/90 backdrop-blur-md'
      }`}
      role='banner'
    >
      <div className='max-w-6xl mx-auto flex justify-between items-center py-3 px-6'>
        {/* Logo */}
        <a
          href='#hero'
          className='flex items-center gap-2 hover:opacity-90 transition'
        >
          <h1 className='leading-tight font-serif text-[#3E3B38]'>
            <span className='block text-lg'>Kirpėja</span>
            <span className='block -mt-1 text-primary'>Virginija</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav
          className='hidden md:flex items-center gap-6 text-[#3E3B38]'
          aria-label={t[lang].navLabel}
        >
          <a href='#paslaugos' className='hover:text-primary transition'>
            {t[lang].services}
          </a>

          <a href='#galerija' className='hover:text-primary transition'>
            {t[lang].gallery}
          </a>

          <a href='#kontaktai' className='hover:text-primary transition'>
            {t[lang].contact}
          </a>

          {/* Language Switch */}
          <div className='flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]'>
            {['LT', 'EN'].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                  lang === code
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-[#6B5A40] hover:bg-[#E8E2D8]'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* CTA — PREMIUM VARIANT A */}
          <a
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:bg-[#7a6643] transition-all'
          >
            {t[lang].book}
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-[#3E3B38]'
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav
          id='mobile-menu'
          aria-label={t[lang].navLabel}
          className='md:hidden bg-white border-t border-[#e5e4e1] text-center py-5 space-y-5'
        >
          <a
            href='#paslaugos'
            onClick={() => setMenuOpen(false)}
            className='block text-[#3E3B38] hover:text-primary'
          >
            {t[lang].services}
          </a>

          <a
            href='#galerija'
            onClick={() => setMenuOpen(false)}
            className='block text-[#3E3B38] hover:text-primary'
          >
            {t[lang].gallery}
          </a>

          <a
            href='#kontaktai'
            onClick={() => setMenuOpen(false)}
            className='block text-[#3E3B38] hover:text-primary'
          >
            {t[lang].contact}
          </a>

          {/* CTA — Mobile */}
          <a
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            className='inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:bg-[#7a6643] transition-all mx-auto'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t[lang].book}
          </a>

          {/* Mobile Language Switch */}
          <div className='flex justify-center'>
            <div className='flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setMenuOpen(false);
                  }}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                    lang === code
                      ? 'bg-primary text-white shadow-sm'
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
