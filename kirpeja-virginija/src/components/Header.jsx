import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLang } = useLanguage();

  // Translations
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

  // Scroll detection for shadow and hide-on-scroll effect
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
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#e5e4e1]'
          : 'bg-white/90 backdrop-blur-md border-b border-transparent'
      }`}
      role='banner'
      aria-label={
        lang === 'LT' ? 'Puslapio viršutinė navigacija' : 'Website navigation'
      }
    >
      <div className='max-w-6xl mx-auto flex justify-between items-center py-3 px-6'>
        {/* Logo (text-based for better SEO) */}
        <a
          href='#hero'
          className='flex items-center gap-2 hover:opacity-90 transition'
          aria-label={lang === 'LT' ? 'Grįžti į pradžią' : 'Back to top'}
        >
          <h1 className='leading-tight font-serif text-[#3E3B38]'>
            <span className='block text-lg'>Kirpėja</span>
            <span className='block -mt-1 text-[#C1A173]'>Virginija</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav
          className='hidden md:flex items-center gap-6 text-[#3E3B38]'
          role='navigation'
        >
          <a href='#paslaugos' className='hover:text-[#C1A173] transition'>
            {t[lang].services}
          </a>
          <a href='#galerija' className='hover:text-[#C1A173] transition'>
            {t[lang].gallery}
          </a>
          <a href='#kontaktai' className='hover:text-[#C1A173] transition'>
            {t[lang].contact}
          </a>

          {/* Language Switch */}
          <div
            className='flex items-center gap-2 border border-[#C1A173] rounded-md overflow-hidden'
            aria-label='Language selector'
          >
            {['LT', 'EN'].map((code) => (
              <button
                key={code}
                onClick={toggleLang}
                className={`px-3 py-1 text-sm transition ${
                  lang === code
                    ? 'bg-[#C1A173] text-white'
                    : 'text-[#C1A173] hover:bg-[#C1A173]/20'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* CTA link */}
          <a
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-[#C1A173] hover:bg-[#a88b5f] text-white px-4 py-2 rounded-md transition font-medium'
          >
            {t[lang].book}
          </a>
        </nav>

        {/* Mobile Menu Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-[#3E3B38]'
          aria-label={menuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav
          className='md:hidden bg-white border-t border-[#e5e4e1] text-center py-4 space-y-3'
          role='navigation'
        >
          {['paslaugos', 'galerija', 'kontaktai'].map((id, i) => (
            <a
              key={i}
              href={`#${id}`}
              className='block text-[#3E3B38] hover:text-[#C1A173] transition'
              onClick={() => setMenuOpen(false)}
            >
              {t[lang][id === 'paslaugos' ? 'services' : id]}
            </a>
          ))}
          <a
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='block bg-[#C1A173] text-white mx-6 py-2 rounded-md hover:bg-[#a88b5f] transition'
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
