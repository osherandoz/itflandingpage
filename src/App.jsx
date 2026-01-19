import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PrivacyPolicy from './components/PrivacyPolicy';
import WhatsAppDisabledPopup from './components/WhatsAppDisabledPopup';
import Home from './pages/Home';
import ArticleTemplate from './components/ArticleTemplate';
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
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  // Newsletter popup disabled - using external link instead
  // const [showNewsletterPopup, setShowNewsletterPopup] = useState(false);

  useEffect(() => {
    // Check if user has already accepted privacy policy
    const accepted = localStorage.getItem('privacyPolicyAccepted');
    if (accepted === 'true') {
      setHasAcceptedPrivacy(true);
      
      // Check if WhatsApp popup should be shown
      const whatsappPopupShown = localStorage.getItem('whatsappDisabledPopupShown');
      if (!whatsappPopupShown) {
        // Show WhatsApp popup after a short delay
        setTimeout(() => {
          setShowWhatsAppPopup(true);
        }, 1500);
      }
    } else {
      // Show privacy policy modal for new users
      setShowPrivacyPolicy(true);
    }
  }, []);

  const handlePrivacyAccept = () => {
    setShowPrivacyPolicy(false);
    setHasAcceptedPrivacy(true);
    
    // Show WhatsApp disabled popup after privacy policy is accepted
    setTimeout(() => {
      setShowWhatsAppPopup(true);
    }, 1000);
  };

  const handlePrivacyDecline = () => {
    // You can redirect to a different page or show a message
    alert('על מנת להשתמש באתר, עליכם להסכים למדיניות הפרטיות');
  };

  const handleWhatsAppPopupClose = () => {
    setShowWhatsAppPopup(false);
    localStorage.setItem('whatsappDisabledPopupShown', 'true');
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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:slug" element={<ArticleTemplate />} />
      </Routes>
      
      {/* WhatsApp Disabled Popup */}
      <WhatsAppDisabledPopup
        isOpen={showWhatsAppPopup}
        onClose={handleWhatsAppPopupClose}
      />
      
      <Analytics />
    </>
  );
}

export default App;
