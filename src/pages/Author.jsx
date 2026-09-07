import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { pressItems, pressItemsEn } from '../data/press';
import { FACTS } from '../data/businessFacts';
import { useLang } from '../i18n';
import './Author.css';

// Real facts only — no invented history. The founding story and process steps
// mirror what's already published on /VSL-BMS and in HowItWorks.jsx; this page
// exists to give Osher a real, substantive, indexable @id destination (audit E3).
const STR = {
  he: {
    title: 'אושר רווח — מומחה שחזור חשבונות, IsraelTechForce | אושר רווח',
    metaDescription:
      'אושר רווח, מייסד IsraelTechForce. מאז 2020 שחזר מעל 2,500 חשבונות פייסבוק, אינסטגרם ווואטסאפ. איך זה התחיל, איך עובד האבחון, ואיפה סיקרו אותו.',
    role: 'מומחה שחזור חשבונות רשתות חברתיות · מייסד IsraelTechForce',
    stats: [`${FACTS.accountsRecovered.display} חשבונות שוחזרו`, `${FACTS.rating.display}/5 דירוג`, 'פעיל מאז 2020'],
    ctaHero: 'שלחו לי את המקרה בוואטסאפ',
    storyTitle: 'איך זה התחיל',
    storyP: [
      'אני אושר רווח, בן 31 מנתניה. חמש שנים אני עוסק בהצלת עסקים דיגיטליים. לפני זה הייתי מתכנת בהייטק, ולא התחלתי מתוך תשוקה לטכנולוגיה. התחלתי מתוך מצוקה.',
      'שנת 2020. אשתי בר, שהייתה בשיא שלה כיוצרת תוכן, נחסמה. הגישה לחשבון פשוט נסגרה, ברגע אחד, בלי שהיא עשתה משהו לא בסדר. ניסיתי, חקרתי, ולא הפסקתי עד שהחשבון חזר.',
      `מאז אני עושה את זה לאחרים. ${FACTS.accountsRecovered.display} חשבונות שחזרו לפעול בדיגיטל. עם הזמן הבנתי שרוב הבעיות חוזרות על עצמן: הרשאה שנשארה פתוחה, אימות דו-שלבי שלא הופעל, מנהל שכבר לא בתמונה ועדיין רשום בנכס. את הדפוסים האלה אני מלמד היום בקורס BMS.`,
    ],
    processTitle: 'איך עובד האבחון',
    steps: [
      { title: 'שולחים הודעה', text: 'הודעה בוואטסאפ, אני עונה תוך דקות ומתחיל לבדוק את המקרה.' },
      { title: 'אבחון מהיר', text: 'כמה שאלות ובדיקה מקצועית של הבעיה, בלי בזבוז זמן. אני יודע בדיוק מה לחפש.' },
      { title: 'הצעה ושקיפות מלאה', text: 'הצעת מחיר ברורה, בלי הפתעות. תשלום רק אחרי הצלחה.' },
      { title: 'יוצאים לדרך', text: `סוגרים ויוצאים לדרך. לרוב תוצאות תוך ${FACTS.typicalTurnaround.display} שעות.` },
    ],
    pressTitle: 'סיקור בתקשורת',
    pressMore: 'כל הכתבות ←',
    finalTitle: 'החשבון שלך חסום עכשיו?',
    finalText: 'אבחון ראשוני חינם, ותשלום רק אחרי שהחשבון חוזר אליך.',
    whatsappMessage: 'היי, מצאתי אותך דרך עמוד עליי באתר, אשמח לעזרה',
  },
  en: {
    title: 'Osher Revach — Account Recovery Expert, IsraelTechForce',
    metaDescription:
      "Osher Revach, founder of IsraelTechForce. Since 2020 he's recovered over 2,500 Facebook, Instagram and WhatsApp accounts. How it started, how the diagnosis works, and where he's been covered.",
    role: 'Social Media Account Recovery Expert · Founder, IsraelTechForce',
    stats: [`${FACTS.accountsRecovered.en}`, `${FACTS.rating.display}/5 rating`, 'Active since 2020'],
    ctaHero: 'Send me your case on WhatsApp',
    storyTitle: 'How it started',
    storyP: [
      "I'm Osher Revach, 31, from Netanya. I've spent five years rescuing digital businesses. Before that I was a software developer. I didn't start out of a passion for technology. I started out of distress.",
      "2020. My wife Bar, at the peak of her work as a content creator, got blocked. Access to the account simply closed, in one moment, without her doing anything wrong. I tried, I researched, and I didn't stop until the account came back.",
      "I've been doing this for others ever since. Over 2,500 accounts recovered. Over time I noticed most problems repeat: a permission left open, two-factor authentication never enabled, an admin who's long gone but still listed on the asset. Those are the patterns I now teach in the BMS course.",
    ],
    processTitle: 'How the diagnosis works',
    steps: [
      { title: 'Send a message', text: "A WhatsApp message, I reply within minutes and start reviewing your case." },
      { title: 'Quick diagnosis', text: "A few questions and a professional check of the problem, no wasted time." },
      { title: 'Clear quote, full transparency', text: 'A clear price, no surprises. Payment only after success.' },
      { title: 'We get to work', text: `Once we're set, results usually follow within ${FACTS.typicalTurnaround.display} hours.` },
    ],
    pressTitle: 'Media Coverage',
    pressMore: 'All coverage ←',
    finalTitle: 'Is your account blocked right now?',
    finalText: 'Free initial diagnosis, and payment only after the account is back.',
    whatsappMessage: "Hi, I found you through your about page, I'd love your help",
  },
};

export default function Author() {
  const { lang, dir, prefix } = useLang();
  const t = STR[lang];
  const press = (lang === 'en' ? pressItemsEn : pressItems).slice(0, 3);

  return (
    <div dir={dir} className="author-page">
      <Navbar />
      <main>
        <section className="author-hero">
          <div className="author-container">
            <img className="author-photo" src="/images/osher-photo-1.jpg" alt="אושר רווח" width="168" height="168" loading="eager" />
            <h1>אושר רווח</h1>
            <p className="author-role">{t.role}</p>
            <p className="author-stats">
              {t.stats.map((s, i) => (<span key={i}>{s}</span>))}
            </p>
            <a
              className="author-hero-cta"
              href={getWhatsAppUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick('author-hero')}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaHero}
            </a>
          </div>
        </section>

        <div className="author-divider" aria-hidden="true" />

        <section className="author-section">
          <h2>{t.storyTitle}</h2>
          {t.storyP.map((p, i) => (<p key={i}>{p}</p>))}
        </section>

        <div className="author-divider" aria-hidden="true" />

        <section className="author-section">
          <h2>{t.processTitle}</h2>
          <ol className="author-steps">
            {t.steps.map((s, i) => (
              <li key={i}>
                <span className="author-step-n" aria-hidden="true">{i + 1}</span>
                <span>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <div className="author-divider" aria-hidden="true" />

        <section className="author-section">
          <h2>{t.pressTitle}</h2>
          <div className="author-press-row">
            {press.map((p) => (
              <a key={p.id} className="author-press-item" href={p.url} target="_blank" rel="noopener noreferrer">
                <strong>{p.siteName}</strong>
                {p.headline}
              </a>
            ))}
          </div>
          <a className="author-press-more" href={`${prefix}/press`}>{t.pressMore}</a>
        </section>

        <section className="author-final">
          <div className="author-container">
            <h2>{t.finalTitle}</h2>
            <p>{t.finalText}</p>
            <a
              className="author-final-btn"
              href={getWhatsAppUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick('author-final')}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaHero}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export { STR as AUTHOR_STR };
