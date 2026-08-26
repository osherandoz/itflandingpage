// WhatsApp utility functions
import { trackSiteEvent } from './track.js';

// Default first-contact message per language — the one place to edit it.
export const WHATSAPP_DEFAULT_MSG = {
  he: "היי, הגעתי דרך האתר שלך אשמח לקבל פרטים",
  en: "Hi, I found you through your website and I'd love to get more details",
};

// For <a href={getWhatsAppUrl(...)}> CTAs — a real link opens reliably in
// popup-blocked and in-app browsers (Instagram/Facebook webviews), unlike
// button + window.open().
export const trackWhatsAppClick = () => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'WhatsApp',
      event_label: 'whatsapp_redirect',
      value: 1
    });
  }
  trackSiteEvent('whatsapp_click');
};

export const openWhatsApp = (message = WHATSAPP_DEFAULT_MSG.he) => {
  const phoneNumber = "972509823235";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  trackWhatsAppClick();
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

export const getWhatsAppUrl = (message = WHATSAPP_DEFAULT_MSG.he) => {
  const phoneNumber = "972509823235";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};










