import React, { useEffect, lazy, Suspense } from 'react';
import { useLang } from '../i18n';
import Navbar from '../components/Navbar';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import PressSection from '../components/PressSection';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import StickyCtaBar from '../components/StickyCtaBar';

// Below-fold, non-critical for first paint — split out of the initial bundle
const Testimonials = lazy(() => import('../components/Testimonials'));
const ArticlesSection = lazy(() => import('../components/ArticlesSection'));
const FAQ = lazy(() => import('../components/FAQ'));

const Home = () => {
  const { dir } = useLang();
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
      const aligned = el && Math.abs(el.getBoundingClientRect().top) < 8;
      // 'instant' on purpose: this is an arrival from another page, where a jump
      // is the expected behaviour, and it overrides the global smooth scroll that
      // would otherwise animate against ScrollRestoration.
      if (el && !aligned) el.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (aligned || ++tries > 25) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div dir={dir} className="app">
      <Navbar />
      <section id="hero">
        <HeroSection />
      </section>
      <PressSection />
      <section id="about">
        <AboutMe />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="how-it-works">
        <HowItWorks />
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
      <section id="contact" style={{ background: 'var(--color-bg-section)', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <ContactForm />
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
      <StickyCtaBar />
    </div>
  );
};

export default Home;
