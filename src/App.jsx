import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PrivacyPolicy from './components/PrivacyPolicy';
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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:slug" element={<ArticleTemplate />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
