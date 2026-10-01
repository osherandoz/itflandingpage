// Small shared building blocks of the Signal design system.
// Styles live in src/styles/system.css.
import React from 'react';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';

// Diagonal arrow: "forward" in an RTL layout points up and to the left.
export const ArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    <path d="M17 17L7 7" />
    <path d="M7 16V7h9" />
  </svg>
);

// "(01) ——— label" above a section title
export const Eyebrow = ({ num, children, className = '' }) => (
  <p className={`eyebrow ${className}`}>
    {num && <span className="eyebrow__num">({num})</span>}
    <span className="eyebrow__line" aria-hidden="true" />
    <span>{children}</span>
  </p>
);

// Pill button with the separate arrow disc. Renders <a> when given href,
// otherwise <button>.
export const Btn = ({ variant = 'ink', size, block, arrow = true, className = '', children, ...rest }) => {
  const Tag = rest.href ? 'a' : 'button';
  const cls = ['btn', `btn--${variant}`, size && `btn--${size}`, block && 'btn--block', !arrow && 'btn--plain', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={cls} {...rest}>
      <span>{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      )}
    </Tag>
  );
};

// The primary action of the site: open WhatsApp with a prefilled message.
// A real link (not window.open) so it works inside Instagram/Facebook webviews.
export const WaBtn = ({ message, location, children, ...rest }) => (
  <Btn
    variant="go"
    href={getWhatsAppUrl(message)}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onWhatsAppClick(location)}
    {...rest}
  >
    {children}
  </Btn>
);

// Text that fills in word by word as the block scrolls through the viewport.
// Screen readers get the plain sentence.
export const FillText = ({ text, as = 'p', className = '', scrub = '0.8 0.5' }) => {
  const Tag = as;
  const words = text.split(' ');
  return (
    <Tag className={`m-fill ${className}`} data-scrub={scrub} style={{ '--n': words.length }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} style={{ '--i': i }} aria-hidden="true">
          {w}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Slot-machine number: every digit is a strip that rolls to its value when the
// number enters the viewport. Non-digits ("," "+" "%" ".") stay put.
export const SlotNumber = ({ value, className = '' }) => {
  let col = 0;
  return (
    <span className={`slot m-in ${className}`} role="img" aria-label={value}>
      {String(value).split('').map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i} aria-hidden="true">{ch}</span>;
        const c = col++;
        return (
          <span key={i} className="slot__col" aria-hidden="true">
            <span className="slot__strip" style={{ '--d': Number(ch), '--c': c }}>
              {DIGITS.map((d) => <span key={d}>{d}</span>)}
            </span>
          </span>
        );
      })}
    </span>
  );
};
