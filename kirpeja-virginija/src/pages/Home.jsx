import Seo from '../components/Seo';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Reviews from '../components/Reviews';
import Gallery from '../components/Gallery';
import Location from '../components/Location';
import Faq from '../components/Faq';
import { useLanguage } from '../context/LanguageContext';
import { FAQ } from '../data/faq';
import { SITE_URL } from '../data/business';

const META = {
  lt: {
    title: 'Kirpėja Kaune – Virginija | Moterų, vyrų ir vaikų kirpimas',
    description:
      'Kirpėja Kaune, Pramonės pr. 15A (Dainava): moterų kirpimas nuo 15 €, vyrų nuo 20 €, vaikų 15 €, šukuosenos, barzdos modeliavimas. Įvertinimas 5,0 (109 atsiliepimai).',
  },
  en: {
    title: 'Hairdresser in Kaunas – Virginija | Women’s, men’s & kids’ haircuts',
    description:
      'Hairdresser in Kaunas, Pramonės pr. 15A: women’s haircuts from 15 €, men’s from 20 €, children’s 15 €, styling and beard trims. Rated 5.0 from 109 reviews.',
  },
};

export default function Home() {
  const { l } = useLanguage();

  const schema = [
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q[l],
        acceptedAnswer: { '@type': 'Answer', text: f.a[l] },
      })),
    },
  ];

  return (
    <>
      <Seo page='home' title={META[l].title} description={META[l].description} schema={schema} />
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Gallery />
      <Location />
      <Faq />
    </>
  );
}
