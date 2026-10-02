import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WaBtn, ArrowIcon } from '../components/ui';
import { SERVICE_PATHS } from '../i18n';
import './NotFound.css';

const LINKS = [
  { to: SERVICE_PATHS['facebook-recovery'], label: 'שחזור חשבון פייסבוק' },
  { to: SERVICE_PATHS['instagram-recovery'], label: 'שחזור חשבון אינסטגרם' },
  { to: SERVICE_PATHS['whatsapp-recovery'], label: 'שחזור חשבון וואטסאפ' },
  { to: '/articles', label: 'מדריכים ומאמרים' },
  { to: '/faq', label: 'שאלות נפוצות' },
];

// Also used by the root ErrorBoundary: `code` is the HTTP status to show.
const NotFound = ({ code = 404 }) => {
  const isMissing = code === 404;
  return (
    <div className="app">
      <Navbar />
      <main id="main" className="nf theme-ink bg-grid">
        <div className="container nf__grid">
          <div>
            <p className="nf__kicker">( שגיאה {code} )</p>
            <h1 className="display nf__title">
              {isMissing ? (
                <>
                  <span className="lt">הדף הזה לא נחסם.</span>{' '}
                  <span className="nf__line">הוא פשוט <span className="mk">לא קיים.</span></span>
                </>
              ) : (
                <>
                  <span className="lt">משהו השתבש</span>{' '}
                  <span className="nf__line">בצד שלנו.</span>
                </>
              )}
            </h1>
            <p className="lead nf__lead">
              {isMissing
                ? 'אולי הקישור ישן, אולי הוקלד לא נכון. אם הגעתם לכאן כי החשבון שלכם נחסם, בזה אני כן יכול לעזור.'
                : 'נסו לרענן את הדף. אם החשבון שלכם נחסם ואתם צריכים עזרה עכשיו, אני זמין בוואטסאפ.'}
            </p>
            <div className="nf__actions">
              <WaBtn message="היי, החשבון שלי חסום, אשמח לעזרה" location="not-found">שלחו לי את המקרה בוואטסאפ</WaBtn>
              <Link to="/" className="btn btn--ghost btn--plain">חזרה לדף הבית</Link>
            </div>
          </div>

          <nav className="nf__links" aria-label="דפים שימושיים">
            <p className="nf__kicker">( אולי חיפשתם )</p>
            <ul>
              {LINKS.map((link, i) => (
                <li key={link.to}>
                  <Link to={link.to}>
                    <span className="num nf__num">0{i + 1}</span>
                    <span>{link.label}</span>
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
