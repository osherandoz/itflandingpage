// The whole motion engine. No library: one IntersectionObserver for reveals,
// one passive scroll listener for scroll-linked progress. Class contract lives
// in src/styles/system.css ("Motion primitives").
//
//   .m-in / .m-reveal / .m-stagger  → gets .is-in once, when it enters view
//   .m-marquee                      → .is-in toggles, so it pauses off screen
//   [data-scrub]                    → --p goes 0 → 1 as it crosses the viewport
//
// Elements that mount later (lazy sections, route changes) are picked up by a
// MutationObserver, so components never register themselves.
import { useEffect } from 'react';

const ONCE = '.m-in, .m-reveal, .m-stagger';
const TOGGLE = '.m-marquee';
const SCRUB = '[data-scrub]';

// Progress of an element through the viewport: 0 when its top reaches the
// `start` line (fraction of viewport height from the top), 1 when its bottom
// reaches the `end` line.
export function scrubProgress(top, height, vh, start = 0.85, end = 0.45) {
  const total = height + vh * (start - end);
  if (total <= 0) return 1;
  return Math.min(1, Math.max(0, (vh * start - top) / total));
}

export function useMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      // Final state everywhere; CSS already neutralises the transitions.
      const settle = () => {
        document.querySelectorAll(`${ONCE}, ${TOGGLE}`).forEach((el) => el.classList.add('is-in'));
        document.querySelectorAll(SCRUB).forEach((el) => el.style.setProperty('--p', '1'));
      };
      settle();
      const mo = new MutationObserver(settle);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const seen = new WeakSet();
    const scrubbing = new Set();
    let frame = 0;

    const once = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          once.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    const toggle = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('is-in', e.isIntersecting);
    });

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of scrubbing) {
        const r = el.getBoundingClientRect();
        // "start end" as viewport fractions; a missing or non-numeric part keeps the default
        const [start, end] = (el.dataset.scrub || '').split(' ').map((v) => (v === '' || Number.isNaN(Number(v)) ? undefined : Number(v)));
        const p = scrubProgress(r.top, r.height, vh, start, end);
        el.style.setProperty('--p', p.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame && scrubbing.size) frame = requestAnimationFrame(update);
    };

    // Only elements near the viewport are measured on scroll.
    const near = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) scrubbing.add(e.target);
          else scrubbing.delete(e.target);
        }
        onScroll();
      },
      { rootMargin: '20% 0px 20% 0px' }
    );

    const scan = () => {
      document.querySelectorAll(ONCE).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        once.observe(el);
      });
      document.querySelectorAll(TOGGLE).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        toggle.observe(el);
      });
      document.querySelectorAll(SCRUB).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        near.observe(el);
      });
    };

    scan();
    root.classList.add('motion-ready');

    let scanQueued = false;
    const mo = new MutationObserver(() => {
      if (scanQueued) return;
      scanQueued = true;
      requestAnimationFrame(() => {
        scanQueued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      once.disconnect();
      toggle.disconnect();
      near.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
