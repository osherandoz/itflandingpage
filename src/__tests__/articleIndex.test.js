// The home page reads article cards from a generated index instead of the
// full article bodies. This fails when the index falls behind articles.js.
import { describe, it, expect } from 'vitest';
import { articles, getRecentArticles } from '../data/articles.js';
import { articleIndex, getRecentArticleCards } from '../data/articleIndex.js';
import { toIndex } from '../../scripts/build-article-index.mjs';

describe('article index', () => {
  it('matches articles.js (run: node scripts/build-article-index.mjs)', () => {
    expect(articleIndex).toEqual(toIndex(articles));
  });

  it('carries no article bodies', () => {
    for (const card of articleIndex) expect(card).not.toHaveProperty('content');
  });

  it('picks the same recent articles as the full data', () => {
    expect(getRecentArticleCards(3).map((a) => a.slug)).toEqual(getRecentArticles(3).map((a) => a.slug));
  });
});
