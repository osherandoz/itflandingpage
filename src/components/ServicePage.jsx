import React, { useState } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ContactForm from './ContactForm';
import { getWhatsAppUrl, trackWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { useLang } from '../i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ServicePage.css';

const STR = {
  he: {
    heroSubtitle: 'שירות מקצועי ומהיר לשחזור חשבונות. תשלום רק אחרי הצלחה מוכחת',
    ctaHero: 'שלחו הודעה עכשיו, ללא עלות',
    statsAria: 'נתוני שירות',
    statAccounts: 'חשבונות שוחזרו',
    statSuccess: 'אחוז הצלחה',
    statHours: 'שעות בממוצע',
    statRating: 'דירוג לקוחות',
    aboutTitle: 'מה זה ולמה זה קורה?',
    stepsTitle: 'הפתרון שלנו: 3 שלבים פשוטים',
    testimonialsTitle: 'מה הלקוחות שלנו אומרים',
    faqTitle: (keyword) => `שאלות נפוצות על ${keyword}`,
    faqSubtitle: 'תשובות לשאלות שלקוחות שואלים אותנו הכי הרבה',
    relatedTitle: 'מאמרים קשורים',
    formTitle: 'מעדיפים שאחזור אליכם?',
    formSubtitle: 'השאירו שם וטלפון ואחזור אליכם עם אבחון ראשוני, ללא עלות.',
    finalTitle: 'מוכנים לפתור את הבעיה?',
    finalText: 'שלחו הודעת וואטסאפ עכשיו. אבחון ראשוני חינם, ותשלום רק אחרי שהחשבון חזר לידיכם.',
    ctaFinal: 'שלחו הודעה עכשיו',
    whatsappMessage: (keyword) => `היי, אני מעוניין/ת בשירות: ${keyword}`,
  },
  en: {
    heroSubtitle: 'Fast, professional account recovery. Pay only after proven success',
    ctaHero: 'Message Us Now, Free of Charge',
    statsAria: 'Service statistics',
    statAccounts: 'Accounts Recovered',
    statSuccess: 'Success Rate',
    statHours: 'Hours on Average',
    statRating: 'Client Rating',
    aboutTitle: 'What Is It and Why Does It Happen?',
    stepsTitle: 'Our Solution: 3 Simple Steps',
    testimonialsTitle: 'What Our Clients Say',
    faqTitle: (keyword) => `Frequently Asked Questions About ${keyword}`,
    faqSubtitle: 'Answers to the questions clients ask us most',
    relatedTitle: 'Related Articles',
    formTitle: 'Prefer That I Call You Back?',
    formSubtitle: 'Leave your name and phone number and I will get back to you with a free initial assessment.',
    finalTitle: 'Ready to Solve the Problem?',
    finalText: 'Send a WhatsApp message now. Free initial assessment, and payment only after your account is back in your hands.',
    ctaFinal: 'Message Us Now',
    whatsappMessage: () => WHATSAPP_DEFAULT_MSG.en,
  },
};

// All 6 testimonials inlined so the template has no extra data dependency
const ALL_TESTIMONIALS = {
  he: [
    {
      id: 1,
      name: 'מתנאל לייני',
      role: 'יוצר תוכן ומשפיען',
      image: '/images/matanel.jpg',
      quote:
        'מתחילת המלחמה אושר מלווה אותי בכל צרה, הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר.',
      rating: 5,
    },
    {
      id: 2,
      name: 'חני אסור',
      role: 'יוצרת תוכן בתחום הקולינריה',
      image: '/images/hani.jpg',
      quote:
        'פרצו לי לאינסטגרם ולפייסבוק, ראיתי את מפעל חיי קורס. דיברתי עם עוד כמה אנשים שהלחיצו אותי, אושר בא - הרגיע וסידר.',
      rating: 5,
    },
    {
      id: 3,
      name: 'גל נמני',
      role: 'מנכלית Go-Tech',
      image: '/images/gal.jpg',
      quote:
        'לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!',
      rating: 5,
    },
    {
      id: 4,
      name: 'אופירה יחיא',
      role: 'קונדיטורית ויוצרת תוכן',
      image: '/images/ofira.jpg',
      quote:
        'פרצו לי אנשים מטורקיה, השביתו את החשבון והמצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים.',
      rating: 5,
    },
    {
      id: 5,
      name: 'יש עתיד',
      role: 'מפלגת יש עתיד - לקהילה הערבית',
      image: '/images/yeshatid.jpg',
      quote:
        'ביום בהיר אחד ירד עלינו המסך מסיבה הזויה לחלוטין, אושר איבחן מהר את הבעיה ובפעילות יסודית החזיר אותנו לפעילות אחרי יומיים',
      rating: 5,
    },
    {
      id: 6,
      name: 'ליראק ישראל',
      role: 'הברנד הישראלי לחברת הטיפוח המובילה',
      image: '/images/lierac.jpg',
      quote:
        'תמיכה מעולה בפתרון בעיות פרסום. אושר מקצועי, זמין ועוזר בכל בעיה. מאוד מרוצה מהשירות!',
      rating: 5,
    },
  ],
  en: [
    {
      id: 1,
      name: 'Matanel Layani',
      role: 'Content Creator and Influencer',
      image: '/images/matanel.jpg',
      quote:
        'Since the start of the war Osher has been with me through every crisis. He managed to get my account back from blocks you would not believe. Just give him the chance and he will sort it out.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Hani Asor',
      role: 'Culinary Content Creator',
      image: '/images/hani.jpg',
      quote:
        "My Instagram and Facebook were hacked, and I watched my life's work collapse. I spoke with a few other people who only stressed me out. Osher came in, calmed things down, and fixed it.",
      rating: 5,
    },
    {
      id: 3,
      name: 'Gal Nimni',
      role: 'CEO of Go-Tech',
      image: '/images/gal.jpg',
      quote:
        'After getting burned by another company, I turned to Osher and with real dedication he brought my business back to life. Just like that!',
      rating: 5,
    },
    {
      id: 4,
      name: 'Ofira Yahya',
      role: 'Pastry Chef and Content Creator',
      image: '/images/ofira.jpg',
      quote:
        'People from Turkey hacked me, the account was disabled and the situation was almost irreversible. After about two weeks, Osher got my account back with uncommon calm and composure.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Yesh Atid',
      role: 'Yesh Atid Party - Arab Community Outreach',
      image: '/images/yeshatid.jpg',
      quote:
        'One bright day everything went dark on us for a completely absurd reason. Osher diagnosed the problem fast, and with thorough work had us back up and running after two days.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Lierac Israel',
      role: "The Israeli Brand of the Leading Skincare Company",
      image: '/images/lierac.jpg',
      quote:
        'Excellent support in solving advertising problems. Osher is professional, available, and helps with every issue. Very happy with the service!',
      rating: 5,
    },
  ],
};

function Stars({ count }) {
  return (
    <div className="service-testimonial-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`fas fa-star${i < count ? '' : ' empty'}`} aria-hidden="true"></i>
      ))}
    </div>
  );
}

function ServiceFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="service-faq-list">
      {faqs.map((faq, index) => (
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
  );
}

const ServicePage = ({ pageData }) => {
  const { lang, dir, prefix } = useLang();
  const t = STR[lang];

  const visibleTestimonials = pageData.testimonialIds
    .map((id) => ALL_TESTIMONIALS[lang].find((tm) => tm.id === id))
    .filter(Boolean);

  // A real <a> — button + window.open() is blocked inside the Instagram and
  // Facebook in-app browsers, which is where most of this page's traffic lands.
  const whatsappHref = getWhatsAppUrl(t.whatsappMessage(pageData.keyword));

  return (
    <div dir={dir} className="service-page">
      <Navbar />

      <main>
        {/* ---- HERO ---- */}
        <section className="service-hero">
          <div className="service-container">
            <h1>{pageData.title}</h1>
            <p className="service-hero-subtitle">{t.heroSubtitle}</p>
            <a
              className="service-cta-btn"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaHero}
            </a>
          </div>
        </section>

        {/* ---- STATS STRIP ---- */}
        <section className="service-stats" aria-label={t.statsAria}>
          <div className="service-container">
            <div className="service-stats-inner">
              <div className="service-stat">
                <span className="service-stat-value">2,500+</span>
                <span className="service-stat-label">{t.statAccounts}</span>
              </div>
              <div className="service-stat">
                <span className="service-stat-value">95%+</span>
                <span className="service-stat-label">{t.statSuccess}</span>
              </div>
              <div className="service-stat">
                <span className="service-stat-value">24-48</span>
                <span className="service-stat-label">{t.statHours}</span>
              </div>
              <div className="service-stat">
                <span className="service-stat-value">4.9★</span>
                <span className="service-stat-label">{t.statRating}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- ABOUT ---- */}
        <section className="service-about">
          <div className="service-container">
            <h2>{t.aboutTitle}</h2>
            <div
              className="service-about-text"
              dangerouslySetInnerHTML={{ __html: pageData.whatIsIt }}
            />
          </div>
        </section>

        {/* ---- STEPS ---- */}
        <section className="service-steps">
          <div className="service-container">
            <h2>{t.stepsTitle}</h2>
            <div className="service-steps-grid">
              {pageData.steps.map((step, index) => (
                <div key={index} className="service-step-card">
                  <div className="service-step-icon">
                    <i className={step.icon} aria-hidden="true"></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- TESTIMONIALS ---- */}
        <section className="service-testimonials">
          <div className="service-container">
            <h2>{t.testimonialsTitle}</h2>
            <div className="service-testimonials-grid">
              {visibleTestimonials.map((tm) => (
                <div key={tm.id} className="service-testimonial-card">
                  <div className="service-testimonial-header">
                    <img
                      src={tm.image}
                      alt={`${tm.name}, ${tm.role}`}
                      className="service-testimonial-img"
                      width="56"
                      height="56"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                    <div>
                      <p className="service-testimonial-name">{tm.name}</p>
                      <p className="service-testimonial-role">{tm.role}</p>
                      <Stars count={tm.rating} />
                    </div>
                  </div>
                  <p className="service-testimonial-quote">"{tm.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="service-faq">
          <div className="service-container">
            <h2>{t.faqTitle(pageData.keyword)}</h2>
            <p className="service-faq-subtitle">{t.faqSubtitle}</p>
            <ServiceFAQ faqs={pageData.faqs} />
          </div>
        </section>

        {/* ---- RELATED ARTICLES ---- */}
        {pageData.relatedArticles && pageData.relatedArticles.length > 0 && (
          <section className="service-related-articles">
            <div className="service-container">
              <h2>{t.relatedTitle}</h2>
              <ul className="service-related-list">
                {pageData.relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link to={`${prefix}/articles/${a.slug}`} className="service-related-link">
                      <i className="fas fa-file-alt" aria-hidden="true"></i>
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ---- LEAD FORM ---- */}
        <section className="service-lead-form">
          <div className="service-container">
            <h2>{t.formTitle}</h2>
            <p className="service-form-subtitle">{t.formSubtitle}</p>
            <ContactForm />
          </div>
        </section>

        {/* ---- FINAL CTA ---- */}
        <section className="service-cta-final">
          <div className="service-container">
            <h2>{t.finalTitle}</h2>
            <p>{t.finalText}</p>
            <a
              className="service-cta-btn"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaFinal}
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ServicePage;
