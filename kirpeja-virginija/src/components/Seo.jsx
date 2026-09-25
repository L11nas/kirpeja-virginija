import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { PAGES } from '../data/routes';
import { BUSINESS, SITE_URL } from '../data/business';

export const OG_IMAGE = `${SITE_URL}/img/og-image.jpg`;

// Puslapio SEO žymos: title, description, canonical, hreflang, Open Graph
// ir papildomos (puslapiui specifinės) JSON-LD schemos.
export default function Seo({ page, title, description, schema, noindex }) {
  const { lang } = useLanguage();
  const isLT = lang === 'LT';
  const paths = page ? PAGES[page] : null;
  const canonical = paths ? `${SITE_URL}${paths[isLT ? 'lt' : 'en']}` : null;

  return (
    <Helmet>
      <html lang={isLT ? 'lt' : 'en'} />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta
        name='robots'
        content={
          noindex
            ? 'noindex, follow'
            : 'index, follow, max-image-preview:large, max-snippet:-1'
        }
      />

      {canonical && <link rel='canonical' href={canonical} />}
      {paths && <link rel='alternate' hrefLang='lt' href={`${SITE_URL}${paths.lt}`} />}
      {paths && <link rel='alternate' hrefLang='en' href={`${SITE_URL}${paths.en}`} />}
      {paths && (
        <link rel='alternate' hrefLang='x-default' href={`${SITE_URL}${paths.lt}`} />
      )}

      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={BUSINESS.name} />
      {canonical && <meta property='og:url' content={canonical} />}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={OG_IMAGE} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta
        property='og:image:alt'
        content={isLT ? 'Kirpėjos Virginijos salonas Kaune' : 'Hairdresser Virginija salon in Kaunas'}
      />
      <meta property='og:locale' content={isLT ? 'lt_LT' : 'en_GB'} />
      <meta property='og:locale:alternate' content={isLT ? 'en_GB' : 'lt_LT'} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={OG_IMAGE} />

      {schema && (
        <script type='application/ld+json'>
          {JSON.stringify({ '@context': 'https://schema.org', '@graph': schema })}
        </script>
      )}
    </Helmet>
  );
}
