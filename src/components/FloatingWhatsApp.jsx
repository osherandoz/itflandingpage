import React from 'react';
import { getWhatsAppUrl, trackWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { useLang } from '../i18n';
import Icon from './Icon';
import './FloatingWhatsApp.css';

const STR = {
  he: {
    aria: 'פתח שיחת WhatsApp',
    title: 'דבר/י איתי בוואטסאפ',
    label: 'דבר/י איתי',
    whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
  },
  en: {
    aria: 'Open a WhatsApp chat',
    title: 'Chat with me on WhatsApp',
    label: 'Chat with me',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const FloatingWhatsApp = () => {
  const { lang } = useLang();
  const t = STR[lang];

  return (
    <a
      className="floating-whatsapp"
      href={getWhatsAppUrl(t.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      aria-label={t.aria}
      title={t.title}
    >
      <Icon name="whatsapp" />
      <span className="floating-whatsapp-label">{t.label}</span>
    </a>
  );
};

export default FloatingWhatsApp;
