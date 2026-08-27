import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getWhatsAppUrl, trackWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { useLang, togglePath } from '../i18n';
import './Navbar.css';

const STR = {
  he: {
    navItems: [
      { id: 'hero', label: 'בית' },
      { id: 'about', label: 'מי אני' },
      { id: 'services', label: 'שירותים' },
      { id: 'how-it-works', label: 'איך זה עובד' },
      { id: 'testimonials', label: 'המלצות' },
      { id: 'articles', label: 'מאמרים' },
      { id: 'faq', label: 'שאלות נפוצות' },
      { id: 'contact', label: 'שליחת פרטים' },
    ],
    cta: 'דבר/י איתי',
    logoAria: 'חזרה לדף הבית',
    menuAria: 'פתח תפריט ניווט',
    langToggle: 'English',
    langToggleAria: 'Switch to English',
    whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
  },
  en: {
    navItems: [
      { id: 'hero', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'testimonials', label: 'Reviews' },
      { id: 'articles', label: 'Articles' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: 'Chat With Me',
    logoAria: 'Back to home page',
    menuAria: 'Open navigation menu',
    langToggle: 'עברית',
    langToggleAria: 'מעבר לעברית',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, prefix } = useLang();
  const t = STR[lang];
  const homePath = prefix || '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onHome = location.pathname === homePath;

  // Nav items are real <a href> links so they are crawlable and open in a new
  // tab like any link. On the home page the click is intercepted for a smooth
  // scroll; anywhere else the href does the navigating.
  const handleAnchorClick = (e, sectionId) => {
    if (!onHome) return;
    const element = document.getElementById(sectionId);
    if (!element) return;
    e.preventDefault();
    element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a
          className="navbar-logo"
          href={homePath}
          aria-label={t.logoAria}
          onClick={(e) => handleAnchorClick(e, 'hero')}
        >
          <img src="/images/logo-hero.webp" alt="Israel Tech Force Logo" width="260" height="192" />
        </a>

        <div id="mobile-nav-menu" className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {t.navItems.map((item) => (
            <a
              key={item.id}
              className="nav-item"
              href={`${homePath}#${item.id}`}
              onClick={(e) => handleAnchorClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="nav-item nav-lang-toggle"
            href={togglePath(location.pathname)}
            aria-label={t.langToggleAria}
          >
            {t.langToggle}
          </a>
        </div>

        <div className="navbar-cta">
          <a
            className="cta-button"
            href={getWhatsAppUrl(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
          >
            {t.cta}
          </a>
        </div>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={t.menuAria}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
