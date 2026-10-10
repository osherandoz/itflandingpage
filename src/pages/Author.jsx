import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { pressItems } from '../data/press';
import { FACTS } from '../data/businessFacts';
import { ArrowIcon, Eyebrow, SlotNumber, WaBtn } from '../components/ui';
import './Author.css';

// Real facts only: no invented history. The founding story and process steps
// mirror what's already published on /VSL-BMS and in HowItWorks.jsx; this page
// exists to give Osher a real, substantive, indexable @id destination (audit E3).
// Page title and description live in app/routes/osher-revach.jsx.
const t = {
  eyebrow: 'מי אני',
  role: 'מומחה שחזור חשבונות רשתות חברתיות · מייסד IsraelTechForce',
  // Every number comes from the evidence register (businessFacts.js)
  stats: [
    { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו' },
    { value: `${FACTS.rating.display}/5`, label: 'דירוג' },
    { value: FACTS.successRate.display, label: 'הצלחה בשחזור' },
  ],
  since: 'פעיל מאז 2020',
  ctaHero: 'שלחו לי את המקרה בוואטסאפ',
  storyTitle: 'איך זה התחיל',
  // The first paragraph ends on the sentence that carries the page; it is set
  // apart as the pull quote, in its original place in the text.
  storyLead:
    'אני אושר רווח, בן 31 מנתניה. חמש שנים אני עוסק בהצלת עסקים דיגיטליים. לפני זה הייתי מתכנת בהייטק, ולא התחלתי מתוך תשוקה לטכנולוגיה.',
  storyPull: 'התחלתי מתוך מצוקה.',
  storyP: [
    'שנת 2020. אשתי בר, שהייתה בשיא שלה כיוצרת תוכן, נחסמה. הגישה לחשבון פשוט נסגרה, ברגע אחד, בלי שהיא עשתה משהו לא בסדר. ניסיתי, חקרתי, ולא הפסקתי עד שהחשבון חזר.',
    `מאז אני עושה את זה לאחרים. ${FACTS.accountsRecovered.display} חשבונות שחזרו לפעול בדיגיטל. עם הזמן הבנתי שרוב הבעיות חוזרות על עצמן: הרשאה שנשארה פתוחה, אימות דו-שלבי שלא הופעל, מנהל שכבר לא בתמונה ועדיין רשום בנכס. את הדפוסים האלה אני מלמד היום בקורס BMS.`,
  ],
  processTitle: 'איך עובד האבחון',
  steps: [
    { title: 'שולחים הודעה', text: 'הודעה בוואטסאפ, אני עונה תוך דקות ומתחיל לבדוק את המקרה.' },
    { title: 'אבחון מהיר', text: 'כמה שאלות ובדיקה מקצועית של הבעיה, בלי בזבוז זמן. אני יודע בדיוק מה לחפש.' },
    { title: 'הצעה ושקיפות מלאה', text: 'הצעת מחיר ברורה, בלי הפתעות. תשלום רק אחרי הצלחה.' },
    { title: 'יוצאים לדרך', text: `סוגרים ויוצאים לדרך. משך הטיפול ${FACTS.typicalTurnaround.he}: פשוט לרוב מהיר, מורכב לוקח יותר.` },
  ],
  pressTitle: 'סיקור בתקשורת',
  pressMore: 'כל הכתבות',
  finalTitle: 'החשבון שלך חסום עכשיו?',
  finalText: 'אבחון ראשוני חינם, ותשלום רק אחרי שהחשבון חוזר אליך.',
  whatsappMessage: 'היי, מצאתי אותך דרך עמוד עליי באתר, אשמח לעזרה',
};

const pad = (n) => String(n).padStart(2, '0');

// Numbers that carry a sign ("2,500+") are isolated so RTL does not move the
// sign to the other side. The copy itself is untouched.
const SIGNED_NUMBER = /(\d[\d,.]*[%+]+)/;
const withBdi = (text) =>
  text.split(SIGNED_NUMBER).map((part, i) => (i % 2 ? <bdi key={i} dir="ltr">{part}</bdi> : part));

export default function Author() {
  const press = pressItems.slice(0, 3);

  return (
    <div dir="rtl" className="authp">
      <Navbar />
      <main id="main">
        <section className="authp__hero theme-ink bg-grid">
          <div className="container authp__hero-grid">
            <div className="authp__hero-copy">
              <Eyebrow className="authp__eyebrow">{t.eyebrow}</Eyebrow>
              <h1 className="authp__name">
                <span className="lt">אושר</span> רווח
              </h1>
              <p className="lead authp__role">{t.role}</p>
              <div className="authp__hero-actions">
                <WaBtn message={t.whatsappMessage} location="author-hero">{t.ctaHero}</WaBtn>
              </div>
            </div>

            <div className="authp__visual">
              <div className="authp__photo">
                <img
                  src="/images/brand/osher-stand-800.webp"
                  srcSet="/images/brand/osher-stand-480.webp 480w, /images/brand/osher-stand-800.webp 800w"
                  sizes="(min-width: 960px) 420px, 72vw"
                  alt="אושר רווח"
                  width="800"
                  height="1000"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <p className="sticker authp__since">{t.since}</p>
            </div>
          </div>
        </section>

        <div className="authp__numbers theme-signal">
          <div className="container">
            <dl className="authp__stats">
              {t.stats.map((s) => (
                <div className="authp__stat" key={s.label}>
                  <dd><SlotNumber value={s.value} /></dd>
                  <dt>{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <section className="authp__story section" aria-labelledby="authp-story-title">
          <div className="container authp__split">
            <header className="authp__split-head">
              <div className="authp__split-sticky m-reveal">
                <Eyebrow num="01">2020</Eyebrow>
                <h2 className="h1" id="authp-story-title">{t.storyTitle}</h2>
              </div>
            </header>
            <div className="authp__longread">
              <p className="authp__story-lead m-reveal">{t.storyLead}</p>
              <p className="authp__pull serif m-reveal">{t.storyPull}</p>
              {t.storyP.map((p, i) => (
                <p key={i} className="m-reveal">{withBdi(p)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="authp__process theme-mist section" aria-labelledby="authp-process-title">
          <div className="container authp__split">
            <header className="authp__split-head">
              <div className="authp__split-sticky m-reveal">
                <Eyebrow num="02">{t.steps.length} שלבים</Eyebrow>
                <h2 className="h1" id="authp-process-title">{t.processTitle}</h2>
              </div>
            </header>
            <ol className="authp__steps m-stagger">
              {t.steps.map((s, i) => (
                <li key={s.title} className="authp__step">
                  <span className="authp__step-n num" aria-hidden="true">{pad(i + 1)}</span>
                  <h3 className="authp__step-title">{s.title}</h3>
                  <p className="authp__step-text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="authp__press section" aria-labelledby="authp-press-title">
          <div className="container">
            <header className="authp__press-head m-reveal">
              <div>
                <Eyebrow num="03">{press.length} כתבות</Eyebrow>
                <h2 className="h1" id="authp-press-title">{t.pressTitle}</h2>
              </div>
              <Link to="/press" className="link link--arrow authp__press-more">
                {t.pressMore}
                <ArrowIcon />
              </Link>
            </header>
            <ol className="authp__press-list">
              {press.map((p) => (
                <li key={p.id}>
                  <a className="authp__press-row" href={p.url} target="_blank" rel="noopener noreferrer">
                    <time className="authp__press-date num" dateTime={p.dateISO}>{p.date}</time>
                    <strong className="authp__press-site">{p.siteName}</strong>
                    <span className="authp__press-headline">{p.headline}</span>
                    <span className="authp__press-go" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="authp__final" aria-labelledby="authp-final-title">
          <div className="container">
          <div className="authp__final-card theme-ink m-reveal">
            <h2 className="display" id="authp-final-title">{t.finalTitle}</h2>
            <div className="authp__final-side">
              <p className="lead">{t.finalText}</p>
              <WaBtn message={t.whatsappMessage} location="author-final">{t.ctaHero}</WaBtn>
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
