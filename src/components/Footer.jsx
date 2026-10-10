import React, { useState } from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { FACTS } from '../data/businessFacts';
import Icon from './Icon';
import Modal from './Modal';
import ContactForm from './ContactForm';
import { WaBtn, ArrowIcon } from './ui';
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

const TERMS_CONTENT = (
  <div className="legal">
      <p><strong>עדכון אחרון: 19/08/2025</strong></p>

      <p>ברוך הבא לאתר ITF Recovery (להלן: "האתר"). השימוש באתר כפוף לתנאי שימוש אלה. אנא קרא אותם בעיון לפני השימוש.</p>

      <h4>1. כללי</h4>
      <ul>
        <li>1.1. השימוש באתר מהווה הסכמה מצדך לתנאים אלה במלואם.</li>
        <li>1.2. במידה ואינך מסכים לאחד מתנאי השימוש, הנך מתבקש להימנע מהמשך שימוש באתר.</li>
      </ul>

      <h4>2. השירותים באתר</h4>
      <ul>
        <li>2.1. האתר מספק מידע כללי אודות שירותי החברה בתחום שחזור חשבונות ברשתות החברתיות.</li>
        <li>2.2. האתר מאפשר הרשמה לניוזלטר באמצעות מסירת כתובת דוא"ל בלבד.</li>
      </ul>

      <h4>3. אחריות המשתמש</h4>
      <ul>
        <li>3.1. המשתמש מתחייב לעשות שימוש באתר ובשירותים המוצעים בו אך ורק לצרכים חוקיים.</li>
        <li>3.2. חל איסור למסור פרטים כוזבים או של אחרים ללא רשותם.</li>
      </ul>

      <h4>4. אחריות החברה</h4>
      <ul>
        <li>4.1. התכנים באתר ניתנים לשימוש כפי שהם (AS IS) מבלי שתהיה לחברה אחריות או מצג כלשהו בנוגע אליהם.</li>
        <li>4.2. החברה אינה נושאת באחריות לכל נזק ישיר או עקיף שייגרם כתוצאה מהשימוש באתר או בהסתמכות על מידע הכלול בו.</li>
        <li>4.3. יובהר כי אין בתכנים באתר משום ייעוץ מקצועי או משפטי, אלא מידע כללי בלבד.</li>
      </ul>

      <h4>5. קניין רוחני</h4>
      <ul>
        <li>5.1. כל זכויות היוצרים והקניין הרוחני באתר ובתכניו, לרבות טקסטים, עיצובים, תמונות ולוגו, שייכים ל־ITF Recovery בלבד או לגורמים שהעניקו לה רישיון שימוש.</li>
        <li>5.2. אין להעתיק, להפיץ, לשכפל, לפרסם או לעשות כל שימוש אחר בתכני האתר ללא קבלת אישור מראש ובכתב מהחברה.</li>
      </ul>

      <h4>6. שינוי תנאי השימוש</h4>
      <ul>
        <li>6.1. החברה שומרת לעצמה את הזכות לשנות תנאים אלה בכל עת, על פי שיקול דעתה הבלעדי.</li>
        <li>6.2. המשך שימוש באתר לאחר פרסום השינויים מהווה הסכמה של המשתמש לתנאים המעודכנים.</li>
      </ul>

      <h4>7. סמכות שיפוט</h4>
      <p>על תנאי שימוש אלה יחולו דיני מדינת ישראל, ובמקרה של מחלוקת תהיה סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים במחוז תל אביב.</p>

      <h4>יצירת קשר</h4>
      <p>לשאלות או הבהרות ניתן לפנות אליי בכתובת:</p>
      <p>📧 <a href="mailto:osher@israeltechforce.com" className="modal-link">osher@israeltechforce.com</a></p>
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
  { to: '/VSL-BMS', label: 'קורס BMS (₪297): איך לא להיחסם' },
];

const QUICK_LINKS = [
  { to: '/faq', label: 'שאלות נפוצות' },
  { to: '/testimonials', label: 'המלצות לקוחות' },
  { to: '/articles', label: 'מאמרים' },
  { to: '/press', label: 'בתקשורת' },
  { to: '/newsletter', label: 'ניוזלטר חודשי' },
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
        <div className="footer__cta theme-signal m-reveal">
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

          <div className="footer__col footer__col--wide">
            <h3>The Safety Signal</h3>
            <p className="footer__text">
              הניוזלטר החודשי שלי: מה מטא שינתה, מקרה חסימה אמיתי מהחודש האחרון, ובדיקה אחת שמורידה סיכון. חמש דקות קריאה.
            </p>
            <Link to="/newsletter" className="btn btn--paper btn--sm">
              <span>הצטרף/י לניוזלטר</span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </Link>
            <ul className="footer__course">
              {COURSE_LINKS.map((link) => (
                <li key={link.to}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
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
            <button onClick={() => setActiveModal('terms')}>תנאי שימוש</button>
          </div>
        </div>
      </div>

      <Modal isOpen={activeModal === 'accessibility'} onClose={closeModal} title="נגישות">
        {ACCESSIBILITY_CONTENT}
      </Modal>
      <Modal isOpen={activeModal === 'terms'} onClose={closeModal} title="תנאי שימוש">
        {TERMS_CONTENT}
      </Modal>
      <Modal isOpen={activeModal === 'contact'} onClose={closeModal} title="טופס יצירת קשר">
        <ContactForm location="footer-form" />
      </Modal>
    </footer>
  );
};

export default Footer;
