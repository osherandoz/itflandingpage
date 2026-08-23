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
import StickyCtaBar from '../components/StickyCtaBar';

// Below-fold, non-critical for first paint — split out of the initial bundle
const Testimonials = lazy(() => import('../components/Testimonials'));
const ArticlesSection = lazy(() => import('../components/ArticlesSection'));
const FAQ = lazy(() => import('../components/FAQ'));

const Home = () => {
  useEffect(() => {
    // Handle hash-based scrolling (e.g., from article page CTA)
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const form = document.getElementById('contact-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  return (
    <div dir="rtl" className="app">
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
