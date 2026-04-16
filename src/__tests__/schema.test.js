/**
 * Schema Markup Unit Tests
 * Validates all JSON-LD structured data for Schema.org compliance.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import {
  LOCAL_BUSINESS_SCHEMA,
  SERVICE_SCHEMAS,
  buildBlogPostingSchema,
} from '../data/schemas.js';
import { buildNewsArticleSchema } from '../data/pressSchemas.js';
import { FAQ_SCHEMA } from '../data/faqSchema.js';
import { pressItems } from '../data/press.js';
import { articles } from '../data/articles.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isValidUrl = (url) => {
  try { new URL(url); return true; } catch { return false; }
};
const isISODate = (str) => /^\d{4}-\d{2}-\d{2}/.test(str);

// ─── LocalBusiness ────────────────────────────────────────────────────────────
describe('LocalBusiness schema', () => {
  it('has required @context and @type', () => {
    expect(LOCAL_BUSINESS_SCHEMA['@context']).toBe('https://schema.org');
    expect(LOCAL_BUSINESS_SCHEMA['@type']).toBe('LocalBusiness');
  });

  it('has a name', () => {
    expect(LOCAL_BUSINESS_SCHEMA.name).toBeTruthy();
  });

  it('has a valid canonical url', () => {
    expect(isValidUrl(LOCAL_BUSINESS_SCHEMA.url)).toBe(true);
    expect(LOCAL_BUSINESS_SCHEMA.url).toContain('israeltechforce.com');
  });

  it('has telephone', () => {
    expect(LOCAL_BUSINESS_SCHEMA.telephone).toMatch(/^\+972/);
  });

  it('has areaServed Israel', () => {
    expect(LOCAL_BUSINESS_SCHEMA.areaServed?.name).toBe('Israel');
  });

  it('has sameAs with business Facebook page', () => {
    const hasBizPage = LOCAL_BUSINESS_SCHEMA.sameAs?.some(
      (url) => url.includes('facebook.com/israeltechforce23')
    );
    expect(hasBizPage).toBe(true);
  });

  it('has sameAs with Instagram', () => {
    const hasIG = LOCAL_BUSINESS_SCHEMA.sameAs?.some(
      (url) => url.includes('instagram.com')
    );
    expect(hasIG).toBe(true);
  });

  it('has aggregateRating', () => {
    expect(LOCAL_BUSINESS_SCHEMA.aggregateRating).toBeDefined();
    expect(LOCAL_BUSINESS_SCHEMA.aggregateRating.ratingValue).toBeGreaterThanOrEqual(4.9);
    expect(LOCAL_BUSINESS_SCHEMA.aggregateRating.reviewCount).toBeGreaterThan(100);
  });

  it('has logo image url', () => {
    expect(isValidUrl(LOCAL_BUSINESS_SCHEMA.logo)).toBe(true);
  });

  it('serialises to valid JSON', () => {
    expect(() => JSON.parse(JSON.stringify(LOCAL_BUSINESS_SCHEMA))).not.toThrow();
  });
});

// ─── Individual Service schemas ───────────────────────────────────────────────
describe('Service schemas', () => {
  const EXPECTED_SERVICES = [
    'שחזור חשבון וואטסאפ',
    'שחזור חשבון אינסטגרם',
    'שחזור חשבון פייסבוק',
    'פתרון בעיות התחברות',
    'Facebook Business Manager',
    'פרסום וקמפיינים',
  ];

  it(`exports exactly ${EXPECTED_SERVICES.length} Service schemas`, () => {
    expect(SERVICE_SCHEMAS).toHaveLength(EXPECTED_SERVICES.length);
  });

  SERVICE_SCHEMAS.forEach((schema, i) => {
    describe(`Service[${i}] — ${schema?.name ?? 'undefined'}`, () => {
      it('has @context and @type Service', () => {
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Service');
      });

      it('has a name', () => {
        expect(schema.name).toBeTruthy();
      });

      it('has a description', () => {
        expect(schema.description).toBeTruthy();
        expect(schema.description.length).toBeGreaterThan(20);
      });

      it('has provider linked to LocalBusiness', () => {
        expect(schema.provider?.['@type']).toBe('LocalBusiness');
        expect(schema.provider?.name).toContain('IsraelTechForce');
      });

      it('has areaServed Israel', () => {
        expect(schema.areaServed?.name).toBe('Israel');
      });

      it('serialises to valid JSON', () => {
        expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
      });
    });
  });
});

// ─── FAQPage ──────────────────────────────────────────────────────────────────
describe('FAQPage schema', () => {
  it('has @context and @type FAQPage', () => {
    expect(FAQ_SCHEMA['@context']).toBe('https://schema.org');
    expect(FAQ_SCHEMA['@type']).toBe('FAQPage');
  });

  it('has at least 5 questions', () => {
    expect(FAQ_SCHEMA.mainEntity.length).toBeGreaterThanOrEqual(5);
  });

  FAQ_SCHEMA.mainEntity.forEach((q, i) => {
    it(`Q${i + 1} has name and acceptedAnswer.text`, () => {
      expect(q['@type']).toBe('Question');
      expect(q.name).toBeTruthy();
      expect(q.acceptedAnswer?.['@type']).toBe('Answer');
      expect(q.acceptedAnswer?.text.length).toBeGreaterThan(20);
    });
  });

  it('serialises to valid JSON', () => {
    expect(() => JSON.parse(JSON.stringify(FAQ_SCHEMA))).not.toThrow();
  });
});

// ─── NewsArticle ──────────────────────────────────────────────────────────────
describe('NewsArticle schemas (press items)', () => {
  pressItems.forEach((item) => {
    const schema = buildNewsArticleSchema(item);

    describe(`NewsArticle — ${item.siteName}`, () => {
      it('has @context and @type NewsArticle', () => {
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('NewsArticle');
      });

      it('has a headline', () => {
        expect(schema.headline).toBeTruthy();
      });

      it('has valid datePublished (ISO format)', () => {
        expect(isISODate(schema.datePublished)).toBe(true);
      });

      it('has a valid url', () => {
        expect(isValidUrl(schema.url)).toBe(true);
      });

      it('has publisher with name', () => {
        expect(schema.publisher?.['@type']).toBe('Organization');
        expect(schema.publisher?.name).toBeTruthy();
      });

      it('has image url', () => {
        expect(isValidUrl(schema.image)).toBe(true);
      });

      it('has about pointing to LocalBusiness', () => {
        expect(schema.about?.['@type']).toBe('LocalBusiness');
        expect(schema.about?.name).toContain('IsraelTechForce');
      });

      it('serialises to valid JSON', () => {
        expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
      });
    });
  });
});

// ─── BlogPosting (article pages) ──────────────────────────────────────────────
describe('BlogPosting schemas (article pages)', () => {
  const realArticles = articles.filter((a) => !a.placeholder);

  it('has at least 1 real (non-placeholder) article', () => {
    expect(realArticles.length).toBeGreaterThan(0);
  });

  realArticles.forEach((article) => {
    const schema = buildBlogPostingSchema(article);

    describe(`BlogPosting — ${article.slug}`, () => {
      it('has @context and @type BlogPosting', () => {
        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('BlogPosting');
      });

      it('has headline', () => {
        expect(schema.headline).toBeTruthy();
      });

      it('has valid datePublished', () => {
        expect(isISODate(schema.datePublished)).toBe(true);
      });

      it('has author with name אושר רווח', () => {
        expect(schema.author?.['@type']).toBe('Person');
        expect(schema.author?.name).toBe('אושר רווח');
      });

      it('has publisher linked to IsraelTechForce', () => {
        expect(schema.publisher?.['@type']).toBe('Organization');
        expect(schema.publisher?.name).toContain('IsraelTechForce');
      });

      it('has valid canonical url', () => {
        expect(isValidUrl(schema.url)).toBe(true);
        expect(schema.url).toContain(`/articles/${article.slug}`);
      });

      it('has description', () => {
        expect(schema.description?.length).toBeGreaterThan(20);
      });

      it('serialises to valid JSON', () => {
        expect(() => JSON.parse(JSON.stringify(schema))).not.toThrow();
      });
    });
  });
});
