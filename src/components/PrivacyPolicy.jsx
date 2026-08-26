import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useLang } from '../i18n';
import './PrivacyPolicy.css';

const STR = {
  he: {
    modalTitle: 'מדיניות פרטיות',
    heading: 'מדיניות פרטיות',
    intro: 'ברוכים הבאים לאתר שלנו. אנו מחויבים להגן על פרטיותכם ולשמור על המידע האישי שלכם.',
    collectTitle: 'איסוף מידע',
    collectIntro: 'אנו עשויים לאסוף את המידע הבא רק באישור מפורש שלכם:',
    collectItems: ['שם מלא', 'כתובת דוא"ל', 'מספר טלפון'],
    useTitle: 'שימוש במידע',
    useIntro: 'המידע שנאסוף ישמש למטרות הבאות:',
    useItems: [
      'יצירת קשר עם לקוחות',
      'שליחת עדכונים על שירותים',
      'שיפור השירותים שלנו',
      'פתרון בעיות ותמיכה טכנית',
    ],
    securityTitle: 'אבטחה',
    securityText:
      'אנו נוקטים באמצעי אבטחה מתקדמים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית, שימוש לרעה או חשיפה.',
    sharingTitle: 'שיתוף מידע',
    sharingText:
      'אנו לא נשתף את המידע האישי שלכם עם צדדים שלישיים ללא הסכמתכם המפורשת, אלא אם כן נדרש על פי חוק.',
    rightsTitle: 'זכויותיכם',
    rightsIntro: 'יש לכם הזכות:',
    rightsItems: [
      'לגשת למידע האישי שלכם',
      'לתקן מידע שגוי',
      'למחוק את המידע שלכם',
      'להתנגד לעיבוד המידע שלכם',
    ],
    updatesTitle: 'עדכונים למדיניות',
    updatesText: 'אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים משמעותיים יובאו לידיעתכם.',
    contactTitle: 'יצירת קשר',
    contactText: 'אם יש לכם שאלות לגבי מדיניות פרטיות זו, אנא צרו איתנו קשר.',
    acceptBtn: 'אני מסכים למדיניות הפרטיות',
    declineBtn: 'אני לא מסכים',
    noteLabel: 'הערה:',
    noteText: 'על מנת להשתמש באתר, עליכם להסכים למדיניות הפרטיות שלנו.',
  },
  en: {
    modalTitle: 'Privacy Policy',
    heading: 'Privacy Policy',
    intro: 'Welcome to our website. We are committed to protecting your privacy and safeguarding your personal information.',
    collectTitle: 'Information Collection',
    collectIntro: 'We may collect the following information only with your explicit consent:',
    collectItems: ['Full name', 'Email address', 'Phone number'],
    useTitle: 'Use of Information',
    useIntro: 'The information we collect will be used for the following purposes:',
    useItems: [
      'Contacting customers',
      'Sending updates about services',
      'Improving our services',
      'Troubleshooting and technical support',
    ],
    securityTitle: 'Security',
    securityText:
      'We employ advanced security measures to protect your personal information from unauthorized access, misuse, or disclosure.',
    sharingTitle: 'Information Sharing',
    sharingText:
      'We will not share your personal information with third parties without your explicit consent, unless required by law.',
    rightsTitle: 'Your Rights',
    rightsIntro: 'You have the right to:',
    rightsItems: [
      'Access your personal information',
      'Correct inaccurate information',
      'Delete your information',
      'Object to the processing of your information',
    ],
    updatesTitle: 'Policy Updates',
    updatesText: 'We may update this policy from time to time. Significant changes will be brought to your attention.',
    contactTitle: 'Contact Us',
    contactText: 'If you have any questions about this privacy policy, please contact us.',
    acceptBtn: 'I agree to the privacy policy',
    declineBtn: 'I do not agree',
    noteLabel: 'Note:',
    noteText: 'In order to use the site, you must agree to our privacy policy.',
  },
};

const PrivacyPolicy = ({ isOpen, onAccept, onDecline }) => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const { lang } = useLang();
  const t = STR[lang];

  useEffect(() => {
    // Check if user has already accepted privacy policy
    const accepted = localStorage.getItem('privacyPolicyAccepted');
    if (accepted === 'true') {
      setHasAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setHasAccepted(true);
    onAccept();
  };

  const handleDecline = () => {
    onDecline();
  };

  return (
    <Modal isOpen={isOpen && !hasAccepted} onClose={handleDecline} title={t.modalTitle}>
      <div className="privacy-policy-content">
        <div className="privacy-policy-text">
          <h3>{t.heading}</h3>

          <p>{t.intro}</p>

          <h4>{t.collectTitle}</h4>
          <p>{t.collectIntro}</p>
          <ul>
            {t.collectItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h4>{t.useTitle}</h4>
          <p>{t.useIntro}</p>
          <ul>
            {t.useItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h4>{t.securityTitle}</h4>
          <p>{t.securityText}</p>

          <h4>{t.sharingTitle}</h4>
          <p>{t.sharingText}</p>

          <h4>{t.rightsTitle}</h4>
          <p>{t.rightsIntro}</p>
          <ul>
            {t.rightsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h4>{t.updatesTitle}</h4>
          <p>{t.updatesText}</p>

          <h4>{t.contactTitle}</h4>
          <p>{t.contactText}</p>
        </div>

        <div className="privacy-policy-actions">
          <button
            className="privacy-accept-btn"
            onClick={handleAccept}
          >
            {t.acceptBtn}
          </button>
          <button
            className="privacy-decline-btn"
            onClick={handleDecline}
          >
            {t.declineBtn}
          </button>
        </div>

        <div className="privacy-note">
          <p><strong>{t.noteLabel}</strong> {t.noteText}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PrivacyPolicy;
