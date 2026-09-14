import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { CASE_STUDIES } from '../data/caseStudies';
import { useLang } from '../i18n';
import './CaseStudies.css';

const STR = {
  he: {
    h1: 'סיפורי הצלחה, בלי שמות',
    lead: 'שלושה מקרים אמיתיים: מה קרה, מה כבר ניסו, מה עשינו, וכמה זמן זה לקח. פרטים מזהים הוסרו.',
    labels: { errorState: 'מה קרה', alreadyTried: 'מה כבר ניסו', whatWeDid: 'מה עשינו', result: 'התוצאה', limitations: 'חשוב לדעת' },
    statPrice: 'עלות', statTime: 'זמן לפתרון',
    hours: (h) => `${h} שעות`,
    price: (p) => `₪${p}`,
    ctaTitle: 'המקרה שלך שונה?',
    ctaText: 'שלחו לי פרטים בוואטסאפ ואבדוק, ללא עלות.',
    ctaBtn: 'שלחו הודעה עכשיו',
    whatsappMessage: 'היי, ראיתי את סיפורי ההצלחה באתר, יש לי מקרה דומה',
  },
  en: {
    h1: 'Success Stories, Names Removed',
    lead: 'Three real cases: what happened, what was already tried, what we did, and how long it took. Identifying details removed.',
    labels: { errorState: 'What happened', alreadyTried: 'What was already tried', whatWeDid: 'What we did', result: 'The result', limitations: 'Worth knowing' },
    statPrice: 'Cost', statTime: 'Time to resolve',
    hours: (h) => `${h} hours`,
    price: (p) => `₪${p}`,
    ctaTitle: 'Is your case different?',
    ctaText: "Send me the details on WhatsApp and I'll take a look, free of charge.",
    ctaBtn: 'Send a message now',
    whatsappMessage: "Hi, I saw the success stories on your site, I have a similar case",
  },
};

export default function CaseStudies() {
  const { lang, dir } = useLang();
  const t = STR[lang];

  return (
    <div dir={dir} className="cases-page">
      <Navbar />
      <main>
        <section className="cases-hero">
          <div className="cases-container">
            <h1>{t.h1}</h1>
            <p>{t.lead}</p>
          </div>
        </section>

        <div className="cases-container">
          {CASE_STUDIES.map((c) => (
            <article className="case-card" key={c.id}>
              <span className="case-card-badge">{c.platformLabel[lang]}</span>
              <h2>{c.title[lang]}</h2>

              <div className="case-row">
                <span className="case-row-label">{t.labels.errorState}</span>
                <p>{c.errorState[lang]}</p>
              </div>
              <div className="case-row">
                <span className="case-row-label">{t.labels.alreadyTried}</span>
                <p>{c.alreadyTried[lang]}</p>
              </div>
              <div className="case-row">
                <span className="case-row-label">{t.labels.whatWeDid}</span>
                <p>{c.whatWeDid[lang]}</p>
              </div>
              <div className="case-row">
                <span className="case-row-label">{t.labels.result}</span>
                <p>{c.result[lang]}</p>
              </div>
              <div className="case-row">
                <span className="case-row-label">{t.labels.limitations}</span>
                <p>{c.limitations[lang]}</p>
              </div>

              <div className="case-stats">
                <div className="case-stat">
                  <span className="case-stat-value">{t.price(c.priceILS)}</span>
                  <span className="case-stat-label">{t.statPrice}</span>
                </div>
                <div className="case-stat">
                  <span className="case-stat-value">{t.hours(c.hoursToOutcome)}</span>
                  <span className="case-stat-label">{t.statTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="cases-final">
          <div className="cases-container">
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
            <a
              className="cases-final-btn"
              href={getWhatsAppUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick('case-studies-final')}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaBtn}
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
