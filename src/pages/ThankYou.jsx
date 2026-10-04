import { Eyebrow, WaBtn } from '../components/ui';
import Icon from '../components/Icon';
import { FACTS } from '../data/businessFacts';
import './thank-you-lead.css';

const NEXT_STEPS = [
  { num: '01', text: 'אני עובר על הפרטים ששלחת' },
  { num: '02', text: 'חוזר אליך בטלפון או בוואטסאפ, בדרך כלל תוך שעה בשעות הפעילות' },
  { num: '03', text: 'אבחון ראשוני חינם. תשלום רק אחרי שהחשבון חזר' },
];

// /תודה: where every lead form lands. Shares the .tyl layout with /תודה-קליסט.
export default function ThankYou() {
  // No Lead event here: it already fired in ContactForm once the server confirmed.
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
            <section className="tyl__hero">
              <p className="tyl__confirm">
                <span className="tyl__confirm-icon" aria-hidden="true"><Icon name="check" /></span>
                <span>הפרטים התקבלו.</span>
              </p>
              <h1 className="tyl__title h1">
                <span className="lt">קיבלתי את המקרה שלך.</span>{' '}
                <span className="tyl__title-line">מכאן <span className="mk">זה עליי.</span></span>
              </h1>
              <p className="tyl__sub lead">שעות הפעילות שלי: {FACTS.hours.he}.</p>
            </section>

            <section className="tyl__inside">
              <h2 className="tyl__label">מה קורה עכשיו</h2>
              <ol className="tyl__steps" data-scrub="1 0.9">
                <li className="tyl__rail" aria-hidden="true"><span /></li>
                {NEXT_STEPS.map((item) => (
                  <li key={item.num} className="tyl__step">
                    <span className="tyl__node num" aria-hidden="true">{item.num}</span>
                    <span className="tyl__step-text">{item.text}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section className="tyl__next card card--ink theme-ink" aria-labelledby="tyNextHead">
            <Eyebrow>רוצה לקצר את הדרך?</Eyebrow>
            <h2 className="h2" id="tyNextHead">
              <span className="lt">צילום מסך של ההודעה</span>{' '}
              <span className="tyl__title-line">חוסך לנו סבב שאלות.</span>
            </h2>
            <p className="tyl__next-text">
              שלחו לי בוואטסאפ צילום של ההודעה שמופיעה כשמנסים להיכנס לחשבון. ככה אני מגיע לשיחה כבר עם כיוון.
            </p>
            <WaBtn message="היי, השארתי פרטים באתר. מצרף צילום מסך של ההודעה" location="thank-you" className="btn--block tyl__next-btn">
              שליחת צילום מסך בוואטסאפ
            </WaBtn>
            <p className="tyl__next-note small">
              וואטסאפ חסום? אין צורך לעשות כלום, אני חוזר למספר שהשארת.
            </p>
          </section>
        </div>
      </main>

      <footer className="tyl__footer">
        <div className="container tyl__footer-bar small">
          <span>© {new Date().getFullYear()} Israel Tech Force · אושר רווח</span>
          <a className="link" href="/articles">בינתיים: מדריכים לשחזור חשבונות</a>
        </div>
      </footer>
    </div>
  );
}
