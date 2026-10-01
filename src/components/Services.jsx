import React from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import { Eyebrow, ArrowIcon } from './ui';
import Icon from './Icon';
import './Services.css';

const CARDS = [
  {
    type: 'fb',
    tag: 'Facebook',
    title: 'שחזור חשבון פייסבוק שנחסם או נפרץ',
    problem: <>התחברת והחשבון נעלם? קיבלת התראה על <b>פעילות חשודה</b>, מישהו שינה את הסיסמה, או העלית תוכן שסומן בטעות? אני מחזיר גישה מלאה - גם כשהתמיכה של פייסבוק עונה באוטומט.</>,
    bullets: ['שחזור גישה ללא סיסמה / אימייל', 'הסרת חסימות לאחר דיווח שווא', 'אבטחה מחדש מפני פריצה חוזרת', 'ניטור אפשרי של נקודות תורפה נוספות'],
    message: 'היי, החשבון פייסבוק שלי נחסם או נפרץ, אשמח לעזרה',
    guide: '/שחזור-חשבון-פייסבוק',
  },
  {
    type: 'ig',
    tag: 'Instagram',
    title: 'שחזור חשבון אינסטגרם שהושבת',
    problem: <>איבדת גישה בגלל <b>דיווחי הטרדה שקריים</b>, זיהוי פנים שכשל, או חשבון שנעלם אחרי התחזות? אני מטפל בזה מול מטא ומשחזר את החשבון.</>,
    bullets: ['שחזור מלא עם כל הפוסטים והעוקבים', 'ערעור דיווחי הטרדה וזכויות יוצרים', 'טיפול בחשבונות שהתחזו אליך', 'ליווי צמוד עד לסגירת הטיפול'],
    message: 'היי, החשבון אינסטגרם שלי הושבת, אשמח לעזרה',
    guide: '/שחזור-חשבון-אינסטגרם',
  },
  {
    type: 'wa',
    tag: 'WhatsApp',
    title: 'שחזור מספר וואטסאפ שנחטף',
    problem: <>קיבלת הודעה <b>"הוסף את קוד ה-SMS"</b> והחשבון נעלם? זרים שולחים הודעות מהמספר שלך? אני עוצר את החטיפה ומחזיר לך שליטה תוך שעות.</>,
    bullets: ['שחזור חשבון וואטסאפ שנחטף', 'ניטרול אימות דו-שלבי שנגנב', 'אבטחה מחדש ומניעת גישה לגורם זר', 'ליווי אישי עד לסגירה מלאה'],
    message: 'היי, מספר הוואטסאפ שלי נחטף, אשמח לעזרה',
    guide: '/שחזור-חשבון-וואטסאפ',
  },
  {
    type: 'ad',
    tag: 'Ads Manager',
    title: 'חשבון מודעות שהושעה או נחסם',
    problem: <>הקמפיין החם שלך קרס כי <b>מטא החליטה?</b> אמצעי תשלום נדחה או החשבון דווח? אני יודע איך לערער, להחזיר הרצה, ולמנוע חסימה חוזרת.</>,
    bullets: ['איפוס מודעות ופיקסלים', 'ערעור מקצועי על חסימה', 'החזרת היסטוריית קמפיינים', 'מניעת חסימה חוזרת'],
    message: 'היי, חשבון המודעות שלי הושעה או נחסם, אשמח לעזרה',
    guide: '/שחזור-מנהל-מודעות',
  },
  {
    type: 'bm',
    tag: 'Business Manager',
    title: 'תקיעה ב-Business Manager',
    problem: <>איבדת גישה למרכז העסקים, משתמש-על נעלם או הדומיין שלך הועבר? אני <b>מחזיר בעלות</b> על הנכסים ומחבר מחדש דפים, פיקסלים וקטלוגים.</>,
    bullets: ['החזרת בעלות על Business Manager', 'טיפול בהשתלטות שותף-לשעבר', 'חיבור דפים ונכסים בחזרה', 'הגדרת הרשאות חסינה מפני פריצה'],
    message: 'היי, אני תקוע/ה ב-Business Manager, אשמח לעזרה',
  },
  {
    type: 'all',
    tag: 'כל הפלטפורמות',
    title: 'לא יודע איפה הבעיה? אני מאתר',
    problem: <>גישה שנעלמה ולא ברור היכן? טוויטר, טיקטוק, לינקדאין, גוגל ביזנס? <b>אבחון חינם</b> בתוך שעה. אם יש פתרון, אציע אותו עוד באותה שיחה.</>,
    bullets: ['אבחון חינם לכל הפלטפורמות', 'הערכת סיכוי הצלחה לפני תשלום', 'ליווי צמוד של מנהל תיק', 'תגובה ראשונה תוך שעה'],
    message: 'היי, איבדתי גישה לחשבון ולא בטוח/ה איפה הבעיה, אשמח לאבחון',
  },
];

const GUIDES = [
  { to: '/שחזור-חשבון-פייסבוק', label: 'שחזור חשבון פייסבוק' },
  { to: '/שחזור-חשבון-אינסטגרם', label: 'שחזור חשבון אינסטגרם' },
  { to: '/שחזור-חשבון-וואטסאפ', label: 'שחזור חשבון וואטסאפ' },
  { to: '/חשבון-פייסבוק-מושבת', label: 'חשבון פייסבוק מושבת' },
  { to: '/חשבון-אינסטגרם-נפרץ', label: 'חשבון אינסטגרם נפרץ' },
  { to: '/שחזור-מנהל-מודעות', label: 'שחזור מנהל מודעות' },
];

const trackClick = (title) => {
  trackWhatsAppClick('services-card');
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', { event_category: 'Service', event_label: title, value: 1 });
  }
};

const Services = () => (
  <div className="svc section">
    <div className="container">
      <header className="sec-head sec-head--split m-reveal">
        <div>
          <Eyebrow num="01">שירותי שחזור · א׳–ו׳ 09:00–16:00</Eyebrow>
          <h2 className="h1">
            <span className="lt">מחזיר לך את</span> <span className="mk m-in">הדיגיטל</span>{' '}
            <span className="lt">כשהכל קרס</span>
          </h2>
        </div>
        <p className="lead">
          חשבון נפרץ, נחסם או נעלם? אני מתמחה בשחזור מהיר ושקט, עד שהחשבון חזר לידיים שלך.
        </p>
      </header>

      {/* One card per situation. On wide screens they pin and stack, each
          leaving its header visible, so the list stays scannable. */}
      <div className="svc__stack" id="svc-grid">
        {CARDS.map((card, i) => (
          <article key={card.type} className={`svc-card svc-card--${card.type}`} style={{ '--n': i }}>
            <header className="svc-card__head">
              <span className="svc-card__num num">0{i + 1}</span>
              <h3 className="svc-card__title">{card.title}</h3>
              <span className="tag svc-card__tag">{card.tag}</span>
            </header>

            <div className="svc-card__body">
              <p className="svc-card__problem">{card.problem}</p>

              <ul className="svc-card__bullets">
                {card.bullets.map((b) => (
                  <li key={b}>
                    <Icon name="check" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="svc-card__actions">
                <a
                  href={getWhatsAppUrl(card.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--go"
                  onClick={() => trackClick(card.title)}
                >
                  <span>קבל עזרה עכשיו</span>
                  <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
                </a>
                {card.guide && (
                  <Link to={card.guide} className="link small">למדריך המלא</Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Deep-dive service pages */}
      <nav className="svc__guides" aria-label="מדריכי שחזור מפורטים">
        <h3 className="svc__guides-title">( מדריכים מפורטים לפי מצב )</h3>
        <div className="svc__guides-links">
          {GUIDES.map((page) => (
            <Link key={page.to} to={page.to} className="tag">{page.label}</Link>
          ))}
        </div>
      </nav>
    </div>
  </div>
);

export default Services;
