import React, { useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { useLang } from '../i18n';
import { WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './FaqPage.css';

const WHATSAPP_NUMBER = '972547274750';

const STR = {
  he: {
    backLink: 'חזרה לעמוד הראשי',
    backIcon: 'fas fa-arrow-right',
    title: 'שאלות נפוצות: שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ',
    subtitle:
      'כל התשובות לשאלות הנפוצות ביותר על שחזור חשבונות ברשתות החברתיות. לא מצאתם תשובה? צרו קשר ונשמח לעזור.',
    ctaTitle: 'עדיין יש לכם שאלות?',
    ctaText:
      'אנחנו זמינים 24/6 לכל שאלה. שלחו לנו הודעה בוואטסאפ ונחזור אליכם תוך דקות. אבחון ראשוני, חינם לגמרי.',
    ctaBtn: 'שלחו הודעה בוואטסאפ',
    whatsappMessage: 'היי, יש לי שאלה על שחזור חשבון',
  },
  en: {
    backLink: 'Back to home page',
    backIcon: 'fas fa-arrow-left',
    title: 'Frequently Asked Questions: Facebook, Instagram & WhatsApp Account Recovery',
    subtitle:
      "All the answers to the most common questions about social media account recovery. Didn't find an answer? Get in touch and we'll be happy to help.",
    ctaTitle: 'Still have questions?',
    ctaText:
      "We're available 24/6 for any question. Send us a WhatsApp message and we'll get back to you within minutes. Initial diagnosis — completely free.",
    ctaBtn: 'Send a WhatsApp Message',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const CategoryAccordion = ({ category }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-category" aria-labelledby={`cat-${category.id}`}>
      <h2 className="faq-category-title" id={`cat-${category.id}`}>
        <i className={category.icon} aria-hidden="true"></i>
        {category.title}
      </h2>
      <div className="faq-container">
        {category.faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question${openIndex === index ? ' active' : ''}`}
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <i
                className={`fas fa-chevron-down${openIndex === index ? ' rotated' : ''}`}
                aria-hidden="true"
              ></i>
            </button>
            <div className={`faq-answer${openIndex === index ? ' open' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FaqPage = ({ categories }) => {
  const { lang, dir, prefix } = useLang();
  const t = STR[lang];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <div dir={dir} className="faq-page">
      <Navbar />

      <main className="faq-main">
        <div className="container">
          <div className="faq-page-header">
            <Link to={prefix || '/'} className="faq-back-link">
              <i className={t.backIcon} aria-hidden="true"></i>
              {t.backLink}
            </Link>
            <h1 className="faq-page-title">{t.title}</h1>
            <p className="faq-page-subtitle">{t.subtitle}</p>
          </div>

          {categories.map((category) => (
            <CategoryAccordion key={category.id} category={category} />
          ))}

          <div className="faq-page-cta">
            <h2 className="faq-cta-title">{t.ctaTitle}</h2>
            <p className="faq-cta-text">{t.ctaText}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="faq-cta-btn"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaBtn}
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default FaqPage;
