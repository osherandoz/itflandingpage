import React, { useState } from 'react';
import { openWhatsApp } from '../utils/whatsapp';
import Modal from './Modal';
import ContactForm from './ContactForm';
// Newsletter integration disabled - using external link instead
// import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import './Footer.css';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  // Newsletter form disabled - using external link instead
  // const [newsletterData, setNewsletterData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: ''
  // });
  // const [newsletterStatus, setNewsletterStatus] = useState({ message: '', type: '' });
  // const [isSubscribing, setIsSubscribing] = useState(false);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Newsletter form submission disabled - using external link instead
  // const handleNewsletterSubmit = async (e) => {
  //   e.preventDefault();
  //   
  //   if (!newsletterData.firstName.trim()) {
  //     setNewsletterStatus({ message: 'אנא הכניסו שם פרטי', type: 'error' });
  //     return;
  //   }
  //
  //   if (!newsletterData.lastName.trim()) {
  //     setNewsletterStatus({ message: 'אנא הכניסו שם משפחה', type: 'error' });
  //     return;
  //   }
  //
  //   if (!newsletterData.email.trim()) {
  //     setNewsletterStatus({ message: 'אנא הכניסו כתובת אימייל', type: 'error' });
  //     return;
  //   }
  //
  //   if (!validateEmail(newsletterData.email)) {
  //     setNewsletterStatus({ message: 'כתובת האימייל אינה תקינה', type: 'error' });
  //     return;
  //   }
  //
  //   setIsSubscribing(true);
  //   setNewsletterStatus({ message: '', type: '' });
  //
  //   try {
  //     const result = await subscribeToNewsletter(
  //       newsletterData.firstName, 
  //       newsletterData.lastName, 
  //       newsletterData.email
  //     );
  //     
  //     if (result.success) {
  //       setNewsletterStatus({ message: result.message, type: 'success' });
  //       setNewsletterData({ firstName: '', lastName: '', email: '' });
  //     } else {
  //       setNewsletterStatus({ message: result.message, type: 'error' });
  //     }
  //   } catch {
  //     setNewsletterStatus({ 
  //       message: 'שגיאה בהרשמה לניוזלטר - אנא נסו שוב מאוחר יותר', 
  //       type: 'error' 
  //     });
  //   } finally {
  //     setIsSubscribing(false);
  //   }
  // };

  const modalContent = {
    privacy: {
      title: 'מדיניות פרטיות',
      content: (
        <div className="modal-content-text">
          <p><strong>עדכון אחרון: 19/08/2025</strong></p>

          <p>אנו ב־ITF Recovery (להלן: "החברה", "אנחנו" או "האתר") מכבדים את פרטיות המשתמשים שלנו, ופועלים בשקיפות מלאה בכל הקשור לאיסוף ושימוש במידע. מטרת מסמך זה היא להסביר כיצד אנו אוספים, שומרים ומשתמשים במידע שמתקבל דרך האתר.</p>

          <h4>איזה מידע אנו אוספים?</h4>
          <p>האתר אינו אוסף מידע אישי ממשתמשיו, למעט:</p>
          <ul>
            <li>כתובת דואר אלקטרוני – במידה ותבחרו להירשם לניוזלטר/רשימת תפוצה.</li>
          </ul>

          <h4>כיצד אנו משתמשים במידע?</h4>
          <p>כתובת הדוא"ל שתסופק לנו תשמש אך ורק למטרות הבאות:</p>
          <ul>
            <li>שליחת עדכונים, טיפים ומידע הקשור לשירותי החברה.</li>
            <li>העברת הצעות מיוחדות או תכנים שיווקיים רלוונטיים.</li>
          </ul>

          <h4>שיתוף מידע עם צדדים שלישיים</h4>
          <p>אנחנו לא מעבירים ולא משתפים את פרטי המשתמשים עם גורמים חיצוניים, למעט במקרים בהם הדבר נדרש על פי חוק, הוראה של רשות מוסמכת, או לצורך הגנה משפטית.</p>

          <h4>שמירת מידע</h4>
          <ul>
            <li>כתובת הדוא"ל נשמרת במערכת ניהול רשימות תפוצה מאובטחת.</li>
            <li>בכל עת ניתן להסיר את עצמכם מהרשימה על ידי לחיצה על קישור ההסרה המצורף לכל הודעת דוא"ל שנשלחת.</li>
          </ul>

          <h4>שימוש בעוגיות (Cookies)</h4>
          <p>האתר עשוי לעשות שימוש בעוגיות בסיסיות לצורך שיפור חוויית המשתמש וניטור טכני (כגון ביצועי האתר). בעוגיות אלו אין מידע מזהה אישי.</p>

          <h4>אבטחת מידע</h4>
          <p>אנו מיישמים אמצעי אבטחה מתאימים כדי לשמור על המידע שנאסף באתר מפני גישה בלתי מורשית, שימוש לא תקין או חשיפה.</p>

          <h4>זכויות המשתמש</h4>
          <p>בכל עת עומדת לך הזכות:</p>
          <ul>
            <li>לבקש הסרה מיידית מרשימת התפוצה.</li>
            <li>לפנות אלינו לקבלת מידע נוסף על האופן שבו אנו שומרים או משתמשים בפרטיך.</li>
          </ul>

          <h4>יצירת קשר</h4>
          <p>לשאלות או בקשות נוספות בעניין מדיניות פרטיות זו, ניתן לפנות אלינו בכתובת:</p>
          <p>📧 <a href="mailto:privacy@poncho.tech" className="modal-link">privacy@poncho.tech</a></p>
        </div>
      )
    },
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
          <p>📧 <a href="mailto:info@poncho.tech" className="modal-link">info@poncho.tech</a></p>
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
              <p><i className="fas fa-envelope"></i> info@poncho.tech</p>
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
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <i className="fas fa-envelope" style={{ marginLeft: '8px' }}></i>
              הצטרפו לניוזלטר שלנו
            </a>
          </div>

          {/* Column 4: Quick Links */}
          <div className="footer-section">
            <h3>קישורים מהירים</h3>
            <div className="quick-links">
              <button onClick={() => openModal('privacy')} className="quick-link">
                <i className="fas fa-shield-alt"></i>
                מדיניות פרטיות
              </button>
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
            <button onClick={() => openModal('privacy')} className="footer-link">
              מדיניות פרטיות
            </button>
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
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title={modalContent.privacy.title}
      >
        {modalContent.privacy.content}
      </Modal>

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
