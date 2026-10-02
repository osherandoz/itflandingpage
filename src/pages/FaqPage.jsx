import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { Btn, Eyebrow } from '../components/ui';
import '../components/FAQ.css';
import './FaqPage.css';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';


const t = {
  backLink: 'חזרה לעמוד הראשי',
  eyebrow: 'שאלות ותשובות',
  indexLabel: 'נושאים',
  titleLight: 'שאלות נפוצות:',
  titleBold: 'שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ',
  subtitle:
    'כל התשובות לשאלות הנפוצות ביותר על שחזור חשבונות ברשתות החברתיות. לא מצאתם תשובה? צרו קשר ונשמח לעזור.',
  ctaTitle: 'עדיין יש לכם שאלות?',
  ctaText:
    'אנחנו זמינים ראשון עד שישי, 09:00–16:00, לכל שאלה. שלחו לנו הודעה בוואטסאפ ונחזור אליכם תוך דקות. אבחון ראשוני, חינם לגמרי.',
  ctaBtn: 'שלחו הודעה בוואטסאפ',
  whatsappMessage: 'היי, יש לי שאלה על שחזור חשבון',
};

const pad = (n) => String(n).padStart(2, '0');

// "Back" in an RTL layout points to the right.
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

// One category: a numbered eyebrow, the category name, and a native accordion.
// The shared `name` keeps one answer open per category, as before.
const CategoryGroup = ({ category, index }) => (
  <section className="faqp__group m-reveal" aria-labelledby={`cat-${category.id}`}>
    <header className="faqp__group-head">
      <Eyebrow num={pad(index + 1)}>{category.faqs.length} שאלות</Eyebrow>
      <h2 className="h2 faqp__group-title" id={`cat-${category.id}`}>{category.title}</h2>
    </header>
    <div className="faq-list">
      {category.faqs.map((faq, i) => (
        <details key={faq.question} className="faq-item" name={`faq-${category.id}`}>
          <summary>
            <span className="faq-item__num num" aria-hidden="true">{pad(i + 1)}</span>
            <span className="faq-item__q">{faq.question}</span>
            <span className="faq-item__icon" aria-hidden="true" />
          </summary>
          <p className="faq-item__a">{faq.answer}</p>
        </details>
      ))}
    </div>
  </section>
);

const FaqPage = ({ categories }) => {
  const whatsappUrl = getWhatsAppUrl(t.whatsappMessage);

  return (
    <div dir="rtl" className="faqp">
      <Navbar />

      <main id="main">
        <header className="faqp__hero theme-ink bg-grid">
          <div className="container">
            <Link to="/" className="faqp__back link link--arrow small">
              <BackIcon />
              {t.backLink}
            </Link>
            <Eyebrow className="faqp__eyebrow">{t.eyebrow}</Eyebrow>
            <h1 className="h1 faqp__title">
              <span className="lt">{t.titleLight}</span> {t.titleBold}
            </h1>
            <p className="lead faqp__sub">{t.subtitle}</p>
          </div>
        </header>

        <div className="faqp__body">
          <div className="container faqp__grid">
            <nav className="faqp__index" aria-label={t.indexLabel}>
              <div className="faqp__index-inner">
                <p className="faqp__index-label">( {t.indexLabel} )</p>
                <ol className="faqp__index-list">
                  {categories.map((category, i) => (
                    <li key={category.id}>
                      <a href={`#cat-${category.id}`} className="faqp__index-link">
                        <span className="faqp__index-num num" aria-hidden="true">{pad(i + 1)}</span>
                        <span className="faqp__index-name">{category.title}</span>
                        <span className="faqp__index-count num" aria-hidden="true">{category.faqs.length}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="faqp__groups">
              {categories.map((category, i) => (
                <CategoryGroup key={category.id} category={category} index={i} />
              ))}
            </div>
          </div>
        </div>

        <section className="faqp__cta" aria-labelledby="faqp-cta-title">
          <div className="container">
          <div className="faqp__cta-card theme-ink m-reveal">
            <h2 className="h1" id="faqp-cta-title">{t.ctaTitle}</h2>
            <div className="faqp__cta-side">
              <p className="lead">{t.ctaText}</p>
              <Btn variant="go" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick('faq-page')}>
                {t.ctaBtn}
              </Btn>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default FaqPage;
