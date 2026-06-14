import { useEffect, useRef } from 'react';
import './thank-you-lead.css';

const CHECKLIST_ITEMS = [
  { num: '01', text: 'גישה ופרטי כניסה' },
  { num: '02', text: 'הגדרות אבטחה פעילות' },
  { num: '03', text: 'יציבות ועבר החשבון' },
  { num: '04', text: 'חסימות ומגבלות פעילות' },
  { num: '05', text: 'בעלות על הנכסים הדיגיטליים' },
];

function trackFb(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params);
}
function trackGa(event, params) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params);
}

export default function ThankYouLead() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackFb('CompleteRegistration', { content_name: 'bms-sm-checklist' });
    trackGa('form_submit_lead', { page: 'bms-sm' });
  }, []);

  return (
    <main className="tyl" dir="rtl">

      {/* CONFIRMATION BAR */}
      <div className="tyl-confirm">
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
        <span>הצ׳קליסט בדרך אלייך. בדקי גם את תיקיית הספאם.</span>
      </div>

      {/* HERO */}
      <section className="tyl-hero">
        <div className="tyl-container">
          <h1 className="tyl-h1">
            קיבלת את הצ׳קליסט.<br />
            עכשיו תדעי מה לחפש.
          </h1>
          <p className="tyl-sub">
            "צ׳קליסט סינון לקוחות 2026" כולל חמש שאלות שאת שואלת לפני כל לקוח חדש.
            לא מסכימים בלי תשובות.
          </p>
        </div>
      </section>

      {/* CHECKLIST CONTENTS */}
      <section className="tyl-list-section">
        <div className="tyl-container">
          <h2 className="tyl-section-title">מה בפנים</h2>
          <ol className="tyl-list" aria-label="שאלות הצ׳קליסט">
            {CHECKLIST_ITEMS.map((item) => (
              <li key={item.num} className="tyl-item">
                <span className="tyl-num" aria-hidden="true">{item.num}</span>
                <span className="tyl-item-text">{item.text}</span>
              </li>
            ))}
          </ol>
          <p className="tyl-list-note">חמש דקות מול הלקוח. חוסכת לעצמך שבועות של בעיות.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tyl-footer">
        <span>© {new Date().getFullYear()} Israel Tech Force · אושר רווח</span>
        <a href="/bms-sm">חזרה לדף הצ׳קליסט</a>
      </footer>

    </main>
  );
}
