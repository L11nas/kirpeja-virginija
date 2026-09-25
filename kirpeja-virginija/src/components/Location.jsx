import { useState } from 'react';
import { MapPin, Clock, Bus, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS, GOOGLE_MAPS_URL } from '../data/business';

const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Pramon%C4%97s+pr.+15A,+51327+Kaunas&z=16&output=embed';
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Pramon%C4%97s+pr.+15A,+51327+Kaunas';

const T = {
  lt: {
    title: 'Kaip atvykti',
    address: 'Adresas',
    hours: 'Darbo laikas',
    transport: 'Viešasis transportas',
    transportText: 'Netoliese stoja 33 ir 41 maršruto autobusai. Patogu atvykti iš Dainavos, Petrašiūnų, Šančių, Eigulių ir Žaliakalnio.',
    phone: 'Telefonas',
    showMap: 'Rodyti žemėlapį',
    mapNote: 'Žemėlapis įkeliamas iš Google Maps tik jį atidarius.',
    directions: 'Maršrutas Google Maps',
    mapTitle: 'Kirpėjos Virginijos vieta žemėlapyje – Pramonės pr. 15A, Kaunas',
  },
  en: {
    title: 'How to find us',
    address: 'Address',
    hours: 'Opening hours',
    transport: 'Public transport',
    transportText: 'Buses 33 and 41 stop nearby. Easy to reach from Dainava, Petrašiūnai, Šančiai, Eiguliai and Žaliakalnis.',
    phone: 'Phone',
    showMap: 'Show map',
    mapNote: 'The map loads from Google Maps only when opened.',
    directions: 'Directions in Google Maps',
    mapTitle: 'Hairdresser Virginija location – Pramonės pr. 15A, Kaunas',
  },
};

export default function Location() {
  const { l } = useLanguage();
  const t = T[l];
  const [showMap, setShowMap] = useState(false);

  const rows = [
    { icon: MapPin, label: t.address, value: `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`, href: GOOGLE_MAPS_URL },
    { icon: Clock, label: t.hours, value: BUSINESS.hours[l] },
    { icon: Bus, label: t.transport, value: t.transportText },
    { icon: Phone, label: t.phone, value: BUSINESS.phoneDisplay, href: `tel:${BUSINESS.phone}` },
  ];

  return (
    <section id='kaip-atvykti' className='py-20 bg-sand' aria-labelledby='location-heading'>
      <div className='max-w-5xl mx-auto px-6'>
        <h2 id='location-heading' className='text-3xl font-serif text-center text-ink mb-10'>
          {t.title}
        </h2>

        <div className='grid md:grid-cols-2 gap-8 items-stretch'>
          <ul className='space-y-5'>
            {rows.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className='flex gap-3 items-start'>
                <Icon size={22} className='text-gold shrink-0 mt-0.5' aria-hidden='true' />
                <div>
                  <p className='text-sm text-muted'>{label}</p>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className='text-ink underline hover:text-gold-dark'
                    >
                      {value}
                    </a>
                  ) : (
                    <p className='text-ink'>{value}</p>
                  )}
                </div>
              </li>
            ))}
            <li>
              <a
                href={DIRECTIONS_URL}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() =>
                  window.gtag?.('event', 'maps_click', {
                    link_location: 'location',
                    destination: 'google_maps_directions',
                  })
                }
                className='inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold text-ink hover:bg-white transition'
              >
                {t.directions}
              </a>
            </li>
          </ul>

          <div className='relative min-h-[280px] rounded-2xl overflow-hidden border border-line bg-sand-deep'>
            {showMap ? (
              <iframe
                src={MAP_EMBED_URL}
                title={t.mapTitle}
                className='absolute inset-0 w-full h-full border-0'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                allowFullScreen
              />
            ) : (
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center'>
                <MapPin size={40} className='text-gold' aria-hidden='true' />
                <button
                  type='button'
                  onClick={() => {
                    setShowMap(true);
                    window.gtag?.('event', 'map_open', { link_location: 'location' });
                  }}
                  className='px-6 py-2 rounded-full bg-gold-dark text-white font-medium hover:bg-gold-darker transition'
                >
                  {t.showMap}
                </button>
                <p className='text-xs text-muted'>{t.mapNote}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
