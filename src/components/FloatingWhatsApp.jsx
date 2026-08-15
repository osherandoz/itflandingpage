import React from 'react';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import Icon from './Icon';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => (
  <a
    className="floating-whatsapp"
    href={getWhatsAppUrl()}
    target="_blank"
    rel="noopener noreferrer"
    onClick={trackWhatsAppClick}
    aria-label="פתח שיחת WhatsApp"
    title="דברו איתנו בוואטסאפ"
  >
    <Icon name="whatsapp" />
    <span className="floating-whatsapp-label">דברו איתנו</span>
  </a>
);

export default FloatingWhatsApp;
