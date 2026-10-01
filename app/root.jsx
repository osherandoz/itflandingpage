import { useEffect, useRef } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useRouteError, isRouteErrorResponse } from 'react-router';
import { Analytics } from "@vercel/analytics/react";
import { LOCAL_BUSINESS_SCHEMA, PERSON_SCHEMA } from '../src/data/schemas.js';
import { useMotion } from '../src/motion/useMotion.js';
import NotFound from '../src/pages/NotFound';
// Self-hosted variable font, preloaded below: text paints in the brand face
// on first render with no third-party round-trip.
import heeboHebrew from '@fontsource-variable/heebo/files/heebo-hebrew-wght-normal.woff2?url';
// Punctuation and digits live in the Latin file: without it the headline is
// repainted when it arrives, and that repaint is what LCP records.
import heeboLatin from '@fontsource-variable/heebo/files/heebo-latin-wght-normal.woff2?url';
import '../src/styles/system.css';

export const links = () => [
  { rel: 'preload', href: heeboHebrew, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: heeboLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        {/* Marks the document as scripted so scroll reveals may start hidden.
            If the app never boots, the class is dropped and everything shows. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js')},4000)})(document.documentElement)` }} />
        <meta name="theme-color" content="#f5f2ea" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon-64.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Per-route meta (title, description, OG, Twitter, canonical) */}
        <Meta />

        {/* Site-wide static meta */}
        <meta name="author" content="IsraelTechForce - ITF Recovery" />

        {/* Structured Data — LocalBusiness (global) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA),
          }}
        />
        {/* Structured Data — Person (Osher Revach) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PERSON_SCHEMA),
          }}
        />

        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="aE9CLpD9QGwjrSkACJUNpS8Ps8vCkLxMuP9jRl3v_aM" />

        {/* Meta Pixel. The fbq queue exists from the first byte, so PageView and
            every later event are recorded; the 250KB library itself is fetched
            once the document is parsed and the browser is idle, instead of
            competing with the CSS, font and hero image. */}
        <script dangerouslySetInnerHTML={{ __html: `
!function(f,b){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
function load(){var t=b.createElement('script');t.async=!0;t.src='https://connect.facebook.net/en_US/fbevents.js';b.head.appendChild(t)}
function idle(){(f.requestIdleCallback||function(c){setTimeout(c,1)})(load,{timeout:2000})}
if(b.readyState==='loading')b.addEventListener('DOMContentLoaded',idle,{once:true});else idle();
}(window,document);
fbq('init','1911202046942044');
fbq('track','PageView');
` }} />

        {/* Analytics that do not gate rendering: the gtag queue exists
            immediately (events are never lost), the libraries themselves
            download once the page has loaded. */}
        <script dangerouslySetInnerHTML={{ __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M2TYTNN02X');
(function(w,d){
  w.clarity=w.clarity||function(){(w.clarity.q=w.clarity.q||[]).push(arguments)};
  function add(src){var s=d.createElement('script');s.async=1;s.src=src;d.head.appendChild(s)}
  function boot(){add('https://www.googletagmanager.com/gtag/js?id=G-M2TYTNN02X');add('https://www.clarity.ms/tag/x8uz4h0y6b')}
  function idle(){(w.requestIdleCallback||function(f){setTimeout(f,1200)})(boot,{timeout:3000})}
  if(d.readyState==='complete')idle();else w.addEventListener('load',idle,{once:true});
})(window,document);
` }} />

        {/* Route-injected CSS/links */}
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#main">דילוג לתוכן</a>
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

  useMotion();

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

// Render and loader failures land on the same designed screen as a 404.
export function ErrorBoundary() {
  const error = useRouteError();
  useMotion();
  return <NotFound code={isRouteErrorResponse(error) ? error.status : 500} />;
}
