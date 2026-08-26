import React, { useEffect, useState, useRef } from 'react';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import { useLang } from '../i18n';
import './StickyCtaBar.css';

const STR = {
  he: {
    barAria: 'קריאה לפעולה',
    text: 'אבחון חינם, תשובה תוך דקות',
    whatsappMessage: 'היי, החשבון שלי חסום, אשמח לעזרה',
    cta: 'קבל עזרה עכשיו',
    dismissAria: 'סגור',
  },
  en: {
    barAria: 'Call to action',
    text: 'Free diagnosis, answer within minutes',
    whatsappMessage: "Hi, my account is blocked and I'd love some help",
    cta: 'Get Help Now',
    dismissAria: 'Close',
  },
};

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hasShown = useRef(false);
  const { lang } = useLang();
  const t = STR[lang];

  useEffect(() => {
    if (dismissed) return;

    const hero = document.getElementById('hero');
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !dismissed) {
          setVisible(true);
          hasShown.current = true;
        } else if (entry.isIntersecting && hasShown.current) {
          // Hide again if user scrolls back to hero
          setVisible(false);
        }
      },
      { threshold: 0 }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <div
      className={`sticky-cta-bar${visible ? ' sticky-cta-bar--visible' : ''}`}
      role="complementary"
      aria-label={t.barAria}
      aria-hidden={!visible}
    >
      <p className="sticky-cta-bar__text">
        {t.text}
      </p>
      <a
        className="sticky-cta-bar__btn"
        href={getWhatsAppUrl(t.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        tabIndex={visible ? 0 : -1}
      >
        {t.cta}
        <span aria-hidden="true">↓</span>
      </a>
      <button
        className="sticky-cta-bar__dismiss"
        onClick={handleDismiss}
        aria-label={t.dismissAria}
        tabIndex={visible ? 0 : -1}
      >
        ✕
      </button>
    </div>
  );
};

export default StickyCtaBar;
