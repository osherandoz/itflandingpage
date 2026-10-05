import { Eyebrow, ArrowIcon } from '../components/ui';
import Icon from '../components/Icon';
import './thank-you-lead.css';

const CHECKLIST_ITEMS = [
  { num: '01', text: 'גישה ופרטי כניסה' },
  { num: '02', text: 'הגדרות אבטחה פעילות' },
  { num: '03', text: 'יציבות ועבר החשבון' },
  { num: '04', text: 'חסימות ומגבלות פעילות' },
  { num: '05', text: 'בעלות על הנכסים הדיגיטליים' },
];

export default function ThankYouLead() {
  // No Lead/PageView here: the Lead already fired on the signup form, and root
  // fires PageView on every route change. One completed signup = one conversion.
  return (
    <div className="tyl bg-grid" dir="rtl">
      <header className="tyl__top">
        <div className="container">
          <a className="tyl__logo" href="/" aria-label="IsraelTechForce">
            <img src="/images/brand/logo-white-320.webp" alt="" width="320" height="236" />
          </a>
        </div>
      </header>

      <main id="main" className="tyl__main">
        <div className="container tyl__grid">
          <div className="tyl__col">
            {/* CONFIRMATION */}
            <section className="tyl__hero">
              <p className="tyl__confirm">
                <span className="tyl__confirm-icon" aria-hidden="true"><Icon name="check" /></span>
                <span>הצ׳קליסט בדרך אליכם. בדקו גם את תיקיית הספאם.</span>
              </p>
              <h1 className="tyl__title h1">
                <span className="lt">קיבלתם את הצ׳קליסט.</span>{' '}
                <span className="tyl__title-line">עכשיו תדעו <span className="mk">מה לחפש.</span></span>
              </h1>
              <p className="tyl__sub lead">
                "צ׳קליסט סינון לקוחות 2026" כולל חמש שאלות ששואלים לפני כל לקוח חדש.
                לא מסכימים בלי תשובות.
              </p>
            </section>

            {/* CHECKLIST CONTENTS: a rail that fills as it scrolls into view */}
            <section className="tyl__inside">
              <h2 className="tyl__label">מה בפנים</h2>
              <ol className="tyl__steps" aria-label="שאלות הצ׳קליסט" data-scrub="1 0.9">
                <li className="tyl__rail" aria-hidden="true"><span /></li>
                {CHECKLIST_ITEMS.map((item) => (
                  <li key={item.num} className="tyl__step">
                    <span className="tyl__node num" aria-hidden="true">{item.num}</span>
                    <span className="tyl__step-text">{item.text}</span>
                  </li>
                ))}
              </ol>
              <p className="tyl__note">חמש דקות מול הלקוח. חוסכות לכם שבועות של בעיות.</p>
            </section>
          </div>

          {/* NEXT STEP — the checklist tells you what to check, the course tells you what to do */}
          <section className="tyl__next card card--ink theme-ink" aria-labelledby="tylNextHead">
            <Eyebrow>השלב הבא</Eyebrow>
            <h2 className="h2" id="tylNextHead">
              <span className="lt">הצ׳קליסט אומר לכם מה לבדוק.</span>{' '}
              <span className="tyl__title-line">הקורס אומר לכם מה לעשות עם התשובות.</span>
            </h2>
            <p className="tyl__next-text">
              קורס BMS הוא ההמשך הישיר: איך בונים תשתית פרסום שלא נשברת, איך מנהלים
              הרשאות בלי להיות תלויים בלקוח, ומה עושים ברגע שמשהו כן משתבש.
            </p>
            <a
              href="/VSL-BMS"
              className="btn btn--paper btn--block tyl__next-btn"
              onClick={() => {
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('trackCustom', 'UpsellClick', { source: 'thank-you-lead' });
                }
              }}
            >
              <span>לצפייה בהדרכה החינמית (ללא עלות)</span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <p className="tyl__next-note small">ההדרכה בווידאו חינמית. הקורס המלא עולה <bdi>₪297</bdi>, ואפשר להחליט אחרי הצפייה.</p>
            <p className="tyl__next-note small">
              יש שאלה לפני?{' '}
              <a
                className="link"
                href="https://wa.me/972509823235"
                target="_blank"
                rel="noopener noreferrer"
              >
                שלחו לי הודעה בוואטסאפ
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="tyl__footer">
        <div className="container tyl__footer-bar small">
          <span>© {new Date().getFullYear()} Israel Tech Force · אושר רווח</span>
          <a className="link" href="/bms-sm">חזרה לדף הצ׳קליסט</a>
        </div>
      </footer>
    </div>
  );
}
