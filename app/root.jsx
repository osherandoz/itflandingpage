import { useState, useEffect } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Analytics } from "@vercel/analytics/react";
import PrivacyPolicy from '../src/components/PrivacyPolicy';
import WhatsAppDisabledPopup from '../src/components/WhatsAppDisabledPopup';
import { LOCAL_BUSINESS_SCHEMA, SERVICE_SCHEMAS } from '../src/data/schemas.js';
import '../src/index.css';
import '../src/App.css';

const META_PIXEL_SCRIPT = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1911202046942044');
fbq('track', 'PageView');
`;

export function Layout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/images/israeltechforce-logo-white.png" />
        <link rel="apple-touch-icon" href="/images/israeltechforce-logo-white.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Per-route meta (title, description, OG, Twitter, canonical) */}
        <Meta />

        {/* Site-wide static meta */}
        <meta name="author" content="IsraelTechForce - ITF Recovery" />
        <meta name="keywords" content="שחזור חשבון פייסבוק, שחזור חשבון אינסטגרם, שחזור חשבון וואטסאפ, חשבון נחסם, חשבון נפרץ, ITF Recovery, IsraelTechForce" />
        <meta name="geo.region" content="IL" />
        <meta name="geo.placename" content="Netanya, Israel" />
        <meta name="geo.position" content="32.3215;34.8532" />
        <meta name="ICBM" content="32.3215, 34.8532" />
        <meta name="language" content="Hebrew" />
        <meta name="content-language" content="he" />

        {/* Structured Data — LocalBusiness (global) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
        {/* Structured Data — one Service schema per service (global) */}
        {SERVICE_SCHEMAS.map((schema) => (
          <script
            key={schema.name}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />

        {/* Preload LCP image */}
        <link
          rel="preload"
          as="image"
          href="/images/israeltechforce-logo-white.png"
          fetchPriority="high"
        />

        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="aE9CLpD9QGwjrSkACJUNpS8Ps8vCkLxMuP9jRl3v_aM" />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M2TYTNN02X" />
        <script dangerouslySetInnerHTML={{ __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M2TYTNN02X');
` }} />

        {/* Meta Pixel */}
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL_SCRIPT }} />

        {/* Route-injected CSS/links */}
        <Links />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1911202046942044&ev=PageView&noscript=1" />',
          }}
        />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  // Default true so SSR renders full page content (better for SEO crawlers)
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(true);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  useEffect(() => {
    // Only runs on client - check localStorage
    const accepted = localStorage.getItem('privacyPolicyAccepted');
    if (accepted !== 'true') {
      setHasAcceptedPrivacy(false);
      setShowPrivacyPolicy(true);
    } else {
      const whatsappPopupShown = localStorage.getItem('whatsappDisabledPopupShown');
      if (!whatsappPopupShown) {
        setTimeout(() => setShowWhatsAppPopup(true), 1500);
      }
    }
  }, []);

  const handlePrivacyAccept = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setShowPrivacyPolicy(false);
    setHasAcceptedPrivacy(true);
    setTimeout(() => setShowWhatsAppPopup(true), 1000);
  };

  const handlePrivacyDecline = () => {
    alert('על מנת להשתמש באתר, עליכם להסכים למדיניות הפרטיות');
  };

  const handleWhatsAppPopupClose = () => {
    setShowWhatsAppPopup(false);
    localStorage.setItem('whatsappDisabledPopupShown', 'true');
  };

  return (
    <>
      {!hasAcceptedPrivacy && (
        <PrivacyPolicy
          isOpen={showPrivacyPolicy}
          onAccept={handlePrivacyAccept}
          onDecline={handlePrivacyDecline}
        />
      )}
      <Outlet />
      <WhatsAppDisabledPopup
        isOpen={showWhatsAppPopup}
        onClose={handleWhatsAppPopupClose}
      />
      <Analytics />
    </>
  );
}
