// WhatsApp utility functions
import { trackSiteEvent } from './track.js';

// Default first-contact message — the one place to edit it.
export const WHATSAPP_DEFAULT_MSG = "היי, הגעתי דרך האתר שלך אשמח לקבל פרטים";

// A WhatsApp click is a click, not a received message and not a lead.
// `location` names the CTA that was clicked (hero, navbar, sticky-bar, ...).
export const trackWhatsAppClick = (location = 'unknown') => {
  const loc = typeof location === 'string' ? location : 'unknown'; // onClick passes an event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'contact_click', { channel: 'whatsapp', cta_location: loc });
  }
  trackSiteEvent('whatsapp_click', { channel: 'whatsapp', cta_location: loc, intent: 'contact' });
};

// For <a onClick={onWhatsAppClick('hero')}> — a real link opens reliably in
// popup-blocked and in-app browsers (Instagram/Facebook webviews), unlike
// button + window.open().
export const onWhatsAppClick = (location) => () => trackWhatsAppClick(location);

export const getWhatsAppUrl = (message = WHATSAPP_DEFAULT_MSG) => {
  const phoneNumber = "972509823235";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

// Message written by the hero case picker: each choice carries `say`, the way
// it reads inside the sentence. Nothing picked gives the generic message.
export const caseMessage = (where, what) =>
  `היי, ${where?.say || 'החשבון שלי'} ${what?.say || 'חסום'}, אשמח ${where || what ? 'לאבחון' : 'לעזרה'}`;
