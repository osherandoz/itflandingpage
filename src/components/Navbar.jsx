import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import Icon from './Icon';
import './Navbar.css';

// Simplified per the 2026-09 audit (D2): services, results, about, resources,
// and one contact action (the always-visible CTA button, not a nav item).
// 'resources' points at /articles rather than a same-page anchor — most
// navigation tasks shouldn't dead-end back on the homepage.
const NAV_ITEMS = [
  { id: 'services', label: 'שירותים', anchor: true },
  { id: 'how-it-works', label: 'איך זה עובד', anchor: true },
  { id: 'testimonials', label: 'תוצאות', anchor: true },
  { id: 'about', label: 'מי אני', anchor: true },
  { id: 'resources', label: 'מדריכים', anchor: false, href: '/articles' },
];
const WHATSAPP_MESSAGE = 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  // Solid once the page moves; slides away on the way down, back on the way up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setIsScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setIsHidden(y > lastY && y > 320);
        lastY = y;
      }
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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  // Nav items are real <a href> links so they are crawlable and open in a new
  // tab like any link. On the home page the click is intercepted for a smooth
  // scroll; anywhere else the href does the navigating.
  const handleAnchorClick = (e, sectionId) => {
    setIsOpen(false);
    if (!onHome) return;
    const element = document.getElementById(sectionId);
    if (!element) return;
    e.preventDefault();
    element.scrollIntoView({ behavior: 'smooth' });
    // Sections below the fold have estimated heights until they first render
    // (content-visibility in Home.css), so the first jump can land short.
    // Re-aim until the section is actually parked under the header.
    let tries = 0;
    const settle = () => {
      const top = element.getBoundingClientRect().top;
      if ((top < -8 || top > 120) && ++tries <= 4) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(settle, 500);
      }
    };
    setTimeout(settle, 700);
  };

  const cls = ['navbar', isScrolled && 'is-scrolled', isHidden && !isOpen && 'is-hidden'].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="navbar__bar container">
        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="nav-drawer"
          aria-label="פתיחת תפריט ניווט"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <a className="navbar__logo" href="/" aria-label="IsraelTechForce, חזרה לדף הבית" onClick={(e) => handleAnchorClick(e, 'hero')}>
          <img src="/images/brand/logo-white-320.webp" alt="" width="320" height="236" />
        </a>

        <nav className="navbar__links" aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.anchor ? `/#${item.id}` : item.href}
              onClick={item.anchor ? (e) => handleAnchorClick(e, item.id) : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="btn btn--paper btn--sm btn--plain navbar__cta"
          href={getWhatsAppUrl(WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsAppClick('navbar')}
        >
          <Icon name="whatsapp" />
          <span>דברו איתי</span>
        </a>
      </div>

      {/* Mobile drawer: slides in from the start edge, the page stays visible behind */}
      <div className={`navbar__scrim${isOpen ? ' is-open' : ''}`} onClick={() => setIsOpen(false)} aria-hidden="true" />
      <div id="nav-drawer" className={`navbar__drawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="navbar__drawer-head">
          <span className="small dim">( תפריט )</span>
          <button className="navbar__close" onClick={() => setIsOpen(false)} aria-label="סגירת תפריט">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="ניווט ראשי במובייל">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={item.anchor ? `/#${item.id}` : item.href}
              onClick={item.anchor ? (e) => handleAnchorClick(e, item.id) : () => setIsOpen(false)}
            >
              <span className="navbar__drawer-num num">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="btn btn--go btn--block"
          href={getWhatsAppUrl(WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onWhatsAppClick('navbar-drawer')}
        >
          <span>שלחו לי את המקרה בוואטסאפ</span>
          <span className="btn__arrow" aria-hidden="true"><Icon name="whatsapp" /></span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
