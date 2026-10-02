import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Icon from '../components/Icon';
import { Eyebrow, ArrowIcon } from '../components/ui';
import { formatDate } from '../i18n';
import './ArticlesPage.css';

const t = {
  backLink: 'חזרה לדף הבית',
  eyebrow: 'מרכז הידע',
  titleLight: 'מאמרים',
  titleBold: 'ומדריכים',
  subtitle: 'מדריכים מקצועיים לשחזור חשבונות פייסבוק, אינסטגרם, וואטסאפ ומנהל מודעות.',
  listEyebrow: 'כל המדריכים',
  readSuffix: 'קריאה',
};

const pad = (n) => String(n).padStart(2, '0');

const Meta = ({ article }) => (
  <span className="artl__meta small">
    <bdi className="num">{formatDate(article.date)}</bdi>
    <span aria-hidden="true">·</span>
    <span>{article.readTime} {t.readSuffix}</span>
  </span>
);

const Category = ({ article, solid }) => (
  <span className={`tag${solid ? ' tag--solid' : ''} artl__tag`}>
    <Icon name={article.icon} />
    {article.category}
  </span>
);

export default function ArticlesPage({ articles }) {
  const realArticles = articles.filter((a) => !a.placeholder);
  const [lead, ...rest] = realArticles;

  return (
    <div className="artl" dir="rtl">
      <Navbar />

      <main id="main">
        <header className="artl__hero theme-ink bg-grid">
          <div className="container">
            <div className="artl__hero-grid">
              <div className="artl__hero-copy">
                <Eyebrow num="01">{t.eyebrow}</Eyebrow>
                <h1 className="display artl__title">
                  <span className="lt">{t.titleLight}</span> {t.titleBold}
                </h1>
              </div>
              <div className="artl__hero-side">
                <p className="lead">{t.subtitle}</p>
                <Link to="/" className="link small artl__back">
                  {t.backLink}
                </Link>
              </div>
            </div>

            {lead && (
              <Link to={`/articles/${lead.slug}`} className="artl__lead">
                <span className="artl__lead-head">
                  <Category article={lead} solid />
                  <span className="artl__num num" aria-hidden="true">01</span>
                </span>
                <h2 className="artl__lead-title">{lead.displayTitle || lead.title}</h2>
                <span className="artl__lead-body">
                  <span className="artl__lead-excerpt">{lead.excerpt}</span>
                  <Meta article={lead} />
                </span>
                <span className="artl__go" aria-hidden="true"><ArrowIcon /></span>
              </Link>
            )}
          </div>
        </header>

        {rest.length > 0 && (
          <section className="artl__list section theme-mist">
            <div className="container">
              <Eyebrow num="02" className="m-reveal">{t.listEyebrow}</Eyebrow>
              <div className="artl__rows">
                {rest.map((article, i) => (
                  <Link key={article.id} to={`/articles/${article.slug}`} className="artl__row m-reveal">
                    <span className="artl__num num" aria-hidden="true">{pad(i + 2)}</span>
                    <h2 className="artl__row-title">{article.displayTitle || article.title}</h2>
                    <span className="artl__row-excerpt">{article.excerpt}</span>
                    <span className="artl__row-meta">
                      <Category article={article} />
                      <Meta article={article} />
                    </span>
                    <span className="artl__go" aria-hidden="true"><ArrowIcon /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
