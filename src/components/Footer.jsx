import React, { useState } from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import Icon from './Icon';
import Modal from './Modal';
import ContactForm from './ContactForm';
import './Footer.css';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalContent = {
    accessibility: {
      title: 'נגישות',
      content: (
        <div className="modal-content-text">
          <p>ב־ITF Recovery אנו מאמינים בזכותם של כלל המשתמשים, לרבות אנשים עם מוגבלות, ליהנות משירות נגיש ושוויוני.</p>
          
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
          <p>במידה ונתקלתם בקושי בשימוש באתר או שיש לכם הצעה לשיפור הנגישות, נשמח לשמוע:</p>
          <p>📧 <a href="mailto:accessability@itf-recovery.co.il" className="modal-link">accessability@itf-recovery.co.il</a></p>
          
          <p>נשתדל לטפל בכל פנייה במהירות האפשרית ובאופן המקצועי ביותר.</p>
        </div>
      )
    },
    terms: {
      title: 'תנאי שימוש',
      content: (
        <div className="modal-content-text">
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
          <p>לשאלות או הבהרות ניתן לפנות אלינו בכתובת:</p>
          <p>📧 <a href="mailto:osher@israeltechforce.com" className="modal-link">osher@israeltechforce.com</a></p>
        </div>
      )
    },
    contact: {
      title: 'טופס יצירת קשר',
      content: <ContactForm />
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Column 1: Contact Info */}
          <div className="footer-section">
            <h3>פרטי קשר</h3>
            <div className="contact-info">
              <p><Icon name="mapPin" aria-hidden="true" /> נתניה, ישראל</p>
              <p><Icon name="phone" aria-hidden="true" /> 050-9823-235</p>
              <p><Icon name="envelope" aria-hidden="true" /> osher@israeltechforce.com</p>
            </div>
            <div className="contact-buttons">
              <a className="footer-cta" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
                <Icon name="whatsapp" aria-hidden="true" />
                דברו איתנו בוואטסאפ
              </a>
              <button className="footer-cta contact-form-btn" onClick={() => openModal('contact')}>
                <Icon name="envelope" aria-hidden="true" />
                טופס יצירת קשר
              </button>
            </div>
          </div>

          {/* Column 2: Social Media */}
          <div className="footer-section">
            <h3>עקבו אחרינו</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/OsheRevach23" className="social-link" aria-label="עמוד פייסבוק">
                <Icon name="facebook" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/osher_revach_1/" className="social-link" aria-label="עמוד אינסטגרם">
                <Icon name="instagram" aria-hidden="true" />
              </a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="שלח הודעת וואטסאפ" onClick={trackWhatsAppClick}>
                <Icon name="whatsapp" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com/@israeltechforce" className="social-link" aria-label="ערוץ טיקטוק">
                <Icon name="tiktok" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="footer-section">
            <h3>The Safety Signal</h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              הניוזלטר החודשי שלנו: מה מטא שינתה, מקרה חסימה אמיתי מהחודש האחרון, ובדיקה אחת שמורידה סיכון. חמש דקות קריאה.
            </p>
            <Link to="/newsletter" className="newsletter-link-btn">
              <Icon name="envelope" aria-hidden="true" />
              הצטרפו לניוזלטר
            </Link>
          </div>

          {/* Column 4: Services, internal links for SEO (money pages were orphaned) */}
          <div className="footer-section">
            <h3>השירותים שלנו</h3>
            <div className="quick-links">
              <Link to="/שחזור-חשבון-פייסבוק" className="quick-link">שחזור חשבון פייסבוק</Link>
              <Link to="/שחזור-חשבון-אינסטגרם" className="quick-link">שחזור חשבון אינסטגרם</Link>
              <Link to="/שחזור-חשבון-וואטסאפ" className="quick-link">שחזור חשבון וואטסאפ</Link>
              <Link to="/חשבון-פייסבוק-מושבת" className="quick-link">חשבון פייסבוק מושבת</Link>
              <Link to="/חשבון-אינסטגרם-נפרץ" className="quick-link">חשבון אינסטגרם נפרץ</Link>
              <Link to="/שחזור-מנהל-מודעות" className="quick-link">שחזור מנהל מודעות</Link>
              <Link to="/bms-sm" className="quick-link">קורס BMS, מניעת חסימות</Link>
              <Link to="/VSL-BMS" className="quick-link">הדרכה: איך לא להיחסם</Link>
            </div>
          </div>

          {/* Column 5: Quick Links */}
          <div className="footer-section">
            <h3>קישורים מהירים</h3>
            <div className="quick-links">
              <Link to="/faq" className="quick-link">
                <Icon name="questionCircle" aria-hidden="true" />
                שאלות נפוצות
              </Link>
              <Link to="/testimonials" className="quick-link">
                <Icon name="star" aria-hidden="true" />
                המלצות לקוחות
              </Link>
              <Link to="/articles" className="quick-link">
                <Icon name="newspaper" aria-hidden="true" />
                מאמרים
              </Link>
              <Link to="/newsletter" className="quick-link">
                <Icon name="envelopeOpen" aria-hidden="true" />
                ניוזלטר חודשי
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">
              מדיניות פרטיות
            </Link>
            <button onClick={() => openModal('accessibility')} className="footer-link">
              נגישות
            </button>
            <button onClick={() => openModal('terms')} className="footer-link">
              תנאי שימוש
            </button>
          </div>
          <div className="copyright">
            <p>© 2026 IsraelTechForce. כל הזכויות שמורות</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'accessibility'}
        onClose={closeModal}
        title={modalContent.accessibility.title}
      >
        {modalContent.accessibility.content}
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title={modalContent.terms.title}
      >
        {modalContent.terms.content}
      </Modal>

      <Modal
        isOpen={activeModal === 'contact'}
        onClose={closeModal}
        title={modalContent.contact.title}
      >
        {modalContent.contact.content}
      </Modal>
    </footer>
  );
};

export default Footer;
