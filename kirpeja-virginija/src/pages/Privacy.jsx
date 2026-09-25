import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/Seo';

export default function Privacy() {
  const { lang, pathFor } = useLanguage();

  const t = {
    LT: {
      title: 'Privatumo politika',
      back: 'Grįžti į pradžią',

      intro:
        'Ši svetainė tvarko tik minimalius duomenis, reikalingus paslaugų teikimui ir svetainės veikimui.',

      controllerTitle: '1. Duomenų valdytojas',
      controllerText: 'Kirpėja Virginija, individuali veikla, Kaunas, Lietuva.',

      dataTitle: '2. Kokius duomenis renkame',
      data: [
        'Google Analytics lankomumo statistika (anoniminiai duomenys)',
        'Kontaktinė informacija susisiekus telefonu ar registracijos sistemoje',
        'Klientų darbų nuotraukos (tik su aiškiu sutikimu)',
      ],

      photosTitle: '3. Nuotraukų naudojimas',
      photosText:
        'Nuotraukos publikuojamos tik gavus kliento sutikimą. Bet kuriuo metu galite paprašyti jas pašalinti susisiekę telefonu ar el. paštu.',

      thirdTitle: '4. Trečiosios šalys',
      third: [
        'Google Analytics – svetainės statistikai',
        'Treatwell – registracijos ir rezervacijų sistemai',
      ],

      cookiesTitle: '5. Slapukai',
      cookiesText:
        'Statistiniai slapukai (Google Analytics) įjungiami tik gavus Jūsų sutikimą. Sutikimą bet kada galite pakeisti paspaudę „Slapukų nustatymai“ puslapio apačioje. Jūsų pasirinkimas saugomas tik Jūsų naršyklėje.',

      rightsTitle: '6. Jūsų teisės',
      rightsText:
        'Turite teisę susipažinti su savo duomenimis, juos ištaisyti ar prašyti ištrinti. Dėl to galite susisiekti nurodytais kontaktais.',

      contactTitle: '7. Kontaktai',
      contactText:
        'Dėl bet kokių klausimų apie privatumo apsaugą susisiekite telefonu +370 654 60937.',
    },

    EN: {
      title: 'Privacy Policy',
      back: 'Back to home',

      intro:
        'This website processes only minimal data necessary for providing services and ensuring proper site functionality.',

      controllerTitle: '1. Data Controller',
      controllerText:
        'Hairdresser Virginija, individual activity, Kaunas, Lithuania.',

      dataTitle: '2. What data we collect',
      data: [
        'Anonymous Google Analytics statistics',
        'Contact information when calling or booking',
        'Client work photos (only with explicit consent)',
      ],

      photosTitle: '3. Photo usage',
      photosText:
        'Photos are published only with the client’s consent. You may request removal at any time by contacting us.',

      thirdTitle: '4. Third parties',
      third: [
        'Google Analytics – for statistics',
        'Treatwell – for booking system',
      ],

      cookiesTitle: '5. Cookies',
      cookiesText:
        'Statistical cookies (Google Analytics) are enabled only with your consent. You can change your choice at any time via “Cookie settings” at the bottom of the page. Your choice is stored only in your browser.',

      rightsTitle: '6. Your rights',
      rightsText:
        'You have the right to access, correct or delete your data by contacting us.',

      contactTitle: '7. Contact',
      contactText:
        'For any privacy-related questions please contact +370 654 60937.',
    },
  };

  const L = t[lang];

  return (
    <section className='min-h-screen bg-sand py-20 px-6'>
      <Seo
        page='privacy'
        title={lang === 'LT' ? 'Privatumo politika | Kirpėja Virginija Kaune' : 'Privacy Policy | Hairdresser Virginija Kaunas'}
        description={
          lang === 'LT'
            ? 'Kirpėjos Virginijos svetainės privatumo politika: kokie duomenys renkami, slapukai ir Jūsų teisės.'
            : 'Privacy policy of Hairdresser Virginija website: collected data, cookies and your rights.'
        }
      />
      <div className='max-w-3xl mx-auto text-ink space-y-6 leading-relaxed'>
        <h1 className='text-3xl font-serif text-center mb-10'>{L.title}</h1>

        <p>{L.intro}</p>

        <h2 className='font-semibold'>{L.controllerTitle}</h2>
        <p>{L.controllerText}</p>

        <h2 className='font-semibold'>{L.dataTitle}</h2>
        <ul className='list-disc ml-6 space-y-1'>
          {L.data.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2 className='font-semibold'>{L.photosTitle}</h2>
        <p>{L.photosText}</p>

        <h2 className='font-semibold'>{L.thirdTitle}</h2>
        <ul className='list-disc ml-6 space-y-1'>
          {L.third.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h2 className='font-semibold'>{L.cookiesTitle}</h2>
        <p>{L.cookiesText}</p>

        <h2 className='font-semibold'>{L.rightsTitle}</h2>
        <p>{L.rightsText}</p>

        <h2 className='font-semibold'>{L.contactTitle}</h2>
        <p>{L.contactText}</p>

        {/* ===== BACK BUTTON APAČIOJE ===== */}
        <div className='pt-12 flex justify-center'>
          <Link
            to={pathFor('home')}
            className='px-6 py-3 rounded-full bg-gold-dark text-white font-medium hover:opacity-90 transition shadow-md'
          >
            ← {L.back}
          </Link>
        </div>
      </div>
    </section>
  );
}
