import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { l, pathFor } = useLanguage();

  return (
    <section className='min-h-[70vh] flex items-center justify-center pt-24 pb-20 px-6 bg-sand text-center'>
      <Seo
        title={l === 'lt' ? 'Puslapis nerastas | Kirpėja Virginija' : 'Page not found | Hairdresser Virginija'}
        description={l === 'lt' ? 'Toks puslapis neegzistuoja.' : 'This page does not exist.'}
        noindex
      />
      <div>
        <p className='text-6xl font-serif text-gold mb-4'>404</p>
        <h1 className='text-2xl font-serif text-ink mb-6'>
          {l === 'lt' ? 'Puslapis nerastas' : 'Page not found'}
        </h1>
        <Link
          to={pathFor('home')}
          className='inline-block px-8 py-3 rounded-full bg-gold-dark text-white font-medium hover:bg-gold-darker transition'
        >
          {l === 'lt' ? 'Grįžti į pradžią' : 'Back to home'}
        </Link>
      </div>
    </section>
  );
}
