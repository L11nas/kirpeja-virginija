import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funkcija kalbos keitimui į konkrečią reikšmę
  const setLanguage = (value) => {
    if (value !== lang) toggleLang();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#e5e4e1]'
          : 'bg-white/90 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className='max-w-6xl mx-auto flex justify-between items-center py-3 px-6'>
        {/* Logotipas + pavadinimas */}
        <a
          href='#hero'
          className='flex items-center gap-2 hover:opacity-90 transition'
        >
          <div className='leading-tight'>
            <span className='block font-serif text-lg text-[#3E3B38]'>
              Kirpėja
            </span>
            <span className='block font-serif text-[#3E3B38] tracking-wide'>
              Virginija
            </span>
          </div>
        </a>

        {/* Desktop meniu */}
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

          {/* Kalbos mygtukai */}
          <div className='flex items-center gap-2 border border-[#C1A173] rounded-md overflow-hidden'>
            <button
              onClick={() => setLanguage('LT')}
              className={`px-3 py-1 text-sm transition ${
                lang === 'LT'
                  ? 'bg-[#C1A173] text-white'
                  : 'text-[#C1A173] hover:bg-[#C1A173]/20'
              }`}
            >
              LT
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3 py-1 text-sm transition ${
                lang === 'EN'
                  ? 'bg-[#C1A173] text-white'
                  : 'text-[#C1A173] hover:bg-[#C1A173]/20'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noreferrer'
            className='bg-[#C1A173] hover:bg-[#a88b5f] text-white px-4 py-2 rounded-md transition'
          >
            {t[lang].book}
          </a>
        </nav>

        {/* Mobilus meniu piktograma */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-[#3E3B38]'
          aria-label='Meniu mygtukas'
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobilus išskleidžiamas meniu */}
      {menuOpen && (
        <div className='md:hidden bg-white border-t border-[#e5e4e1] text-center py-4 space-y-3'>
          <a
            href='#paslaugos'
            className='block text-[#3E3B38] hover:text-[#C1A173] transition'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].services}
          </a>
          <a
            href='#galerija'
            className='block text-[#3E3B38] hover:text-[#C1A173] transition'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].gallery}
          </a>
          <a
            href='#kontaktai'
            className='block text-[#3E3B38] hover:text-[#C1A173] transition'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].contact}
          </a>

          {/* Mobilus kalbos pasirinkimas */}
          <div className='flex justify-center gap-2'>
            <button
              onClick={() => {
                setLanguage('LT');
                setMenuOpen(false);
              }}
              className={`px-3 py-1 border border-[#C1A173] rounded-md text-sm transition ${
                lang === 'LT'
                  ? 'bg-[#C1A173] text-white'
                  : 'text-[#C1A173] hover:bg-[#C1A173]/20'
              }`}
            >
              LT
            </button>
            <button
              onClick={() => {
                setLanguage('EN');
                setMenuOpen(false);
              }}
              className={`px-3 py-1 border border-[#C1A173] rounded-md text-sm transition ${
                lang === 'EN'
                  ? 'bg-[#C1A173] text-white'
                  : 'text-[#C1A173] hover:bg-[#C1A173]/20'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href='https://book.treatwell.lt/salonas/kirpeja-virginija/'
            target='_blank'
            rel='noreferrer'
            className='block bg-[#C1A173] text-white mx-6 py-2 rounded-md hover:bg-[#a88b5f] transition'
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].book}
          </a>
        </div>
      )}
    </header>
  );
}
