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
        <meta name="theme-color" content="#0b1524" />
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

        {/* Meta Pixel, GA4 and Clarity. The fbq / gtag / clarity queues exist from
            the first byte, so PageView and every later event are recorded in
            order. The libraries themselves (about 450KB of script) are fetched on
            the visitor's first touch, scroll or key press, or 4 seconds after
            load, whichever comes first, so they never compete with the first
            paint or with hydration. */}
        <script dangerouslySetInnerHTML={{ __html: `
!function(w,d){
var n=w.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!w._fbq)w._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
w.dataLayer=w.dataLayer||[];w.gtag=function(){w.dataLayer.push(arguments)};
w.clarity=w.clarity||function(){(w.clarity.q=w.clarity.q||[]).push(arguments)};
var done=0,ev=['pointerdown','touchstart','keydown','scroll'];
function add(src){var s=d.createElement('script');s.async=1;s.src=src;d.head.appendChild(s)}
function boot(){if(done)return;done=1;ev.forEach(function(e){w.removeEventListener(e,boot)});
add('https://connect.facebook.net/en_US/fbevents.js');add('https://www.googletagmanager.com/gtag/js?id=G-M2TYTNN02X');add('https://www.clarity.ms/tag/x8uz4h0y6b')}
ev.forEach(function(e){w.addEventListener(e,boot,{passive:true})});
function timer(){setTimeout(boot,4000)}
if(d.readyState==='complete')timer();else w.addEventListener('load',timer,{once:true});
}(window,document);
fbq('init','1911202046942044');
fbq('track','PageView');
gtag('js', new Date());
gtag('config', 'G-M2TYTNN02X');
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
