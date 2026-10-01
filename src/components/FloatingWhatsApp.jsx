import React, { useEffect, useState } from 'react';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import Icon from './Icon';
import './FloatingWhatsApp.css';

const DEFAULT_MESSAGE = 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים';

// The always-reachable action. A pill in the corner on desktop; on phones a
// bar across the bottom, under the thumb. It appears once the page's own
// first CTA has scrolled away, so there is never more than one on screen.
const FloatingWhatsApp = ({ message = DEFAULT_MESSAGE, label = 'דבר/י איתי', note = 'אבחון חינם, תשובה תוך דקות', location = 'floating' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 520);
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
    <div className={`fab${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <p className="fab__note">{note}</p>
      <a
        className="fab__btn"
        href={getWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWhatsAppClick(location)}
        aria-label="פתח שיחת WhatsApp"
        tabIndex={visible ? 0 : -1}
      >
        <Icon name="whatsapp" />
        <span>{label}</span>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
