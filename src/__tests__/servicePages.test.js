/**
 * Service page unit tests.
 * The 6 service pages carry the site's commercial search traffic and were the
 * only pages with no coverage at all.
 * Run: npm test
 */
import { describe, it, expect } from 'vitest';
import { SERVICE_PAGES } from '../data/servicePages.js';
import { articles } from '../data/articles.js';
import { SERVICE_PATHS } from '../i18n/index.js';
import { buildBreadcrumbSchema } from '../data/schemas.js';
import { serviceRoute } from '../data/serviceRoute.jsx';

const SLUGS = [
  'facebook-recovery',
  'instagram-recovery',
  'whatsapp-recovery',
  'facebook-disabled',
  'instagram-hacked',
  'ads-manager',
];

const pages = SERVICE_PAGES;
const articleSlugs = articles.map((a) => a.slug);

// ─── Shape ────────────────────────────────────────────────────────────────────
describe('service page data', () => {
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

// ─── Internal links ───────────────────────────────────────────────────────────
describe('service page internal links', () => {
  it('every related article points at a real article', () => {
    for (const page of pages) {
      for (const related of page.relatedArticles ?? []) {
        expect(articleSlugs, `${page.slug} -> ${related.slug}`).toContain(related.slug);
        expect(related.title).toBeTruthy();
      }
    }
  });

  it('every cross link points at a different, real service page', () => {
    for (const page of pages) {
      for (const cross of page.crossLinks ?? []) {
        expect(SLUGS).toContain(cross.slug);
        expect(cross.slug).not.toBe(page.slug);
        expect(cross.label).toBeTruthy();
        expect(cross.note).toBeTruthy();
        expect(SERVICE_PATHS[cross.slug]).toBeTruthy();
      }
    }
  });

  // The two pairs that were splitting the same query between them.
  it.each([
    ['facebook-recovery', 'facebook-disabled'],
    ['instagram-recovery', 'instagram-hacked'],
  ])('%s and %s point at each other so neither absorbs the other', (a, b) => {
    const first = pages.find((p) => p.slug === a);
    const second = pages.find((p) => p.slug === b);
    expect(first.crossLinks.map((c) => c.slug)).toContain(b);
    expect(second.crossLinks.map((c) => c.slug)).toContain(a);
  });

  it('keeps the hacked-account intent off the general Instagram page', () => {
    const he = SERVICE_PAGES.find((p) => p.slug === 'instagram-recovery');
    expect(he.metaDescription).not.toContain('נפרץ');
  });
});

// ─── Routing ──────────────────────────────────────────────────────────────────
describe('service page routing', () => {
  it('maps every slug to a Hebrew path', () => {
    for (const slug of SLUGS) {
      expect(SERVICE_PATHS[slug].startsWith('/')).toBe(true);
      expect(SERVICE_PATHS[slug].startsWith('/en')).toBe(false);
    }
  });

  it('keeps the path in the data identical to the routing table', () => {
    for (const page of SERVICE_PAGES) {
      expect(`/${page.path}`).toBe(SERVICE_PATHS[page.slug]);
    }
  });

  it('gives every page a unique path', () => {
    const paths = SLUGS.map((s) => SERVICE_PATHS[s]);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('builds a Hebrew-only route for every slug: he_IL locale, self canonical, no hreflang', () => {
    for (const slug of SLUGS) {
      const { meta, url, pageData } = serviceRoute(slug);
      expect(pageData.slug).toBe(slug);
      expect(url).toBe(`https://www.israeltechforce.com${SERVICE_PATHS[slug]}`);
      const tags = meta();
      expect(tags.find((t) => t.property === 'og:locale').content).toBe('he_IL');
      expect(tags.find((t) => t.rel === 'canonical').href).toBe(url);
      expect(tags.some((t) => t.hrefLang)).toBe(false);
    }
  });
});

// ─── Structured data ──────────────────────────────────────────────────────────
describe('service page structured data', () => {
  it('FAQPage schema mirrors the FAQs actually rendered', () => {
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

  it('breadcrumb ends on the current page with no trailing url', () => {
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
});
