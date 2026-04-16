import React from 'react';
import { openWhatsApp } from '../utils/whatsapp';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => (
  <button
    className="floating-whatsapp"
    onClick={openWhatsApp}
    aria-label="פתח שיחת WhatsApp"
    title="דברו איתנו בוואטסאפ"
  >
    <i className="fab fa-whatsapp"></i>
    <span className="floating-whatsapp-label">דברו איתנו</span>
  </button>
);

export default FloatingWhatsApp;
