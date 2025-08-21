import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './PrivacyPolicy.css';

const PrivacyPolicy = ({ isOpen, onAccept, onDecline }) => {
  const [hasAccepted, setHasAccepted] = useState(false);

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
    <Modal isOpen={isOpen && !hasAccepted} onClose={handleDecline} title="מדיניות פרטיות">
      <div className="privacy-policy-content">
        <div className="privacy-policy-text">
          <h3>מדיניות פרטיות</h3>
          
          <p>ברוכים הבאים לאתר שלנו. אנו מחויבים להגן על פרטיותכם ולשמור על המידע האישי שלכם.</p>
          
          <h4>איסוף מידע</h4>
          <p>אנו עשויים לאסוף את המידע הבא רק באישור מפורש שלכם:</p>
          <ul>
            <li>שם מלא</li>
            <li>כתובת דוא"ל</li>
            <li>מספר טלפון</li>
          </ul>
          
          <h4>שימוש במידע</h4>
          <p>המידע שנאסוף ישמש למטרות הבאות:</p>
          <ul>
            <li>יצירת קשר עם לקוחות</li>
            <li>שליחת עדכונים על שירותים</li>
            <li>שיפור השירותים שלנו</li>
            <li>פתרון בעיות ותמיכה טכנית</li>
          </ul>
          
          <h4>אבטחה</h4>
          <p>אנו נוקטים באמצעי אבטחה מתקדמים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית, שימוש לרעה או חשיפה.</p>
          
          <h4>שיתוף מידע</h4>
          <p>אנו לא נשתף את המידע האישי שלכם עם צדדים שלישיים ללא הסכמתכם המפורשת, אלא אם כן נדרש על פי חוק.</p>
          
          <h4>זכויותיכם</h4>
          <p>יש לכם הזכות:</p>
          <ul>
            <li>לגשת למידע האישי שלכם</li>
            <li>לתקן מידע שגוי</li>
            <li>למחוק את המידע שלכם</li>
            <li>להתנגד לעיבוד המידע שלכם</li>
          </ul>
          
          <h4>עדכונים למדיניות</h4>
          <p>אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים משמעותיים יובאו לידיעתכם.</p>
          
          <h4>יצירת קשר</h4>
          <p>אם יש לכם שאלות לגבי מדיניות פרטיות זו, אנא צרו איתנו קשר.</p>
        </div>
        
        <div className="privacy-policy-actions">
          <button 
            className="privacy-accept-btn" 
            onClick={handleAccept}
          >
            אני מסכים למדיניות הפרטיות
          </button>
          <button 
            className="privacy-decline-btn" 
            onClick={handleDecline}
          >
            אני לא מסכים
          </button>
        </div>
        
        <div className="privacy-note">
          <p><strong>הערה:</strong> על מנת להשתמש באתר, עליכם להסכים למדיניות הפרטיות שלנו.</p>
        </div>
      </div>
    </Modal>
  );
};

export default PrivacyPolicy;
