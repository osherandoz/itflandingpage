import { ArrowIcon } from '../components/ui';
import Icon from '../components/Icon';
import './thank-you-purchase.css';

// What happens now, in the order it happens.
const STEPS = [
  'ברגע שחשבונית ירוקה מאשרת את התשלום, פרטי הגישה לקורס נשלחים למייל (בדרך כלל תוך 5 דקות).',
  'לא קיבלתם תוך 15 דקות? בדקו בתיקיית הספאם, ואם עדיין אין, כתבו לי.',
];

// No Purchase pixel/GA event here on purpose: this page can be opened directly,
// so a browser visit proves nothing. The verified purchase event is sent
// server-side from api/webhook-payment.js after the provider confirmed payment.
export default function ThankYouPurchase() {
  return (
    <div className="typ bg-grid" dir="rtl">
      <header className="typ__top">
        <div className="container">
          <a className="typ__logo" href="/" aria-label="IsraelTechForce">
            <img src="/images/brand/logo-white-320.webp" alt="" width="320" height="236" />
          </a>
        </div>
      </header>

      <main id="main" className="typ__main">
        <div className="container typ__grid">
          <section className="typ__hero">
            <p className="typ__badge">
              <span className="typ__badge-icon" aria-hidden="true"><Icon name="check" /></span>
              <span>התשלום בטיפול</span>
            </p>

            <h1 className="typ__title display">
              <span className="lt">תודה!</span>{' '}
              <span className="typ__title-line"><span className="mk">כל הכבוד</span> שהחלטת</span>{' '}
              <span className="typ__title-line">לעשות סדר</span>
            </h1>
          </section>

          {/* The rail fills as it scrolls into view */}
          <section className="typ__now">
            <ol className="typ__steps" data-scrub="1 0.9">
              <li className="typ__rail" aria-hidden="true"><span /></li>
              {STEPS.map((text, i) => (
                <li className="typ__step" key={text}>
                  <span className="typ__node num" aria-hidden="true">0{i + 1}</span>
                  <p className="typ__step-text">{text}</p>
                </li>
              ))}
            </ol>

            <p className="typ__note small">
              יש שאלה? שלחו הודעה ישירות דרך אינסטגרם או למייל{' '}
              <a className="link" href="mailto:osher@israeltechforce.com"><bdi>osher@israeltechforce.com</bdi></a>
            </p>
          </section>

          <div className="typ__actions">
            <a href="/VSL-BMS" className="btn btn--ink">
              <span>לעמוד הקורס</span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <a
              href="https://www.instagram.com/osher_revach_1/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost typ__insta"
              aria-label="עקבו אחריי באינסטגרם"
            >
              <span className="typ__insta-label">
                <Icon name="instagram" />
                בינתיים, עקבו אחריי באינסטגרם לתכנים נוספים
              </span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
