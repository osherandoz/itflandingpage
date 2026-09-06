# Claude Session Memory — IsraelTechForce Landing Page
**Last updated:** 2026-04-17  
**Project path:** `C:\Users\osher\OneDrive\Desktop\ניהול עסק\פרויקטים חדשים\landingpage`  
**GitHub repo:** `https://github.com/osherandoz/itflandingpage`  
**Live domain:** `https://www.israeltechforce.com`  
**Vercel project:** `itflandingpage` (osherandoz-projects)

---

## Tech Stack
- React 19 + Vite 7 + **React Router v7** (framework mode, SSR enabled)
- `@vercel/react-router` with `vercelPreset()` — Build Output API
- Vitest for unit tests (`npm test` → 82 tests)
- Hebrew RTL site (`lang="he" dir="rtl"`)
- Deployed on Vercel with Framework Preset = **"React Router"**

---

## Key File Map
| File | Purpose |
|---|---|
| `app/root.jsx` | HTML shell, global schemas (LocalBusiness + 6 Services), GA4, Meta Pixel |
| `app/routes.js` | Route definitions: home, privacy, press, articles/:slug |
| `app/routes/home.jsx` | FAQPage schema + home meta |
| `app/routes/press.jsx` | NewsArticle schemas + press meta |
| `app/routes/articles.$slug.jsx` | BlogPosting schema + per-article meta |
| `src/data/schemas.js` | **Single source of truth** for LocalBusiness, 6 Service schemas, buildBlogPostingSchema() |
| `src/data/faqSchema.js` | FAQPage schema data |
| `src/data/pressSchemas.js` | buildNewsArticleSchema() builder |
| `src/data/press.js` | Press items data (Ynet 2022, ערוץ הכלכלה 2025) + community groups |
| `src/data/articles.js` | All article slugs and content |
| `src/__tests__/schema.test.js` | 82 Vitest schema unit tests |
| `vercel.json` | Currently: `{}` (empty — let vercelPreset handle everything) |
| `react-router.config.js` | SSR: true + vercelPreset() |

---

## Business Info (for schemas/GMB)
- **Business name:** IsraelTechForce - ITF Recovery
- **Phone:** +972509823235
- **Email:** info@poncho.tech
- **Address:** Netanya, Israel (32.3215, 34.8532)
- **Facebook Business page:** facebook.com/israeltechforce23
- **Facebook Personal:** facebook.com/OsheRevach23
- **Instagram:** instagram.com/osher_revach_1
- **TikTok:** tiktok.com/@israeltechforce
- **GA4 ID:** G-M2TYTNN02X
- **Meta Pixel ID:** 1911202046942044
- **Google Search Console verification:** `aE9CLpD9QGwjrSkACJUNpS8Ps8vCkLxMuP9jRl3v_aM`
- **Rating:** 4.9/5 | 2,500+ accounts recovered

---

## What Was Done (completed ✅)

### Phase A — SSR Migration
- Migrated from Vite CSR → React Router v7 SSR
- `app/root.jsx` — full HTML shell with all head tags
- `app/entry.client.jsx` — HydratedRouter for hydration
- All routes use `meta()` exports for per-page SEO
- CLS fix on hero logo (intrinsic width/height + fetchPriority="high")
- Sitemap updated with article slugs

### Phase B — Analytics + Press + Schema
- GA4 (G-M2TYTNN02X) + Meta Pixel (1911202046942044) added
- `generate_lead` event on contact form submit
- Press section created: `/press` page + `PressSection` strip on home
- PressSection redesigned: dark bg (`#0C0E1D`), bigger cards, vertical layout
- FAQPage + NewsArticle JSON-LD schemas added
- Google Search Console verification meta tag added

### Schema Markup (feature/schema-markup — merged to main)
- **LocalBusiness**: added `@id`, `logo`, `aggregateRating` (4.9/5 × 2500), `www.` canonical, business FB page
- **Service × 6**: individual schema per service (WhatsApp, Instagram, Facebook, Login, BizMgr, Ads)
- **FAQPage**: extracted to `src/data/faqSchema.js`
- **NewsArticle**: added `image` field, extracted to `src/data/pressSchemas.js`
- **BlogPosting**: NEW — injected on every real article page
- Vitest installed, 82 tests written and passing

### Popups Removed (feature/remove-popups — merged to main)
- Privacy Policy consent popup removed from root
- WhatsApp disabled popup removed from root
- Visitors land directly on page with no interruptions
- SSR bundle shrank ~15KB as side effect

---

## Vercel Deployment — CRITICAL NOTES
- **Framework Preset must be "React Router"** (not Vite, not Other)
- **Output Directory override must be OFF** (blank, grey toggle)
- **Build Command:** `npm run build`
- `vercelPreset()` writes `.vercel/react-router-build-result.json` during build
- Vercel CLI reads that file (only when framework = React Router) and creates `.vercel/output/`
- If all routes return 404, check Framework Preset first
- `vercel.json` should stay as `{}` — no outputDirectory, no framework overrides

---

## Pending / Next Steps
- [x] **GMB (Google My Business)**: Created ✅ — URL: `https://share.google/yNPb3RHHkfrk8sxNa` added to `sameAs`
  - When listing is indexed, replace share URL with stable `maps.google.com/?cid=...` URL
- [ ] **Search Console**: Verify ownership (meta tag is live), then submit `sitemap.xml`
- [ ] **Schema validation**: validator.schema.org → paste www.israeltechforce.com
- [ ] **Rich Results Test**: search.google.com/test/rich-results
- [ ] **Vercel 404 bug**: May still be present if Framework Preset wasn't saved correctly — check live site

---

## User Preferences / Working Style
- Always work on a **new branch** per feature (`feature/xxx`)
- Run **`npm test`** before every commit — must be green
- Run **`npm run build`** before every commit — must pass
- **Commit + push** after every completed feature
- Tests use **Vitest** (`npm test` = `vitest run`)
- User speaks Hebrew — respond in **English** for code/technical, Hebrew ok for content
- User wants to be asked what info is needed before implementing
- No major unsolicited UI changes

---

## 2026-09-06 — Website audit fixes (branch `feature/audit-2026-09`)
Implemented from `ITF-Website-Audit-2026-09-06.md` (P0/P1 + cheap P2). Key facts:
- **New env vars (Vercel):** `LEAD_WEBHOOK_SECRET` (must equal Apps Script property `LEAD_SECRET`),
  `KV_REST_API_URL` + `KV_REST_API_TOKEN` (Upstash Redis from Vercel Marketplace — durable rate-limit/idempotency;
  without them `api/_lib/store.js` falls back to per-instance memory), optional `PAYMENT_OK_STATUSES`,
  `BMS_PRICE_ILS` (default 197), `BMS_PRODUCT_MATCH`.
- **Webhook is now strict:** only paid + 197 ILS events enroll; refunds/failed are acknowledged and ignored; replays
  are no-ops. Verify with one real Green Invoice sandbox payload — if its field names differ, adjust `validatePayment()`.
- **Apps Script must be redeployed** from `google-apps-script-code.js` (POST only, secret check, leadId column E,
  source col F, note col G). Old script keeps working until then (proxy sends form-encoded POST).
- **Dashboard route deleted** (was public). Build artifacts (`.react-router/`, `.vercel/`) untracked.
- **Claims:** availability now "א׳–ו׳ 08:00–22:00" everywhere (from `src/data/businessFacts.js`, matches schema).
  If the real schedule differs, change `businessFacts.js` + `schemas.js` + the literal copies flagged there.
- Not done (needs content from Osher): author/about page, 3 case studies, newsletter sample/archive, homepage
  portrait redesign, nav simplification, sitemap dateModified workflow, Meta CAPI server purchase event.
