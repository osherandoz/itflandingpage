import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { openWhatsApp } from '../utils/whatsapp';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If we're on article page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      scrollToSection('hero');
    }
  };

  const navItems = [
    { id: 'hero', label: 'בית' },
    { id: 'about', label: 'מי אני' },
    { id: 'services', label: 'שירותים' },
    { id: 'how-it-works', label: 'איך זה עובד' },
    { id: 'testimonials', label: 'המלצות' },
    { id: 'articles', label: 'מאמרים' },
    { id: 'faq', label: 'שאלות נפוצות' },
    { id: 'contact', label: 'צור קשר' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>
          <img src="/images/israeltechforce-logo-white.png" alt="Israel Tech Force Logo" />
        </div>
        
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="navbar-cta">
          <button 
            className="cta-button"
            onClick={openWhatsApp}
          >
            דברו איתנו
          </button>
        </div>
        
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
