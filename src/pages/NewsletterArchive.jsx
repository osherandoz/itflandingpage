import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { ISSUES } from '../data/newsletterArchive';
import { useLang } from '../i18n';
import './NewsletterArchive.css';

const STR = {
  he: {
    h1: 'ארכיון The Safety Signal',
    lead: 'גיליון לדוגמה, בדיוק כמו שהוא נשלח למנויים. אלה שלושת החלקים בכל גיליון.',
    cta: 'הצטרפו לניוזלטר ←',
    ctaHref: '/newsletter',
    issueLabel: (n, m) => `גיליון #${n} · ${m}`,
  },
  en: {
    h1: 'The Safety Signal Archive',
    lead: 'A sample issue, exactly as it went out to subscribers. These are the three parts every issue has.',
    cta: 'Join the newsletter ←',
    ctaHref: '/en/newsletter',
    issueLabel: (n, m) => `Issue #${n} · ${m}`,
  },
};

export default function NewsletterArchive() {
  const { lang, dir } = useLang();
  const t = STR[lang];

  return (
    <div dir={dir} className="nl-archive-page">
      <Navbar />
      <main>
        <section className="nl-archive-hero">
          <div className="nl-archive-container">
            <h1>{t.h1}</h1>
            <p>{t.lead}</p>
            <Link to={t.ctaHref} className="nl-archive-cta">{t.cta}</Link>
          </div>
        </section>

        <div className="nl-archive-container">
          {ISSUES.map((issue) => (
            <article className="nl-issue" key={issue.slug}>
              <p className="nl-issue-meta">{t.issueLabel(issue.issueNumber, issue.month[lang])}</p>
              {issue.segments[lang].map((s) => (
                <div className="nl-issue-segment" key={s.n}>
                  <span className="nl-issue-n" dir="ltr">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
