import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutMe from './components/AboutMe';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);

  useEffect(() => {
    // Check if user has already accepted privacy policy
    const accepted = localStorage.getItem('privacyPolicyAccepted');
    if (accepted === 'true') {
      setHasAcceptedPrivacy(true);
    } else {
      // Show privacy policy modal for new users
      setShowPrivacyPolicy(true);
    }
  }, []);

  const handlePrivacyAccept = () => {
    setShowPrivacyPolicy(false);
    setHasAcceptedPrivacy(true);
  };

  const handlePrivacyDecline = () => {
    // You can redirect to a different page or show a message
    alert('על מנת להשתמש באתר, עליכם להסכים למדיניות הפרטיות');
  };

  // Don't render the main content until privacy policy is accepted
  if (!hasAcceptedPrivacy) {
    return (
      <div dir="rtl" className="app">
        <PrivacyPolicy 
          isOpen={showPrivacyPolicy}
          onAccept={handlePrivacyAccept}
          onDecline={handlePrivacyDecline}
        />
      </div>
    );
  }

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
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </div>
  );
}

export default App;
