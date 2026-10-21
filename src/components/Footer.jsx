import React, { useState } from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { FACTS } from '../data/businessFacts';
import Icon from './Icon';
import Modal from './Modal';
import ContactForm from './ContactForm';
import { WaBtn } from './ui';
import './Footer.css';

const ACCESSIBILITY_CONTENT = (
  <div className="legal">
      <p>ב־ITF Recovery אני מאמין בזכותם של כלל המשתמשים, לרבות אנשים עם מוגבלות, ליהנות משירות נגיש ושוויוני.</p>

      <h4>מצב הנגישות באתר</h4>
      <p>האתר תוכנן תוך מחשבה על חוויית שימוש נוחה ונגישה ככל האפשר. האתר כולל:</p>
      <ul>
        <li>מבנה ברור ופשוט המאפשר ניווט קל.</li>
        <li>אפשרות להגדלת טקסט באמצעות הדפדפן.</li>
        <li>צבעים וניגודיות המותאמים לקריאה.</li>
      </ul>

      <h4>שימוש בטכנולוגיות מסייעות</h4>
      <p>האתר מותאם לשימוש עם תוכנות קורא מסך ודפדפנים נפוצים.</p>

      <h4>פניות בנושא נגישות</h4>
      <p>במידה ונתקלת בקושי בשימוש באתר או שיש לך הצעה לשיפור הנגישות, אשמח לשמוע:</p>
      <p>📧 <a href="mailto:accessability@itf-recovery.co.il" className="modal-link">accessability@itf-recovery.co.il</a></p>

      <p>אשתדל לטפל בכל פנייה במהירות האפשרית ובאופן המקצועי ביותר.</p>
    </div>
  );

const WHATSAPP_MESSAGE = 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים';

const SERVICE_LINKS = [
  { to: '/שחזור-חשבון-פייסבוק', label: 'שחזור חשבון פייסבוק' },
  { to: '/שחזור-חשבון-אינסטגרם', label: 'שחזור חשבון אינסטגרם' },
  { to: '/שחזור-חשבון-וואטסאפ', label: 'שחזור חשבון וואטסאפ' },
  { to: '/חשבון-פייסבוק-מושבת', label: 'חשבון פייסבוק מושבת' },
  { to: '/חשבון-אינסטגרם-נפרץ', label: 'חשבון אינסטגרם נפרץ' },
  { to: '/שחזור-מנהל-מודעות', label: 'שחזור מנהל מודעות' },
];

const COURSE_LINKS = [
  { to: '/bms-sm', label: 'צ׳קליסט סינון לקוחות (חינם)' },
  { to: '/VSL-BMS', label: 'קורס BMS (₪99): איך לא להיחסם' },
];

const QUICK_LINKS = [
  { to: '/faq', label: 'שאלות נפוצות' },
  { to: '/testimonials', label: 'המלצות לקוחות' },
  { to: '/articles', label: 'מאמרים' },
  { to: '/press', label: 'בתקשורת' },
  { to: '/אושר-רווח', label: 'עליי' },
];

const SOCIAL = [
  { href: 'https://www.facebook.com/OsheRevach23', icon: 'facebook', label: 'עמוד פייסבוק' },
  { href: 'https://www.instagram.com/osher_revach_1/', icon: 'instagram', label: 'עמוד אינסטגרם' },
  { href: 'https://www.tiktok.com/@israeltechforce', icon: 'tiktok', label: 'ערוץ טיקטוק' },
];

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const closeModal = () => setActiveModal(null);

  return (
    <footer className="footer theme-ink">
      <div className="container">
        {/* Closing call to action */}
        <div className="footer__cta m-reveal">
          <p className="footer__cta-title display">
            <span className="lt">החשבון נחסם?</span> שלחו לי את המקרה.
          </p>
          <div className="footer__cta-actions">
            <WaBtn message={WHATSAPP_MESSAGE} location="footer-cta">דבר/י איתי בוואטסאפ</WaBtn>
            <button className="btn btn--ghost btn--plain" onClick={() => setActiveModal('contact')}>
              טופס יצירת קשר
            </button>
          </div>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <h3>פרטי קשר</h3>
            <ul className="footer__contact">
              <li><Icon name="mapPin" /> נתניה, ישראל</li>
              <li><Icon name="phone" /> <a href="tel:+972509823235" dir="ltr">050-9823-235</a></li>
              <li><Icon name="envelope" /> <a href="mailto:osher@israeltechforce.com">osher@israeltechforce.com</a></li>
              <li><Icon name="clock" /> {FACTS.hours.he}</li>
            </ul>
            <div className="footer__social">
              {SOCIAL.map((s) => (
                <a key={s.icon} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={s.icon} />
                </a>
              ))}
              <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="שלח הודעת וואטסאפ"
                onClick={onWhatsAppClick('footer-social')}
              >
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>

          {/* Services: internal links for SEO (money pages were orphaned) */}
          <nav className="footer__col" aria-label="השירותים שלי">
            <h3>השירותים שלי</h3>
            <ul>
              {SERVICE_LINKS.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="קישורים מהירים">
            <h3>קישורים מהירים</h3>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="ללמוד ולהגן מראש">
            <h3>ללמוד ולהגן מראש</h3>
            <ul>
              {COURSE_LINKS.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <img
          className="footer__mark"
          src="/images/brand/logo-white-960.webp"
          alt=""
          width="960"
          height="708"
          loading="lazy"
          decoding="async"
        />

        <div className="footer__bottom">
          <p>© 2026 IsraelTechForce. כל הזכויות שמורות</p>
          <div className="footer__legal">
            <Link to="/privacy">מדיניות פרטיות</Link>
            <button onClick={() => setActiveModal('accessibility')}>נגישות</button>
            <Link to="/terms">תנאי שימוש</Link>
          </div>
        </div>
      </div>

      <Modal isOpen={activeModal === 'accessibility'} onClose={closeModal} title="נגישות">
        {ACCESSIBILITY_CONTENT}
      </Modal>
      <Modal isOpen={activeModal === 'contact'} onClose={closeModal} title="טופס יצירת קשר">
        <ContactForm location="footer-form" />
      </Modal>
    </footer>
  );
};

export default Footer;
