import { Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS, TREATWELL_BOOK_URL } from '../data/business';

// Telefone visada matoma registracijos juosta ekrano apačioje.
export default function StickyBookingBar() {
  const { l } = useLanguage();

  const track = (event, label) =>
    window.gtag?.('event', event, {
      link_location: 'sticky_bar',
      device_type: 'mobile',
      event_label: label,
    });

  return (
    <div className='md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-line px-4 py-3 flex gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]'>
      <a
        href={`tel:${BUSINESS.phone}`}
        onClick={() => track('phone_click', 'sticky_call')}
        className='flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-black/10 bg-sand'
        aria-label={l === 'lt' ? 'Skambinti kirpėjai Virginijai' : 'Call Hairdresser Virginija'}
      >
        <Phone size={20} className='text-gold' />
      </a>
      <a
        href={TREATWELL_BOOK_URL}
        target='_blank'
        rel='noopener noreferrer'
        onClick={() => track('booking_click', 'sticky_booking')}
        className='flex-1 flex items-center justify-center h-12 rounded-full bg-gold-dark text-white font-medium shadow-[0_3px_8px_rgba(0,0,0,0.15)]'
      >
        {l === 'lt' ? 'Registruokis internetu' : 'Book online'}
      </a>
    </div>
  );
}
