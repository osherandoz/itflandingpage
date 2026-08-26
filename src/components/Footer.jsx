import React, { useState } from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, trackWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { useLang } from '../i18n';
import Icon from './Icon';
import Modal from './Modal';
import ContactForm from './ContactForm';
import './Footer.css';

const ACCESSIBILITY_CONTENT = {
  he: (
    <div className="modal-content-text">
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
  ),
  en: (
    <div className="modal-content-text">
      <p>At ITF Recovery I believe every user, including people with disabilities, has the right to an accessible and equal experience.</p>

      <h4>Accessibility on this site</h4>
      <p>The site was designed with a comfortable, accessible experience in mind. It includes:</p>
      <ul>
        <li>A clear, simple structure that makes navigation easy.</li>
        <li>Text that can be enlarged through your browser.</li>
        <li>Colors and contrast tuned for readability.</li>
      </ul>

      <h4>Assistive technologies</h4>
      <p>The site works with screen readers and all common browsers.</p>

      <h4>Accessibility feedback</h4>
      <p>If you run into any difficulty using the site, or have a suggestion for improving accessibility, I would love to hear from you:</p>
      <p>📧 <a href="mailto:accessability@itf-recovery.co.il" className="modal-link">accessability@itf-recovery.co.il</a></p>

      <p>I will do my best to handle every request quickly and professionally.</p>
    </div>
  ),
};

const TERMS_CONTENT = {
  he: (
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
      <p>לשאלות או הבהרות ניתן לפנות אליי בכתובת:</p>
      <p>📧 <a href="mailto:osher@israeltechforce.com" className="modal-link">osher@israeltechforce.com</a></p>
    </div>
  ),
  en: (
    <div className="modal-content-text">
      <p><strong>Last updated: 19/08/2025</strong></p>

      <p>Welcome to the ITF Recovery website (the "Site"). Use of the Site is subject to these Terms of Use. Please read them carefully before using the Site.</p>

      <h4>1. General</h4>
      <ul>
        <li>1.1. Using the Site constitutes your full acceptance of these terms.</li>
        <li>1.2. If you do not agree to any of these terms, please stop using the Site.</li>
      </ul>

      <h4>2. Services on the Site</h4>
      <ul>
        <li>2.1. The Site provides general information about the company's social-media account recovery services.</li>
        <li>2.2. The Site allows newsletter signup by providing an email address only.</li>
      </ul>

      <h4>3. User Responsibility</h4>
      <ul>
        <li>3.1. The user agrees to use the Site and the services offered on it for lawful purposes only.</li>
        <li>3.2. Submitting false details, or details of others without their permission, is prohibited.</li>
      </ul>

      <h4>4. Company Responsibility</h4>
      <ul>
        <li>4.1. The content on the Site is provided AS IS, without any warranty or representation by the company.</li>
        <li>4.2. The company is not liable for any direct or indirect damage caused by using the Site or relying on information it contains.</li>
        <li>4.3. The content on the Site does not constitute professional or legal advice, but general information only.</li>
      </ul>

      <h4>5. Intellectual Property</h4>
      <ul>
        <li>5.1. All copyrights and intellectual property in the Site and its content, including texts, designs, images and logo, belong exclusively to ITF Recovery or to parties that have licensed their use.</li>
        <li>5.2. Copying, distributing, reproducing, publishing or making any other use of the Site's content without prior written approval from the company is prohibited.</li>
      </ul>

      <h4>6. Changes to These Terms</h4>
      <ul>
        <li>6.1. The company reserves the right to change these terms at any time, at its sole discretion.</li>
        <li>6.2. Continued use of the Site after changes are published constitutes acceptance of the updated terms.</li>
      </ul>

      <h4>7. Jurisdiction</h4>
      <p>These Terms of Use are governed by the laws of the State of Israel. Any dispute will fall under the exclusive jurisdiction of the competent courts of the Tel Aviv district.</p>

      <h4>Contact</h4>
      <p>For questions or clarifications you can reach me at:</p>
      <p>📧 <a href="mailto:osher@israeltechforce.com" className="modal-link">osher@israeltechforce.com</a></p>
    </div>
  ),
};

const STR = {
  he: {
    contactTitle: 'פרטי קשר',
    location: 'נתניה, ישראל',
    whatsappCta: 'דבר/י איתי בוואטסאפ',
    contactFormBtn: 'טופס יצירת קשר',
    followTitle: 'עקוב/י אחריי',
    facebookAria: 'עמוד פייסבוק',
    instagramAria: 'עמוד אינסטגרם',
    whatsappAria: 'שלח הודעת וואטסאפ',
    tiktokAria: 'ערוץ טיקטוק',
    newsletterTitle: 'The Safety Signal',
    newsletterText: 'הניוזלטר החודשי שלי: מה מטא שינתה, מקרה חסימה אמיתי מהחודש האחרון, ובדיקה אחת שמורידה סיכון. חמש דקות קריאה.',
    newsletterBtn: 'הצטרף/י לניוזלטר',
    servicesTitle: 'השירותים שלי',
    serviceLinks: [
      { to: '/שחזור-חשבון-פייסבוק', label: 'שחזור חשבון פייסבוק' },
      { to: '/שחזור-חשבון-אינסטגרם', label: 'שחזור חשבון אינסטגרם' },
      { to: '/שחזור-חשבון-וואטסאפ', label: 'שחזור חשבון וואטסאפ' },
      { to: '/חשבון-פייסבוק-מושבת', label: 'חשבון פייסבוק מושבת' },
      { to: '/חשבון-אינסטגרם-נפרץ', label: 'חשבון אינסטגרם נפרץ' },
      { to: '/שחזור-מנהל-מודעות', label: 'שחזור מנהל מודעות' },
      { to: '/bms-sm', label: 'קורס BMS, מניעת חסימות' },
      { to: '/VSL-BMS', label: 'הדרכה: איך לא להיחסם' },
    ],
    quickTitle: 'קישורים מהירים',
    quickFaq: 'שאלות נפוצות',
    quickTestimonials: 'המלצות לקוחות',
    quickArticles: 'מאמרים',
    quickNewsletter: 'ניוזלטר חודשי',
    privacyLink: 'מדיניות פרטיות',
    accessibilityLink: 'נגישות',
    termsLink: 'תנאי שימוש',
    copyright: '© 2026 IsraelTechForce. כל הזכויות שמורות',
    accessibilityTitle: 'נגישות',
    termsTitle: 'תנאי שימוש',
    contactModalTitle: 'טופס יצירת קשר',
    whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
  },
  en: {
    contactTitle: 'Contact',
    location: 'Netanya, Israel',
    whatsappCta: 'Chat with me on WhatsApp',
    contactFormBtn: 'Contact form',
    followTitle: 'Follow me',
    facebookAria: 'Facebook page',
    instagramAria: 'Instagram page',
    whatsappAria: 'Send a WhatsApp message',
    tiktokAria: 'TikTok channel',
    newsletterTitle: 'The Safety Signal',
    newsletterText: 'My monthly newsletter: what Meta changed, a real ban case from the past month, and one check that lowers your risk. A five-minute read.',
    newsletterBtn: 'Join the newsletter',
    servicesTitle: 'My Services',
    serviceLinks: [
      { to: '/en/facebook-account-recovery', label: 'Facebook Account Recovery' },
      { to: '/en/instagram-account-recovery', label: 'Instagram Account Recovery' },
      { to: '/en/whatsapp-account-recovery', label: 'WhatsApp Account Recovery' },
      { to: '/en/facebook-account-disabled', label: 'Disabled Facebook Account' },
      { to: '/en/instagram-account-hacked', label: 'Hacked Instagram Account' },
      { to: '/en/ads-manager-recovery', label: 'Ads Manager Recovery' },
    ],
    quickTitle: 'Quick Links',
    quickFaq: 'FAQ',
    quickTestimonials: 'Client Reviews',
    quickArticles: 'Articles',
    quickNewsletter: 'Monthly Newsletter',
    privacyLink: 'Privacy Policy',
    accessibilityLink: 'Accessibility',
    termsLink: 'Terms of Use',
    copyright: '© 2026 IsraelTechForce. All rights reserved',
    accessibilityTitle: 'Accessibility',
    termsTitle: 'Terms of Use',
    contactModalTitle: 'Contact Form',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const { lang, prefix } = useLang();
  const t = STR[lang];

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalContent = {
    accessibility: {
      title: t.accessibilityTitle,
      content: ACCESSIBILITY_CONTENT[lang]
    },
    terms: {
      title: t.termsTitle,
      content: TERMS_CONTENT[lang]
    },
    contact: {
      title: t.contactModalTitle,
      content: <ContactForm />
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Column 1: Contact Info */}
          <div className="footer-section">
            <h3>{t.contactTitle}</h3>
            <div className="contact-info">
              <p><Icon name="mapPin" aria-hidden="true" /> {t.location}</p>
              <p><Icon name="phone" aria-hidden="true" /> 050-9823-235</p>
              <p><Icon name="envelope" aria-hidden="true" /> osher@israeltechforce.com</p>
            </div>
            <div className="contact-buttons">
              <a className="footer-cta" href={getWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
                <Icon name="whatsapp" aria-hidden="true" />
                {t.whatsappCta}
              </a>
              <button className="footer-cta contact-form-btn" onClick={() => openModal('contact')}>
                <Icon name="envelope" aria-hidden="true" />
                {t.contactFormBtn}
              </button>
            </div>
          </div>

          {/* Column 2: Social Media */}
          <div className="footer-section">
            <h3>{t.followTitle}</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/OsheRevach23" className="social-link" aria-label={t.facebookAria}>
                <Icon name="facebook" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/osher_revach_1/" className="social-link" aria-label={t.instagramAria}>
                <Icon name="instagram" aria-hidden="true" />
              </a>
              <a href={getWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={t.whatsappAria} onClick={trackWhatsAppClick}>
                <Icon name="whatsapp" aria-hidden="true" />
              </a>
              <a href="https://www.tiktok.com/@israeltechforce" className="social-link" aria-label={t.tiktokAria}>
                <Icon name="tiktok" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="footer-section">
            <h3>{t.newsletterTitle}</h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {t.newsletterText}
            </p>
            <Link to={`${prefix}/newsletter`} className="newsletter-link-btn">
              <Icon name="envelope" aria-hidden="true" />
              {t.newsletterBtn}
            </Link>
          </div>

          {/* Column 4: Services, internal links for SEO (money pages were orphaned) */}
          <div className="footer-section">
            <h3>{t.servicesTitle}</h3>
            <div className="quick-links">
              {t.serviceLinks.map((link) => (
                <Link key={link.to} to={link.to} className="quick-link">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Column 5: Quick Links */}
          <div className="footer-section">
            <h3>{t.quickTitle}</h3>
            <div className="quick-links">
              <Link to={`${prefix}/faq`} className="quick-link">
                <Icon name="questionCircle" aria-hidden="true" />
                {t.quickFaq}
              </Link>
              <Link to={`${prefix}/testimonials`} className="quick-link">
                <Icon name="star" aria-hidden="true" />
                {t.quickTestimonials}
              </Link>
              <Link to={`${prefix}/articles`} className="quick-link">
                <Icon name="newspaper" aria-hidden="true" />
                {t.quickArticles}
              </Link>
              <Link to={`${prefix}/newsletter`} className="quick-link">
                <Icon name="envelopeOpen" aria-hidden="true" />
                {t.quickNewsletter}
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <Link to={`${prefix}/privacy`} className="footer-link">
              {t.privacyLink}
            </Link>
            <button onClick={() => openModal('accessibility')} className="footer-link">
              {t.accessibilityLink}
            </button>
            <button onClick={() => openModal('terms')} className="footer-link">
              {t.termsLink}
            </button>
          </div>
          <div className="copyright">
            <p>{t.copyright}</p>
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
