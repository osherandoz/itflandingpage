import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { articles } from '../data/articles';
import '../components/ArticlesSection.css';
import './ArticlesPage.css';

const realArticles = articles.filter(a => !a.placeholder);

export default function ArticlesPage() {
  return (
    <div className="articles-page" dir="rtl">
      <Navbar />

      <header className="articles-page-header">
        <div className="container">
          <Link to="/" className="articles-back-link">
            <i className="fas fa-arrow-right"></i> חזרה לדף הבית
          </Link>
          <h1 className="articles-page-title">
            <i className="fas fa-book-open"></i>
            מאמרים ומדריכים
          </h1>
          <p className="articles-page-subtitle">
            מדריכים מקצועיים לשחזור חשבונות פייסבוק, אינסטגרם, וואטסאפ ומנהל מודעות.
          </p>
        </div>
      </header>

      <main className="articles-page-body">
        <div className="container">
          <div className="articles-grid">
            {realArticles.map(article => (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
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
                    <span><i className="fas fa-calendar"></i> {article.date.split('-').reverse().join('/')}</span>
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
