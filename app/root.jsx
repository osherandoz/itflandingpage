import { useEffect, useRef } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { Analytics } from "@vercel/analytics/react";
import { LOCAL_BUSINESS_SCHEMA, PERSON_SCHEMA } from '../src/data/schemas.js';
import { LOCAL_BUSINESS_SCHEMA_EN, PERSON_SCHEMA_EN } from '../src/data/schemas.en.js';
import { langFromPathname } from '../src/i18n/index.js';
// Self-hosted font — eliminates render-blocking Google Fonts round-trip
import '@fontsource/heebo/400.css';
import '@fontsource/heebo/700.css';
import '../src/index.css';
import '../src/App.css';

export function Layout({ children }) {
  const { pathname } = useLocation();
  const lang = langFromPathname(pathname);
  return (
    <html lang={lang} dir={lang === 'en' ? 'ltr' : 'rtl'}>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Per-route meta (title, description, OG, Twitter, canonical) */}
        <Meta />

        {/* Site-wide static meta */}
        <meta name="author" content="IsraelTechForce - ITF Recovery" />

        {/* Structured Data — LocalBusiness (global, language-matched) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(lang === 'en' ? LOCAL_BUSINESS_SCHEMA_EN : LOCAL_BUSINESS_SCHEMA),
          }}
        />
        {/* Structured Data — Person (Osher Revach) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(lang === 'en' ? PERSON_SCHEMA_EN : PERSON_SCHEMA),
          }}
        />

        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="aE9CLpD9QGwjrSkACJUNpS8Ps8vCkLxMuP9jRl3v_aM" />

        {/* Meta Pixel base code — loads on every route, including SPA navigations */}
        <script dangerouslySetInnerHTML={{ __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1911202046942044');
fbq('track','PageView');
` }} />

        {/* Microsoft Clarity */}
        <script dangerouslySetInnerHTML={{ __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","x8uz4h0y6b");
` }} />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-M2TYTNN02X" />
        <script dangerouslySetInnerHTML={{ __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M2TYTNN02X');
` }} />

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
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  // Meta Pixel — PageView on SPA route changes (initial PageView fired by <head> script)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (window.fbq) window.fbq('track', 'PageView');
  }, [pathname]);

  // The scroll-triggered newsletter popup used to fire here on the home page.
  // Removed: /newsletter is the subscribe surface now, and the popup covered
  // the footer link to it.

  return (
    <>
      <Outlet />
      <Analytics />
    </>
  );
}
