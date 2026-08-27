import { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './thank-you-lead.css';

const CHECKLIST_ITEMS = [
  { num: '01', text: 'גישה ופרטי כניסה' },
  { num: '02', text: 'הגדרות אבטחה פעילות' },
  { num: '03', text: 'יציבות ועבר החשבון' },
  { num: '04', text: 'חסימות ומגבלות פעילות' },
  { num: '05', text: 'בעלות על הנכסים הדיגיטליים' },
];

export default function ThankYouLead() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      window.fbq('track', 'Lead');
    }
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

      {/* NEXT STEP — the checklist tells you what to check, the course tells you what to do */}
      <section className="tyl-next" aria-labelledby="tylNextHead">
        <div className="tyl-container">
          <div className="tyl-next-card">
            <span className="tyl-next-eyebrow">השלב הבא</span>
            <h2 className="tyl-next-title" id="tylNextHead">
              הצ׳קליסט אומר לך מה לבדוק.<br />
              הקורס אומר לך מה לעשות עם התשובות.
            </h2>
            <p className="tyl-next-text">
              קורס BMS הוא ההמשך הישיר: איך בונים תשתית פרסום שלא נשברת, איך מנהלים
              הרשאות בלי להיות תלויה בלקוח, ומה עושים ברגע שמשהו כן משתבש.
            </p>
            <a
              href="/VSL-BMS"
              className="tyl-next-btn"
              onClick={() => {
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('trackCustom', 'UpsellClick', { source: 'thank-you-lead' });
                }
              }}
            >
              לצפייה בהדרכה החינמית ← ₪197
            </a>
            <p className="tyl-next-note">
              יש שאלה לפני?{' '}
              <a
                href="https://wa.me/972509823235"
                target="_blank"
                rel="noopener noreferrer"
              >
                שלחי לי הודעה בוואטסאפ
              </a>
            </p>
          </div>
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
