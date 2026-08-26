import React from 'react';
import { Link } from 'react-router';
import { pressItems, pressItemsEn } from '../data/press';
import { useLang } from '../i18n';
import Icon from './Icon';
import './PressSection.css';

const STR = {
  he: {
    items: pressItems,
    sectionAria: 'כפי שסוקרנו בתקשורת',
    label: 'כפי שסוקרנו בתקשורת',
    moreLink: '← צפייה בכל הכתבות',
  },
  en: {
    items: pressItemsEn,
    sectionAria: 'As covered in the media',
    label: 'As covered in the media',
    moreLink: 'View all articles →',
  },
};

const SiteLogo = ({ item }) => {
  if (item.siteShortName === 'ynet') {
    return <span className="press-logo-text press-logo-ynet">ynet</span>;
  }
  if (item.siteShortName === 'facebook') {
    return (
      <span className="press-logo-text" style={{ color: item.siteColor }}>
        <Icon name="facebook" aria-hidden="true" /> {item.siteName}
      </span>
    );
  }
  return (
    <span className="press-logo-text" style={item.siteColor ? { color: item.siteColor } : undefined}>
      {item.siteName}
    </span>
  );
};

const PressSection = () => {
  const { lang, prefix } = useLang();
  const t = STR[lang];

  return (
    <section className="press-section" aria-label={t.sectionAria}>
      <div className="press-container">

        <div className="press-header">
          <span className="press-divider" aria-hidden="true"></span>
          <p className="press-label">{t.label}</p>
          <span className="press-divider" aria-hidden="true"></span>
        </div>

        <div className="press-items">
          {/* Homepage strip shows the 4 most recent; full list lives at /press */}
          {t.items.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press-item"
              aria-label={`${item.siteName}: ${item.headline}`}
            >
              <SiteLogo item={item} />
              <span className="press-headline">"{item.headline}"</span>
              <span className="press-date">{item.date}</span>
            </a>
          ))}
        </div>

        <Link to={`${prefix}/press`} className="press-more-link">
          {t.moreLink}
        </Link>

      </div>
    </section>
  );
};

export default PressSection;
