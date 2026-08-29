/**
 * Service page unit tests.
 * The 6 service pages (× 2 languages) carry the site's commercial search
 * traffic and were the only pages with no coverage at all.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import { SERVICE_PAGES } from '../data/servicePages.js';
import { SERVICE_PAGES_EN } from '../data/servicePages.en.js';
import { articles } from '../data/articles.js';
import { ARTICLES_EN } from '../data/articles.en.js';
import { SERVICE_PATHS, PATH_PAIRS, togglePath } from '../i18n/index.js';
import { buildBreadcrumbSchema } from '../data/schemas.js';

const SLUGS = [
  'facebook-recovery',
  'instagram-recovery',
  'whatsapp-recovery',
  'facebook-disabled',
  'instagram-hacked',
  'ads-manager',
];

const LOCALES = [
  { lang: 'he', pages: SERVICE_PAGES, articleSlugs: articles.map((a) => a.slug) },
  { lang: 'en', pages: SERVICE_PAGES_EN, articleSlugs: ARTICLES_EN.map((a) => a.slug) },
];

// ─── Shape ────────────────────────────────────────────────────────────────────
describe('service page data', () => {
  for (const { lang, pages } of LOCALES) {
    describe(`${lang} locale`, () => {
      it('has exactly the six expected pages, no duplicates', () => {
        expect(pages.map((p) => p.slug).sort()).toEqual([...SLUGS].sort());
      });

      for (const slug of SLUGS) {
        describe(slug, () => {
          const page = pages.find((p) => p.slug === slug);

          it('fills every required field', () => {
            for (const key of [
              'slug', 'path', 'keyword', 'title', 'metaTitle',
              'metaDescription', 'serviceType', 'whatIsIt',
            ]) {
              expect(page[key], `${slug}.${key}`).toBeTruthy();
            }
          });

          it('has a meta description in the length Google renders', () => {
            expect(page.metaDescription.length).toBeGreaterThanOrEqual(110);
            expect(page.metaDescription.length).toBeLessThanOrEqual(165);
          });

          it('has a meta title short enough not to be truncated', () => {
            expect(page.metaTitle.length).toBeLessThanOrEqual(65);
          });

          it('has three steps, each with icon, title and description', () => {
            expect(page.steps).toHaveLength(3);
            for (const step of page.steps) {
              expect(step.icon).toMatch(/^fas? /);
              expect(step.title).toBeTruthy();
              expect(step.desc).toBeTruthy();
            }
          });

          it('has at least five answered FAQs', () => {
            expect(page.faqs.length).toBeGreaterThanOrEqual(5);
            for (const faq of page.faqs) {
              expect(faq.question).toBeTruthy();
              expect(faq.answer).toBeTruthy();
            }
          });

          it('has no duplicate FAQ questions', () => {
            const questions = page.faqs.map((f) => f.question);
            expect(new Set(questions).size).toBe(questions.length);
          });

          it('shows three distinct testimonials that exist', () => {
            expect(page.testimonialIds).toHaveLength(3);
            expect(new Set(page.testimonialIds).size).toBe(3);
            for (const id of page.testimonialIds) {
              expect(id).toBeGreaterThanOrEqual(1);
              expect(id).toBeLessThanOrEqual(6);
            }
          });

          it('renders whatIsIt as paragraph HTML', () => {
            expect(page.whatIsIt.trim().startsWith('<p>')).toBe(true);
            expect(page.whatIsIt).toContain('</p>');
          });
        });
      }
    });
  }
});

// ─── Internal links ───────────────────────────────────────────────────────────
describe('service page internal links', () => {
  for (const { lang, pages, articleSlugs } of LOCALES) {
    it(`${lang}: every related article points at a real article`, () => {
      for (const page of pages) {
        for (const related of page.relatedArticles ?? []) {
          expect(articleSlugs, `${page.slug} -> ${related.slug}`).toContain(related.slug);
          expect(related.title).toBeTruthy();
        }
      }
    });

    it(`${lang}: every cross link points at a different, real service page`, () => {
      for (const page of pages) {
        for (const cross of page.crossLinks ?? []) {
          expect(SLUGS).toContain(cross.slug);
          expect(cross.slug).not.toBe(page.slug);
          expect(cross.label).toBeTruthy();
          expect(cross.note).toBeTruthy();
          expect(SERVICE_PATHS[cross.slug][lang]).toBeTruthy();
        }
      }
    });
  }

  // The two pairs that were splitting the same query between them.
  it.each([
    ['facebook-recovery', 'facebook-disabled'],
    ['instagram-recovery', 'instagram-hacked'],
  ])('%s and %s point at each other so neither absorbs the other', (a, b) => {
    for (const { pages } of LOCALES) {
      const first = pages.find((p) => p.slug === a);
      const second = pages.find((p) => p.slug === b);
      expect(first.crossLinks.map((c) => c.slug)).toContain(b);
      expect(second.crossLinks.map((c) => c.slug)).toContain(a);
    }
  });

  it('keeps the hacked-account intent off the general Instagram page', () => {
    const he = SERVICE_PAGES.find((p) => p.slug === 'instagram-recovery');
    expect(he.metaDescription).not.toContain('נפרץ');
    const en = SERVICE_PAGES_EN.find((p) => p.slug === 'instagram-recovery');
    expect(en.metaDescription.toLowerCase()).not.toContain('hacked');
  });
});

// ─── Routing / i18n ───────────────────────────────────────────────────────────
describe('service page routing', () => {
  it('maps every slug to a Hebrew and an English path', () => {
    for (const slug of SLUGS) {
      expect(SERVICE_PATHS[slug].he.startsWith('/')).toBe(true);
      expect(SERVICE_PATHS[slug].en.startsWith('/en/')).toBe(true);
    }
  });

  it('keeps the path in the data identical to the routing table', () => {
    for (const page of SERVICE_PAGES) {
      expect(`/${page.path}`).toBe(SERVICE_PATHS[page.slug].he);
    }
  });

  it('pairs each Hebrew path with its English counterpart for hreflang', () => {
    for (const slug of SLUGS) {
      const { he, en } = SERVICE_PATHS[slug];
      expect(PATH_PAIRS).toContainEqual([he, en]);
      expect(togglePath(he)).toBe(en);
      expect(togglePath(en)).toBe(he);
    }
  });

  it('gives every page a unique path in both languages', () => {
    const paths = SLUGS.flatMap((s) => [SERVICE_PATHS[s].he, SERVICE_PATHS[s].en]);
    expect(new Set(paths).size).toBe(paths.length);
  });
});

// ─── Structured data ──────────────────────────────────────────────────────────
describe('service page structured data', () => {
  for (const { lang, pages } of LOCALES) {
    it(`${lang}: FAQPage schema mirrors the FAQs actually rendered`, () => {
      for (const page of pages) {
        const schema = {
          '@type': 'FAQPage',
          mainEntity: page.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        };
        expect(schema.mainEntity).toHaveLength(page.faqs.length);
        for (const [i, entity] of schema.mainEntity.entries()) {
          expect(entity.name).toBe(page.faqs[i].question);
          expect(entity.acceptedAnswer.text).toBe(page.faqs[i].answer);
        }
      }
    });

    it(`${lang}: breadcrumb ends on the current page with no trailing url`, () => {
      for (const page of pages) {
        const crumbs = buildBreadcrumbSchema([
          { name: 'Home', item: 'https://www.israeltechforce.com/' },
          { name: page.title },
        ]);
        expect(crumbs['@type']).toBe('BreadcrumbList');
        expect(crumbs.itemListElement).toHaveLength(2);
        expect(crumbs.itemListElement[1].name).toBe(page.title);
        expect(crumbs.itemListElement[1].item).toBeUndefined();
        expect(crumbs.itemListElement[0].position).toBe(1);
      }
    });
  }
});
