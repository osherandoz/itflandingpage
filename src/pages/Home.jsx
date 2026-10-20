import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ProofStrip from '../components/ProofStrip';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { Eyebrow } from '../components/ui';
import Icon from '../components/Icon';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { FACTS } from '../data/businessFacts';
import './Home.css';

// Below-fold, non-critical for first paint — split out of the initial bundle
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));

const Home = () => {
  useEffect(() => {
    // Hash-based scrolling for links arriving from another page (navbar, article
    // CTAs). The native jump misses #testimonials/#articles/#faq because those
    // sections are lazy — so retry for a couple of seconds until they mount.
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Keep correcting rather than firing once: ScrollRestoration resets to the
    // top after hydration, and a lazy section mounting above the target shifts
    // it again. Stop once the section is actually parked at the top.
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      const top = el ? el.getBoundingClientRect().top : 0;
      // scroll-padding-top parks sections just below the fixed header
      const aligned = el && top > -8 && top < 120;
      if (el && !aligned) el.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (aligned || ++tries > 25) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main id="main">
        <section id="hero">
          <HeroSection />
        </section>
        <ProofStrip />
        <section id="services">
          <Services />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="about">
          <AboutMe />
        </section>
        <section id="testimonials">
          <Suspense fallback={null}>
            <Testimonials />
          </Suspense>
        </section>
        <section id="faq">
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
        </section>
        {/* Conversion hub: two routes, one decision. WhatsApp first, a three-field form for anyone without it. */}
        <section id="contact" className="home-contact section theme-mist">
          <div className="container home-contact__grid">
            <div className="home-contact__copy m-reveal">
              <Eyebrow num="06">יצירת קשר</Eyebrow>
              <h2 className="h1">
                <span className="lt">שולחים את המקרה.</span> מקבלים תשובה
              </h2>
              <p className="lead">אבחון ראשוני חינם תוך <bdi>10</bdi> דקות. בלי תשלום מראש.</p>
              <a
                className="btn btn--go home-contact__wa"
                href={getWhatsAppUrl('היי אושר, יש לי תקלה בחשבון שלי. אשמח לבדיקת היתכנות מהירה.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick('contact-hub')}
              >
                <span>שיחה מיידית בוואטסאפ</span>
                <span className="btn__arrow" aria-hidden="true"><Icon name="whatsapp" /></span>
              </a>
              <ul className="home-contact__points">
                <li>תשלום רק אחרי הצלחה</li>
                <li>אחריות <bdi>24</bdi> שעות מרגע השחרור</li>
                <li>זמינות {FACTS.hours.he}</li>
              </ul>
            </div>
            <div className="card home-contact__card m-reveal">
              <ContactForm
                compact
                hideWhatsApp
                heading="מעדיפים שיחה טלפונית?"
                subheading="נחזור אליכם תוך דקות ספורות."
                submitLabel="תתקשרו אליי"
                location="contact-hub"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;
