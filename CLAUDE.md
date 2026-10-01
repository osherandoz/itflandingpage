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

## Design: the "Signal" system (2026-10)
- Rules and rationale: `DESIGN.md`. Tokens and primitives: `src/styles/system.css`.
  Atoms: `src/components/ui.jsx`. Motion engine: `src/motion/useMotion.js`.
  Reference implementation: the home page.
- Paper + ink + one cobalt accent; WhatsApp green only for the WhatsApp action.
  Heebo variable (300 beside 900 in headings); Frank Ruhl Libre for one quote per page.
- Motion is scroll-driven. Hover changes colour only. No hover transforms, no
  custom cursor, no animated backgrounds, no `backdrop-filter`, no smooth-scroll library.
- No "three equal cards with an icon". Lists are numbered rows; layouts are asymmetric.
- Above the fold never waits for JS (CSS keyframes, not `.m-reveal`).
- Pinned/stacked layouts only at `(min-width: 1024px) and (min-height: 800px)`.
- No Font Awesome, no Google Fonts, no animation library. Icons: `src/components/Icon.jsx`.

## Map
- Routes: `app/routes.js`. Page hierarchy and funnel: `SITE-HIERARCHY.md`.
- Shared chrome: `Navbar`, `Footer`, `FloatingWhatsApp`, `Modal`, `ContactForm` (lead form → `/api/lead`).
- Six service pages share `src/components/ServicePage.jsx` + `src/data/servicePages.js`.
- BMS course funnel: `/bms-sm` (free checklist) → `/תודה-קליסט`; `/VSL-BMS` and
  `/VSL-BMS-V2` (A/B, noindex) → external checkout → `/תודה-רכישה`.
  Product brief for these pages: `PRODUCT.md`.
- Analytics: Meta Pixel in `<head>`; GA4 and Clarity load after the page is idle
  (`app/root.jsx`); CRM click events via `src/utils/track.js`. WhatsApp CTAs carry a
  `location` name via `onWhatsAppClick('<location>')` — keep names stable, reports depend on them.

## Lessons (each one cost time)
- RTL flips signed numbers: wrap `2,500+`, `95%+`, `₪500–3,000` in `<bdi>`.
- A sentence listing Latin brand names reorders itself in RTL; write them in Hebrew.
- `overflow-x: hidden` on `body` breaks `position: sticky`; use `clip`.
- All CSS is global: prefix selectors with the page/component block name.
- The repo lives in OneDrive: the Vite watcher occasionally misses a write. If the
  dev client shows stale markup (hydration mismatch), `touch` the file or restart the server.
- In this shell, two heredocs in one Bash call fail silently. Write files with the editor tools.
- Screenshots from the in-app browser pane time out when the window is hidden;
  use Playwright with `channel: 'chrome'` against the dev server for visual checks.
- Vite inlines only what is imported: importing `@fontsource/*` or Font Awesome in
  one page ships those files site-wide after client navigation. Do not add them back.

## Business facts
IsraelTechForce - ITF Recovery · Osher Revach · Netanya · +972509823235 ·
osher@israeltechforce.com · hours א׳–ו׳ 09:00–16:00 · GA4 `G-M2TYTNN02X` ·
Meta Pixel `1911202046942044` · Vercel project `itflandingpage`.

## Open (needs Osher)
- `/faq` and `/testimonials` CTAs open WhatsApp on `972547274750`, hard-coded and
  untracked; the rest of the site uses `972509823235` via `getWhatsAppUrl`. Which is right?
- `/VSL-BMS-V2` says the video is "4 דקות" in three places; it embeds the same
  10-minute video as V1.
- `/bms-sm` author strip: the old "2,500+ עסקים / 5 שנות ניסיון / 0 חשבונות שאבדו"
  were not in the evidence register (and "0 lost" contradicts 95%); it now shows
  2,500+ / 95%+ / 4.9 from `businessFacts.js`. Revert in `STATS` if the old ones are sourced.
- Em-dashes remain in FAQ answers and schema text (`faqCategories.js`,
  `centralFaqSchema.js`, a few route titles): copy decision.
- `businessFacts.js` still has `source: TODO` on the 2,500 / 95% / 4.9 claims.
- `brand-guidelines.html` predates the Signal system (the `.md` is current).
- Lead-form and newsletter success states have no dedicated thank-you pages.
