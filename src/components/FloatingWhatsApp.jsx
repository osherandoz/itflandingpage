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
    title="דבר/י איתי בוואטסאפ"
  >
    <Icon name="whatsapp" />
    <span className="floating-whatsapp-label">דבר/י איתי</span>
  </a>
);

export default FloatingWhatsApp;
