import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { FACTS } from '../data/businessFacts';
import { trackSiteEvent } from '../utils/track';
import Icon from './Icon';
import './FloatingWhatsApp.css';

const DEFAULT_MESSAGE = 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים';

// The always-reachable action. Phones: a bar across the bottom with two
// buttons (emergency call, quick WhatsApp check), present at every scroll
// depth. Desktop: a WhatsApp pill that appears once the first CTA has scrolled away.
const FloatingWhatsApp = ({ message = DEFAULT_MESSAGE, label = 'בדיקה מהירה בוואטסאפ', location = 'floating' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const footer = document.querySelector('footer');
    const update = () => {
      frame = 0;
      // gone again once the footer (which opens with its own CTA) is on screen
      const atFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 120;
      setVisible(window.scrollY > 520 && !atFooter);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`fab${visible ? ' is-visible' : ''}`}>
            {/* Phones only: a call is the fastest route for someone locked out of WhatsApp */}
      <a
        className="fab__call"
        href={`tel:${FACTS.phone}`}
        onClick={() => trackSiteEvent('call_click', { channel: 'phone', cta_location: location, intent: 'contact' })}
        aria-label="חיוג מהיר"
      >
        <Icon name="phone" />
        <span>חיוג חירום</span>
      </a>
      <a
        className="fab__btn"
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWhatsAppClick(location)}
        aria-label="פתח שיחת WhatsApp"
      >
        <Icon name="whatsapp" />
        <span>{label}</span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
