import React, { useState } from 'react';
import { Link } from 'react-router';
import { openWhatsApp } from '../utils/whatsapp';
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
              <p><i className="fas fa-map-marker-alt"></i> נתניה, ישראל</p>
              <p><i className="fas fa-phone"></i> 050-9823-235</p>
              <p><i className="fas fa-envelope"></i> osher@israeltechforce.com</p>
            </div>
            <div className="contact-buttons">
              <button className="footer-cta" onClick={openWhatsApp}>
                <i className="fab fa-whatsapp"></i>
                דברו איתנו בוואטסאפ
              </button>
              <button className="footer-cta contact-form-btn" onClick={() => openModal('contact')}>
                <i className="fas fa-envelope"></i>
                טופס יצירת קשר
              </button>
            </div>
          </div>

          {/* Column 2: Social Media */}
          <div className="footer-section">
            <h3>עקבו אחרינו</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/OsheRevach23" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/osher_revach_1/" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/+972509823235" className="social-link" onClick={(e) => { e.preventDefault(); openWhatsApp(); }}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.tiktok.com/@israeltechforce" className="social-link">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="footer-section">
            <h3>הצטרפו לניוזלטר</h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              הצטרפו לרשימת התפוצה שלנו וקבלו עדכונים, טיפים וכלים שימושיים ישירות לתיבת האימייל שלכם
            </p>
            <a
              href="https://israeltechforce.vp4.me/newslettersub"
              target="_blank"
              rel="noopener noreferrer"
              className="newsletter-link-btn"
            >
              <i className="fas fa-envelope"></i>
              הצטרפו לניוזלטר שלנו
            </a>
          </div>

          {/* Column 4: Quick Links */}
          <div className="footer-section">
            <h3>קישורים מהירים</h3>
            <div className="quick-links">
              <Link to="/privacy" className="quick-link">
                <i className="fas fa-shield-alt"></i>
                מדיניות פרטיות
              </Link>
              <button onClick={() => openModal('accessibility')} className="quick-link">
                <i className="fas fa-universal-access"></i>
                נגישות
              </button>
              <button onClick={() => openModal('terms')} className="quick-link">
                <i className="fas fa-file-contract"></i>
                תנאי שימוש
              </button>
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
            <p>© 2025 IsraelTechForce. כל הזכויות שמורות</p>
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
