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
// Newsletter popup disabled - users will use external link instead
// import NewsletterPopup from './components/NewsletterPopup';
// Import test utility for Smoove API (development only)
import { testSmoove, testSubscribe } from './utils/test-smoove.js';
import { Analytics } from "@vercel/analytics/react"


// Expose test functions to window for console testing
if (typeof window !== 'undefined') {
  window.testSmoove = testSmoove;
  window.testSubscribe = testSubscribe;
}

function App() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
  // Newsletter popup disabled - using external link instead
  // const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    // Check if user has already accepted privacy policy
    const accepted = localStorage.getItem('privacyPolicyAccepted');
    if (accepted === 'true') {
      setHasAcceptedPrivacy(true);
      
      // Newsletter popup disabled - users will use external link instead
      // const popupShown = localStorage.getItem('newsletterPopupShown');
      // const subscribed = localStorage.getItem('newsletterSubscribed');
      
      // if (!popupShown && !subscribed) {
      //   // Show newsletter popup after a short delay for better UX
      //   setTimeout(() => {
      //     setShowNewsletterPopup(true);
      //   }, 2000);
      // }
    } else {
      // Show privacy policy modal for new users
      setShowPrivacyPolicy(true);
    }
  }, []);

  const handlePrivacyAccept = () => {
    setShowPrivacyPolicy(false);
    setHasAcceptedPrivacy(true);
    
    // Newsletter popup disabled - users will use external link instead
    // setTimeout(() => {
    //   setShowNewsletterPopup(true);
    // }, 1000);
  };

  const handlePrivacyDecline = () => {
    // You can redirect to a different page or show a message
    alert('על מנת להשתמש באתר, עליכם להסכים למדיניות הפרטיות');
  };

  // Newsletter handlers disabled - using external link instead
  // const handleNewsletterClose = () => {
  //   setShowNewsletterPopup(false);
  // };

  // const handleNewsletterSubscribe = (formData) => {
  //   console.log('Newsletter subscription successful:', formData);
  //   // Additional tracking or analytics can be added here
  // };

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
      
      {/* Newsletter Popup - DISABLED - Users will use external link instead */}
      {/* <NewsletterPopup
        isOpen={showNewsletterPopup}
        onClose={handleNewsletterClose}
        onSubscribe={handleNewsletterSubscribe}
      /> */}
    </div>
  );
}

export default App;
