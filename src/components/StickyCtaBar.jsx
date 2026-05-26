import React, { useEffect, useState, useRef } from 'react';
import './StickyCtaBar.css';

const StickyCtaBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const hasShown = useRef(false);

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

  const handleCtaClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  return (
    <div
      className={`sticky-cta-bar${visible ? ' sticky-cta-bar--visible' : ''}`}
      role="complementary"
      aria-label="קריאה לפעולה"
      aria-hidden={!visible}
    >
      <p className="sticky-cta-bar__text">
        החשבון שלך חסום?
      </p>
      <button
        className="sticky-cta-bar__btn"
        onClick={handleCtaClick}
        tabIndex={visible ? 0 : -1}
      >
        קבל עזרה עכשיו
        <span aria-hidden="true">↓</span>
      </button>
      <button
        className="sticky-cta-bar__dismiss"
        onClick={handleDismiss}
        aria-label="סגור"
        tabIndex={visible ? 0 : -1}
      >
        ✕
      </button>
    </div>
  );
};

export default StickyCtaBar;
