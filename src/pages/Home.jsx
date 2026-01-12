import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ArticlesSection from '../components/ArticlesSection';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

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
        <Testimonials />
      </section>
      <section id="articles">
        <ArticlesSection />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact" style={{ background: '#1a1f3a', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
