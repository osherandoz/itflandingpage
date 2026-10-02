import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import PressSection from '../components/PressSection';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { Eyebrow } from '../components/ui';
import { FACTS } from '../data/businessFacts';
import './Home.css';

// Below-fold, non-critical for first paint — split out of the initial bundle
const Testimonials = lazy(() => import('../components/Testimonials'));
const ArticlesSection = lazy(() => import('../components/ArticlesSection'));
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
        <PressSection />
        {/* Services + diagnosis before the About block (audit D1): let a visitor
            find their own problem and see how this works before reading a bio. */}
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
        <section id="articles">
          <Suspense fallback={null}>
            <ArticlesSection />
          </Suspense>
        </section>
        <section id="faq">
          <Suspense fallback={null}>
            <FAQ />
          </Suspense>
        </section>
        <section id="contact" className="home-contact section theme-mist">
          <div className="container home-contact__grid">
            <div className="home-contact__copy m-reveal">
              <Eyebrow num="07">יצירת קשר</Eyebrow>
              <h2 className="h1">
                <span className="lt">מעדיפים שאחזור</span> אליכם?
              </h2>
              <p className="lead">משאירים פרטים, מספרים בקצרה מה קרה, ואני חוזר עם אבחון ראשוני. בלי תשלום מראש.</p>
              <ul className="home-contact__points">
                <li>אבחון ראשוני חינם</li>
                <li>תשלום רק אחרי הצלחה</li>
                <li>זמינות {FACTS.hours.he}</li>
              </ul>
            </div>
            <div className="card home-contact__card m-reveal">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp message="היי, החשבון שלי חסום, אשמח לעזרה" label="קבל עזרה עכשיו" />
    </div>
  );
};

export default Home;
