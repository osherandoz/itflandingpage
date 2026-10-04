import React from 'react';
import { Link } from 'react-router';
import { Eyebrow, WaBtn, ArrowIcon } from './ui';
import './FAQ.css';

const FAQS = [
  {
    question: 'איך מתחילים תהליך שחזור חשבון?',
    answer: 'התהליך פשוט ומהיר! שולחים הודעה בוואטסאפ או במייל, אני עוזר לך לאבחן את הבעיה בצורה מדויקת ולמצוא את הפתרון הטוב ביותר. ברגע שתאשר/י את התחלת הטיפול - אני רץ על זה בצורה המקצועית והמהירה ביותר. התהליך כולל אבחון מקצועי, הצעת מחיר מדויקת, וטיפול מיידי.',
  },
  {
    question: 'החשבון נחסם כבר הרבה זמן, יש בכלל סיכוי?',
    answer: 'ברוב המקרים - כן. גם חשבונות שנחסמו לפני שבועות או חודשים, וגם מקרים שמטא כבר סימנה כ"סופיים", הצלחתי לשחזר. ככל שפונים מוקדם יותר קל יותר, אבל זמן שעבר לא פוסל אותך. באבחון החינמי אגיד לך בכנות מה הסיכוי הריאלי במקרה הספציפי שלך - כולל אם התשובה היא שקשה.',
  },
  {
    question: 'האם השירות דיסקרטי ומאובטח?',
    answer: 'בהחלט! כל הפרטים שאקבל ממך ישארו חסויים ומאובטחים. הם נשמרים רק במערכות שמשמשות אותי לטיפול בפנייה (טופס לידים, דיוור וניתוח האתר) ולא נמכרים ולא מועברים לאף גורם אחר. כל המידע נועד לטיפול בבעיה בלבד וימחק לאחר סיום הטיפול בהתאם לרצונך. לא יעלה שום תיעוד הצלחה לרשת ללא הסכמתך המפורשת כלקוח.',
  },
  {
    question: 'כמה זמן לוקח תהליך שחזור החשבון?',
    answer: 'זה תלוי בסוג הבעיה ומורכבותה. בעיות פשוטות כמו שחזור סיסמה או הסרת חסימה זמנית נפתרות מהר. בעיות מורכבות יותר כמו חשבונות שנפרצו או נחסמו לצמיתות לוקחות יותר זמן. אני תמיד מעדכן אותך על התקדמות התהליך.',
  },
  {
    question: 'מה המחירים לשירותי שחזור חשבונות?',
    answer: 'המחירים שלי הוגנים ותחרותיים. מתחילים מ-500 ש"ח (לא כולל מע"מ) לבעיות פשוטות ועד 2,500-3,000 ש"ח לבעיות מורכבות שמצריכות כלים מיוחדים או התערבות מתקדמת. המחיר נקבע בהתאם לסוג הבעיה ומורכבותה. חשוב לציין - תשלום רק אחרי הצלחה מוכחת!',
  },
  {
    question: 'למה אתה לוקח כסף רק אחרי הצלחה?',
    answer: 'זו הפילוסופיה שלי! אני כל כך בטוח ביכולות שלי ובניסיון שצברתי, שאני מוכן לקחת את הסיכון. אם לא הצלחתי לשחזר את החשבון - לא תשלם כלום. זה נותן לך ביטחון מלא ומראה על המקצועיות והאמינות שלי בתחום.',
  },
  {
    question: 'האם יש אחריות על השירות?',
    answer: 'כן! אני נותן אחריות של 24 שעות מרגע שחרור החשבון. זה הזמן הקריטי שבו בדרך כלל יכולות לקרות בעיות מצד מטא (Meta). לאחר 24 שעות, אין לי שליטה על התכנים והפעילות של המשתמש, ולכן לא אוכל לתת אחריות נוספת.',
  },
  {
    question: 'האם אתה מטפל בכל סוגי הבעיות?',
    answer: 'כן! אני מטפל בכל סוגי הבעיות הקשורות לחשבונות רשתות חברתיות: חשבונות חסומים, פרוצים, בעיות התחברות, בעיות פרסום, Business Manager, ועוד. יש לי ניסיון של שנים וכלים מתקדמים לפתרון בעיות מורכבות.',
  },
  {
    question: 'באילו שעות אתה זמין?',
    answer: 'אני זמין ראשון עד שישי, 09:00–16:00. בשבת אני זמין למקרים דחופים בלבד. התמיכה שלי כוללת מענה מהיר, אבחון מקצועי, וטיפול מיידי בבעיות דחופות.',
  },
];

// Native <details>: keyboard and screen-reader behaviour for free, answers
// stay in the HTML for search engines, no state to hydrate.
const onToggle = (e, question) => {
  if (e.currentTarget.open && typeof gtag !== 'undefined') {
    gtag('event', 'click', { event_category: 'FAQ', event_label: question, value: 1 });
  }
};

const FAQ = () => (
  <div className="faq section">
    <div className="container faq__grid">
      <header className="faq__head">
        <div className="faq__head-inner m-reveal">
          <Eyebrow num="06">שאלות נפוצות</Eyebrow>
          <h2 className="h1">
            <span className="lt">שאלות נפוצות על</span> שחזור חשבונות
          </h2>
          <p className="lead">אם הספקת לשאול את עצמך, כנראה שיש כאן תשובה.</p>
          <div className="faq__cta">
            <p className="faq__cta-title">לא מצאת תשובה?</p>
            <WaBtn message="היי, יש לי שאלה לגבי שחזור חשבון" location="faq">שאלו אותי בוואטסאפ</WaBtn>
            <Link to="/faq" className="link link--arrow small">
              לכל השאלות והתשובות
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </header>

      <div className="faq__list">
        {FAQS.map((faq, i) => (
          <details key={faq.question} className="faq-item" name="home-faq" onToggle={(e) => onToggle(e, faq.question)}>
            <summary>
              <span className="faq-item__num num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="faq-item__q">{faq.question}</span>
              <span className="faq-item__icon" aria-hidden="true" />
            </summary>
            <p className="faq-item__a">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </div>
);

export default FAQ;
