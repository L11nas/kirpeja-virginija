import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  const t = {
    LT: {
      address: '📍 Pramonės pr. 15A, Kaunas',
      phone: '📞 +370 6xx xxx xx',
      hours: '🕒 I–V 9:00–19:00, VI 9:00–15:00',
      rights: 'Svetainę sukūrė Linas Ulevičius.',
    },
    EN: {
      address: '📍 Pramonės Ave. 15A, Kaunas',
      phone: '📞 +370 6xx xxx xx',
      hours: '🕒 Mon–Fri 9:00–19:00, Sat 9:00–15:00',
      rights: 'Website created by Linas Ulevičius.',
    },
  };

  return (
    <footer className='bg-white py-10 border-t border-[#e5e4e1]'>
      <div className='max-w-5xl mx-auto text-center text-[#3E3B38] space-y-2'>
        <p className='font-serif text-lg'>Kirpėja Virginija</p>
        <p>{t[lang].address}</p>
        <p>{t[lang].phone}</p>
        <p>{t[lang].hours}</p>
        <p className='text-sm text-[#777] mt-4'>
          © {new Date().getFullYear()} Kirpėja Virginija. {t[lang].rights}
        </p>
      </div>
    </footer>
  );
}
