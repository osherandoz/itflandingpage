import React from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import { Eyebrow, ArrowIcon } from './ui';
import Icon from './Icon';
import './Services.css';

// Bento grid: one main cell (WhatsApp) and three smaller ones. The first cell
// leads because WhatsApp blocks are the most urgent case.
const CELLS = [
  {
    id: 'wa',
    icon: 'whatsapp',
    kicker: 'וואטסאפ',
    title: 'חסימות וואטסאפ',
    text: 'המספר נחסם, ואי אפשר לעבוד עם לקוחות. מזהים את סוג החסימה ומטפלים בה.',
    items: [
      { t: 'חסימה זמנית', d: '"המספר שלך חסום זמנית", הטיפול בערעור וחזרה לפעילות' },
      { t: 'חסימה קבועה', d: '"המספר שלך חסום", ערעור מול הצוות הרלוונטי של מטא' },
      { t: 'חטיפת חשבון (2FA)', d: 'מישהו הפעיל אימות דו-שלבי על המספר שלך, עוצרים את החטיפה ומחזירים שליטה' },
    ],
    message: 'היי אושר, יש לי תקלה בחשבון וואטסאפ. אשמח לבדיקת היתכנות מהירה.',
    guide: '/שחזור-חשבון-וואטסאפ',
  },
  {
    id: 'ig',
    icon: 'instagram',
    kicker: 'אינסטגרם',
    title: 'פריצות אינסטגרם',
    text: 'החשבון נפרץ, הסיסמה והמייל הוחלפו או שהחשבון הושבת. מחזירים גישה מלאה.',
    message: 'היי אושר, יש לי תקלה בחשבון אינסטגרם. אשמח לבדיקת היתכנות מהירה.',
    guide: '/חשבון-אינסטגרם-נפרץ',
  },
  {
    id: 'bm',
    icon: 'shield',
    kicker: 'Business Manager · מודעות',
    title: 'השבתת Business Manager וחשבונות מודעות',
    text: 'הקמפיינים נעצרו, אמצעי התשלום נדחה או שהגישה לנכסים העסקיים אבדה.',
    message: 'היי אושר, יש לי תקלה ב-Business Manager או בחשבון המודעות. אשמח לבדיקת היתכנות מהירה.',
    guide: '/שחזור-מנהל-מודעות',
  },
  {
    id: 'all',
    icon: 'clock',
    kicker: 'פייסבוק ופלטפורמות נוספות',
    title: 'אבחון חירום תוך שעה',
    text: 'לא ברור איפה הבעיה, או שמדובר בפלטפורמה אחרת? שולחים את המקרה ומקבלים תשובה ראשונה תוך שעה.',
    message: 'היי אושר, יש לי תקלה בחשבון. אשמח לבדיקת היתכנות מהירה.',
    guide: '/שחזור-חשבון-פייסבוק',
  },
];

const trackClick = (title) => {
  trackWhatsAppClick('services-bento');
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', { event_category: 'Service', event_label: title, value: 1 });
  }
};

const Services = () => (
  <div className="svc section">
    <div className="container">
      <header className="sec-head m-reveal">
        <Eyebrow num="01">שירותים</Eyebrow>
        <h2 className="h1">
          <span className="lt">מה נתקע?</span> מזהים, מטפלים, מחזירים
        </h2>
        <p className="lead">
          טיפול שורש מול צוותי <bdi dir="ltr">Trust &amp; Safety</bdi> של מטא, ללא צורך בסיסמאות או חשיפת מידע אישי.
        </p>
      </header>

      <div className="bento m-stagger">
        {CELLS.map((cell) => (
          <article key={cell.id} className={`bento__cell bento__cell--${cell.id}`}>
            <header className="bento__head">
              <span className="bento__icon"><Icon name={cell.icon} /></span>
              <span className="bento__kicker">{cell.kicker}</span>
            </header>
            <h3 className="bento__title">{cell.title}</h3>
            <p className="bento__text">{cell.text}</p>

            {cell.items && (
              <ul className="bento__items">
                {cell.items.map((it) => (
                  <li key={it.t}>
                    <b>{it.t}</b>
                    <span>{it.d}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="bento__actions">
              <a
                href={getWhatsAppUrl(cell.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="bento__cta"
                onClick={() => trackClick(cell.title)}
              >
                <span>בדיקה מהירה בוואטסאפ</span>
                <ArrowIcon />
              </a>
              <Link to={cell.guide} className="link small">פרטים נוספים</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default Services;
