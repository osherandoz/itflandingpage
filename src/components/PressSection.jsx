import React from 'react';
import { Link } from 'react-router';
import { pressItems } from '../data/press';
import { ArrowIcon } from './ui';
import './PressSection.css';

// Outlets that actually covered the work, in order of first appearance
const OUTLETS = [...new Set(pressItems.map((item) => item.siteName))];

const PressSection = () => (
  <section className="press theme-ink" aria-label="כפי שסוקרנו בתקשורת">
    {/* Outlet names drift past in one direction; two copies make the loop seamless */}
    <div className="press__marquee m-marquee" aria-hidden="true">
      <div className="m-marquee__track">
        {[0, 1].map((copy) => (
          <div className="press__marquee-set" key={copy}>
            {[...OUTLETS, ...OUTLETS].map((name, i) => (
              <span className="press__outlet" key={`${copy}-${i}`}>
                {name}
                <span className="press__diamond" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>

    <div className="container press__body">
      <div className="press__head">
        <p className="press__label">( כפי שסוקרנו בתקשורת )</p>
        <Link to="/press" className="link link--arrow small">
          כל הכתבות
          <ArrowIcon />
        </Link>
      </div>

      {/* Homepage shows the 4 most recent; full list lives at /press */}
      <ol className="press__list">
        {pressItems.slice(0, 4).map((item) => (
          <li key={item.id}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press__row"
              aria-label={`${item.siteName}: ${item.headline}`}
            >
              <span className="press__date num">{item.date}</span>
              <span className="press__site">{item.siteName}</span>
              <span className="press__headline">{item.headline}</span>
              <span className="press__go" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default PressSection;
