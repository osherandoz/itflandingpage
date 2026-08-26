import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { useLang } from '../i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../components/ArticlesSection.css';
import './ArticlesPage.css';

const STR = {
  he: {
    backLink: 'חזרה לדף הבית',
    backArrow: 'fas fa-arrow-right',
    title: 'מאמרים ומדריכים',
    subtitle: 'מדריכים מקצועיים לשחזור חשבונות פייסבוק, אינסטגרם, וואטסאפ ומנהל מודעות.',
  },
  en: {
    backLink: 'Back to Home',
    backArrow: 'fas fa-arrow-left',
    title: 'Articles & Guides',
    subtitle: 'Professional guides to recovering Facebook, Instagram, WhatsApp, and Ads Manager accounts.',
  },
};

const formatDate = (date, isEn) => {
  if (!isEn) return date.split('-').reverse().join('/');
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function ArticlesPage({ articles }) {
  const { lang, isEn, dir, prefix } = useLang();
  const t = STR[lang];
  const realArticles = articles.filter(a => !a.placeholder);

  return (
    <div className="articles-page" dir={dir}>
      <Navbar />

      <header className="articles-page-header">
        <div className="container">
          <Link to={prefix || '/'} className="articles-back-link">
            <i className={t.backArrow}></i> {t.backLink}
          </Link>
          <h1 className="articles-page-title">
            <i className="fas fa-book-open"></i>
            {t.title}
          </h1>
          <p className="articles-page-subtitle">
            {t.subtitle}
          </p>
        </div>
      </header>

      <main className="articles-page-body">
        <div className="container">
          <div className="articles-grid">
            {realArticles.map(article => (
              <Link
                key={article.id}
                to={`${prefix}/articles/${article.slug}`}
                className="article-card"
              >
                <div className="article-card-icon">
                  <i className={article.icon}></i>
                </div>
                <div className="article-card-content">
                  <span className="article-card-category">{article.category}</span>
                  <h2 className="article-card-title">{article.displayTitle || article.title}</h2>
                  <p className="article-card-excerpt">{article.excerpt}</p>
                  <div className="article-card-meta">
                    <span><i className="fas fa-clock"></i> {article.readTime}</span>
                    <span><i className="fas fa-calendar"></i> {formatDate(article.date, isEn)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
