# israeltechforce.com — project memory

Read at the start of every session. Update it at the end of every task
("what was decided, what was learned, what is open").

## Working with Osher
- Hebrew for conversation and all site copy; English for code, commits, PRs.
- New branch per piece of work, PR at the end. Never push to `main` directly.
- Before every commit: `npm test`, `npm run lint`, `npm run build` — all green.
- He gives direction and sharp feedback; do the work without narrating it.
- Never invent numbers, clients, testimonials or results. Every public number
  comes from `src/data/businessFacts.js` or copy he approved.
- Passwords, payments, DNS, permanent deletes: his hands, not ours.

## Stack
React 19 · React Router v7 (framework mode, SSR) · Vite 7 · Vitest · Vercel
(`api/ssr.js` serves every page; `api/*.js` are the lead / subscribe / payment endpoints).
Hebrew only, RTL. The English site was removed on 2026-10-01; `/en/*` 308-redirects
to the Hebrew pages (`vercel.json`).

| Command | What |
|---|---|
| `npm run dev -- --port 5199` | Dev server (also `.claude/launch.json`) |
| `npm test` | Vitest (schemas, redirects, funnel pages, payment webhook) |
| `npm run lint` / `npm run build` | ESLint / production build |
| `node scripts/brand-images.mjs` | Regenerate `public/images/brand/*` from the originals |
| `node scripts/og-cards.mjs` | Regenerate the share cards (`public/images/og/*`, one per page) after adding a page or article (a test fails if one is missing). Needs Chrome + global `@playwright/cli` |
| `node scripts/build-article-index.mjs` | Regenerate `src/data/articleIndex.js` after adding or editing an article (a test fails if it is stale) |

## Design: Obsidian emergency system (2026-10-20, from ITF-Landing-VSL-Spec.md)
- The spec file (`Downloads/ITF-Landing-VSL-Spec.md`) is the source of truth for the home page and `/VSL-BMS`. Tokens: `src/styles/system.css`.
- 60-30-10: Obsidian `#090d16` base, slate cards `#131b2e`/`#1e293b`, emerald `#10b981` accent (WhatsApp `#22c55e`), coral `#ef4444` for danger only. Whole site is dark; `.theme-*` classes only change depth.
  Text on the accent uses `--on-signal`, never white (contrast).
- Heebo variable (replaced Rubik). Home order: header (live status + call + WhatsApp) > hero (platform picker) > proof strip > bento services > 3 steps > about > testimonials > FAQ > conversion hub (WhatsApp + 3-field form). No articles section, no guide links on home.
- Mobile: `FloatingWhatsApp` is a two-button bar (call + WhatsApp) at every scroll depth.
- VSL: spec headline, 297 ILS with 997 value anchor, 14-day refund, syllabus bento, purchase button revealed at `OFFER_AT_SECONDS` (placeholder 360, set the real timestamp).
- Older Signal rules (no hover transforms, no animated backgrounds, no `backdrop-filter`, Above the fold never waits for JS) still apply.

## Map
- Routes: `app/routes.js`. Page hierarchy and funnel: `SITE-HIERARCHY.md`.
- Shared chrome: `Navbar`, `Footer`, `FloatingWhatsApp`, `Modal`, `ContactForm` (lead form → `/api/lead`).
- Six service pages share `src/components/ServicePage.jsx` + `src/data/servicePages.js`.
  Each carries a `notice`: the block message drawn in CSS (an illustration, labelled as one, not a screenshot).
- Every lead form (`ContactForm`) lands on `/תודה` (noindex) once the server confirms; the Lead event still fires in the form.
- BMS course funnel: `/bms-sm` (free checklist; the `-v2` variant was removed 2026-10-20, redirects here) → `/תודה-קליסט`;
  `/VSL-BMS` → checkout (opens in an on-page dialog, Green Invoice link) → `/תודה-רכישה`. `/akamol` = 19.90 ILS PDF bundle
  (`src/pages/Akamol.jsx`; Grow link, covers, chat proof live in `src/data/akamol.js`).
  Product brief for these pages: `PRODUCT.md`.
- Analytics: the fbq / gtag / clarity queues are created in `<head>`; the three libraries load on the
  visitor's first touch, scroll or key press, or 4s after load (`app/root.jsx`). Events queue and fire in order; CRM click events via `src/utils/track.js`. WhatsApp CTAs carry a
  `location` name via `onWhatsAppClick('<location>')` — keep names stable, reports depend on them.

## Lessons (each one cost time)
- Local Lighthouse numbers are only comparable when `environment.benchmarkIndex` in the report
  is similar; on battery this laptop benchmarks about 3x slower and every score drops ~20 points.
- RTL flips signed numbers: wrap `2,500+`, `95%+`, `₪500–3,000` in `<bdi>`.
- A sentence listing Latin brand names reorders itself in RTL; write them in Hebrew.
- `overflow-x: hidden` on `body` breaks `position: sticky`; use `clip`.
- All CSS is global: prefix selectors with the page/component block name.
- Home sections below the fold use `content-visibility: auto` (`Home.css`). Their heights are
  estimates until first render, so any new in-page jump must re-aim after scrolling, the way
  `Navbar.jsx` does. Do not put it on a section with a pinned stack.
- The home page reads article cards from the generated `articleIndex.js`, never from `articles.js`
  (that file carries every article body, 85KB).
- The repo lives in OneDrive: the Vite watcher occasionally misses a write. If the
  dev client shows stale markup (hydration mismatch), `touch` the file or restart the server.
- In this shell, two heredocs in one Bash call fail silently. Write files with the editor tools.
- Screenshots from the in-app browser pane time out when the window is hidden;
  use Playwright with `channel: 'chrome'` against the dev server for visual checks.
- Vite inlines only what is imported: importing `@fontsource/*` or Font Awesome in
  one page ships those files site-wide after client navigation. Do not add them back.

- PageSpeed (lab) estimates LCP from everything that started before the first paint it observed. The
  Meta Pixel used to start within 2s and inflated mobile LCP to 6.9s on a page whose text paints at
  first paint. Third-party scripts must not start before interaction / 4s after load.
- An animated `background-size` repaints its text; the hero marker animates a pseudo-element's transform instead.

## Business facts
IsraelTechForce - ITF Recovery · Osher Revach · Netanya · +972509823235 ·
osher@israeltechforce.com · hours א׳–ו׳ 09:00–16:00 · GA4 `G-M2TYTNN02X` ·
Meta Pixel `1911202046942044` · Vercel project `itflandingpage`.

## Decided (2026-10-01)
- The only WhatsApp number is `972509823235`, always through `getWhatsAppUrl` + `onWhatsAppClick('<location>')`. Never hard-code a number in a page.
- The VSL video is 10 minutes, on both variants.
- `/bms-sm` author stats come from `businessFacts.js` (2,500+ / 95%+). The 4.9 rating was removed from `/bms-sm` on 2026-10-19: no review source.
- V2 uses system markers (numbers, check discs, stickers), no emoji.

## Decided (2026-10-10, branch `redesign/banger-2026-10`)
- Home hero rebuilt: oversized promise, case picker that prefills the WhatsApp message, one-shot
  "disabled → restored" entrance, cobalt press tape. Details in `DESIGN.md` 6b.
- Site-wide: heading scale raised (`.display` 96, `.h1` 76, `.h2` 48 at 1440), new `theme-signal`
  (cobalt-drenched sections), footer closing CTA is a cobalt panel on every page.
- BMS funnel (Osher asked, same day): `/bms-sm` final form section, V1 "the statement" and V2
  `#final-cta` are `theme-signal`; VSL hero title 32-60. Applied to both VSL variants alike.

## Decided (2026-10-12, branch `rebrand/midnight`)
- Palette is "Midnight": ink `#0a1128`, ink-2 `#14213d`, cobalt `#1f4dff`, mist `#dce7f7`, white.
  The cream paper is gone (`--paper` and `--white` are both `#ffffff`). Osher found the site too colourful.
- One cobalt-drenched section per page. Footer CTA panel and the lead testimonial are ink again.
- Share cards regenerated with `node scripts/og-cards.mjs`.

## Decided (2026-10-12, tracking)
- The Meta pixel posts events to `https://www.facebook.com/tr/` as a form. `form-action 'self'`
  (added 2026-08-09) blocked every event in desktop Chrome; `form-action` now allows facebook.com.
  Verified in headed Chrome against production with the header rewritten: PageView and ViewContent
  return 200. Headless Chrome never sends pixel events, so test tracking headed.
- One Clarity project site-wide: `x8uz4h0y6b` (root.jsx). The page-only `y6a94mrf1u` tag on
  `/VSL-BMS` is removed; filter by URL inside Clarity instead.
- Pixel events: PageView everywhere; Lead on the three forms; ViewContent on `/bms-sm` and both VSLs;
  InitiateCheckout on VSL checkout links; Contact on every WhatsApp click (`trackWhatsAppClick`);
  Purchase only server-side from the payment webhook (needs `META_CAPI_ACCESS_TOKEN` in Vercel).

## Decided (2026-10-12, ideas taken from benady.co.il at Osher's request)
- Service cards open with the visitor's own sentence (`say`), the service name sits under it.
  The six `say` lines are mine, derived from each card's existing copy: Osher to approve.
- About: three checkable credentials (`CREDENTIALS`) replaced the four generic icon claims.
- How it works carries a "what this is not" note (no promised date; matches `typicalTurnaround`).
- The services stack pins only at min-height 860px now (card heads are 80px).

## Decided (2026-10-19, brief `itf-landing-pages-brief.md`)
- `/VSL-BMS` lost the "שווי אמיתי ₪638" line and all "ערך ₪" labels; a Lilach line sits above the price. `SlotNumber`
  renders the final number as plain text on the server (digit strips mount after hydration).
- One VSL only: `/VSL-BMS-V2` was removed 2026-10-20 and redirects to `/VSL-BMS`.
- `/akamol` ships with the Grow link empty: buy buttons open WhatsApp until `GROW_AKAMOL_URL` is set. Covers and
  the chat-proof screenshot stay unrendered until supplied (the screenshot also needs the client's consent).

## Open (needs Osher)
- `/akamol`: `GROW_AKAMOL_URL`, three PDF covers (hero + og:image), WhatsApp screenshot + client consent. Do not send paid traffic before the link is in.
- The pixel's config also tries two Meta-run hosts (`*.us-central1.run.app/events`,
  `*.ecs.us-west-2.on.aws/events`); the CSP blocks them. Meta reports the dataset's gateway as
  NOT_ONBOARDED, so they are not Osher's: leave them blocked.
- Em-dashes remain in FAQ answers and schema text (`faqCategories.js`,
  `centralFaqSchema.js`, a few route titles): copy decision.
- `businessFacts.js` still has `source: TODO` on the 2,500 / 95% / 4.9 claims.
- `brand-guidelines.html` predates the Signal system (the `.md` is current).
- The newsletter success state has no dedicated thank-you page (the lead form has `/תודה` since 2026-10-02).
- Service-page `notice` wording is from the site's own copy, not verified against Meta's current Hebrew UI: Osher to correct.
- Waiting on Osher: client proof screenshots (Instagram highlights), photo originals (Drive folder "אושר רווח - צילומי תדמית", too large for the Drive connector), press logos (download permission + sources).
