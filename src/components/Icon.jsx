import React from 'react';

// Inline SVG icon set. Replaces Font Awesome on the homepage so the page
// never triggers a webfont download for icon glyphs (fa-solid/fa-brands/
// fa-regular were ~250KB combined). Other routes still use Font Awesome
// and are untouched.

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
  focusable: 'false',
};

const outline = (children, props) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
);

const solid = (children, props) => (
  <svg {...base} fill="currentColor" {...props}>
    {children}
  </svg>
);

const PATHS = {
  facebook: (p) => solid(<path d="M13.5 22v-8h2.7l.4-3.1H13.5V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V14h2.7v8h3.4z"/>, p),
  instagram: (p) => outline(<><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></>, p),
  whatsapp: (p) => solid(<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.6 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1-1.6-.5-3.6-1.6-5-3.4-1-1.2-1.6-2.6-1.8-3.2-.1-.6.1-1.1.4-1.4.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4l-.3.4c-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.2.4.3 0 .1 0 .6-.2 1z"/>, p),
  tiktok: (p) => solid(<path d="M16.6 2h-3.2v13.6a3 3 0 1 1-2.4-2.94V9.4a6.2 6.2 0 1 0 5.6 6.17V8.8a7.6 7.6 0 0 0 4.4 1.4V7a4.4 4.4 0 0 1-4.4-4.4V2z"/>, p),

  shield: (p) => outline(<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>, p),
  clock: (p) => outline(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>, p),
  users: (p) => outline(<><circle cx="9" cy="8" r="3.2"/><path d="M2.5 19c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5"/><path d="M16.5 7.5a3 3 0 0 1 0 5.8"/><path d="M21.5 19c0-2.6-2-4.6-4.8-5.3"/></>, p),
  certificate: (p) => outline(<><circle cx="12" cy="9" r="6"/><path d="M9 14.5L7.5 22l4.5-2.5L16.5 22 15 14.5"/></>, p),
  comments: (p) => outline(<path d="M4 4h16v11H8l-4 4V4z"/>, p),
  search: (p) => outline(<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>, p),
  invoice: (p) => outline(<><path d="M6 2h9l3 3v17H6z"/><path d="M15 2v3h3"/><path d="M9 12h6"/><path d="M9 16h6"/><path d="M9 8h3"/></>, p),
  rocket: (p) => outline(<><path d="M12 2c3 1.5 5 5 5 9 0 2-1 4-2 5l-1.5 3-1.5-2-1.5 2L9 16c-1-1-2-3-2-5 0-4 2-7.5 5-9z"/><path d="M9 15l-3 1 1-3"/><path d="M15 15l3 1-1-3"/><circle cx="12" cy="10" r="1.6" fill="currentColor" stroke="none"/></>, p),
  star: (p) => solid(<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.6L12 17.6l-5.8 3 1.1-6.6L2.5 9.4l6.6-.9z"/>, p),
  quote: (p) => solid(<path d="M9.5 6C6.5 7.3 5 9.7 5 13c0 2.2 1.5 3.7 3.4 3.7 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-3 .3-1.4 1.5-2.7 3.2-3.4L9.5 6zm9 0c-3 1.3-4.5 3.7-4.5 7 0 2.2 1.5 3.7 3.4 3.7 1.7 0 3-1.3 3-3 0-1.6-1.1-2.8-2.6-3 .3-1.4 1.5-2.7 3.2-3.4L18.5 6z"/>, p),
  calendar: (p) => outline(<><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>, p),
  arrowLeft: (p) => outline(<><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></>, p),
  book: (p) => outline(<><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17z"/><path d="M20 19H6.5A2.5 2.5 0 0 0 4 21.5"/></>, p),
  chevronDown: (p) => outline(<path d="M6 9l6 6 6-6"/>, p),
  spinner: (p) => outline(<path d="M12 3a9 9 0 1 0 9 9"/>, p),
  mapPin: (p) => outline(<><path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/></>, p),
  phone: (p) => outline(<path d="M6.5 3h2.7l1.4 4.3-2 1.6a13 13 0 0 0 6.5 6.5l1.6-2 4.3 1.4v2.7c0 1.2-1 2.1-2.2 2A17.5 17.5 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z"/>, p),
  envelope: (p) => outline(<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/></>, p),
  envelopeOpen: (p) => outline(<><path d="M3 9l9-6 9 6v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l9 6 9-6"/></>, p),
  questionCircle: (p) => outline(<><circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 2"/><circle cx="12" cy="17" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="1.8"/></>, p),
  newspaper: (p) => outline(<><path d="M4 5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z"/><path d="M8 9h6M8 12.5h6M8 16h4"/><path d="M19 8v9a1 1 0 0 0 2 0V9a1 1 0 0 0-2-1"/></>, p),
  accessibility: (p) => outline(<><circle cx="12" cy="4.5" r="1.8"/><path d="M4 8.5l8 1.5 8-1.5"/><path d="M12 10v4l4 6.5M12 14l-4 6.5"/><path d="M9.5 12.5h5"/></>, p),
  contract: (p) => outline(<><path d="M6 2h9l3 3v17H6z"/><path d="M15 2v3h3"/><path d="M9 11h6M9 14h6M9 17h3"/></>, p),
  check: (p) => outline(<polyline points="20 6 9 17 4 12" strokeWidth="3"/>, p),
};

const Icon = ({ name, className, spin, style, ...rest }) => {
  const render = PATHS[name];
  if (!render) return null;
  return render({
    className,
    style: spin ? { animation: 'icon-spin 0.8s linear infinite', ...style } : style,
    ...rest,
  });
};

export default Icon;
