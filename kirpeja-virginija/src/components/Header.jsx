import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { useLanguage } from '../context/LanguageContext';

const PHONE_TEL = 'tel:+37065460937';

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
      call: 'Skambinti',
    },
    EN: {
      services: 'Services',
      gallery: 'Gallery',
      contact: 'Contact',
      book: 'Book now',
      call: 'Call',
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
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

          {/* Call button (DESKTOP) */}
          <a
            href={PHONE_TEL}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3EF] text-[#3E3B38] border border-black/10 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#C1A173]/60'
            onClick={() => {
              window.gtag?.('event', 'call_click', {
                event_category: 'engagement',
                event_label: 'Header Desktop Call',
              });
            }}
            aria-label={t[lang].call}
          >
            <Phone size={18} className='text-[#C1A173]' />
            <span className='text-sm font-medium'>{t[lang].call}</span>
          </a>

          {/* Language Switch */}
          <div className='hidden md:flex items-center'>
            <div className='flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    window.gtag?.('event', 'language_switch', {
                      event_category: 'engagement',
                      event_label: `${lang} → ${code}`,
                    });
                    toggleLang();
                  }}
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

          {/* CTA */}
          <Button
            as='a'
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='px-5 py-2'
            onClick={() => {
              window.gtag?.('event', 'booking_click', {
                event_category: 'engagement',
                event_label: 'Header Desktop CTA',
              });
            }}
          >
            {t[lang].book}
          </Button>
        </nav>

        {/* Mobile Actions (Call + Hamburger) */}
        <div className='md:hidden flex items-center gap-2'>
          {/* Mobile Call button (VISADA MATOMAS) */}
          <a
            href={PHONE_TEL}
            className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F5F3EF] text-[#3E3B38] border border-black/10 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-[#C1A173]/60'
            onClick={() => {
              window.gtag?.('event', 'call_click', {
                event_category: 'engagement',
                event_label: 'Header Mobile Top Call',
              });
            }}
            aria-label={t[lang].call}
            title={t[lang].call}
          >
            <Phone size={18} className='text-[#C1A173]' />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className='text-[#3E3B38]'
            aria-label={menuOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
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

          {/* CTA (MOBILE) */}
          <Button
            as='a'
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noopener noreferrer'
            className='mx-auto px-6 py-2'
            onClick={() => {
              window.gtag?.('event', 'booking_click', {
                event_category: 'engagement',
                event_label: 'Header Mobile CTA',
              });
              setMenuOpen(false);
            }}
          >
            {t[lang].book}
          </Button>

          {/* Language Switch (Mobile) */}
          <div className='flex justify-center pt-2'>
            <div className='flex items-center bg-[#F5F3EF] rounded-full px-1 py-[3px]'>
              {['LT', 'EN'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    window.gtag?.('event', 'language_switch', {
                      event_category: 'engagement',
                      event_label: `${lang} → ${code}`,
                    });
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
