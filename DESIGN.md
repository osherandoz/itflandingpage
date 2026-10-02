# ITF "Signal" design system

One system for every page of israeltechforce.com: home, the six service pages,
articles, FAQ, testimonials, press, author, newsletter, privacy and the BMS
funnel (lead magnet, both VSL variants, both thank-you pages).

Source of truth in code: `src/styles/system.css` (tokens, primitives),
`src/components/ui.jsx` (shared atoms), `src/motion/useMotion.js` (motion engine).
The home page (`src/pages/Home.jsx` and the components it renders) is the
reference implementation. When in doubt, copy what it does.

## 1. What we took from the Mendy Media build guide, and what we left

| Adopted | Why |
|---|---|
| Design system before pages: tokens, fluid type, base classes | Every page changes by editing one file |
| Editorial type: weight 300 next to 900 in one headline | Looks designed, costs nothing |
| `(01) ——— label` eyebrows, parenthesised kickers | Orientation without decoration |
| Pill buttons with a separate arrow disc | One recognisable action shape |
| Cards with radius 32, a tag and a number; stickers with a hard shadow | Brand texture that is not a stock card |
| Thin square grid background, a marker swipe behind one phrase | Brand texture |
| Scroll-driven motion only; hover changes colour, never position | Phones have no hover; motion follows the reader |
| No "three equal cards"; asymmetric layouts | The most recognisable AI-template tell |
| Real numbers only, set large | Credibility |
| Check every change at 390 / 768 / 1024 / 1440, no sideways scroll, one H1 | Most traffic is mobile, from Facebook ads |
| Performance rules: `font-display: swap` + preload, no `backdrop-filter`, no animated backgrounds, lazy media, `overflow-x: clip` | Measured wins in the guide |
| Pin/stack only on wide **and** tall viewports | Pinned stacks make a phone page endless |
| Mobile menu as a side drawer (86vw, max 400px), not full screen | Rejected full-screen menu in the guide |
| A regular form with well-made fields | Three "creative" forms were rejected in the guide |

| Rejected | Why |
|---|---|
| GSAP + ScrollTrigger + SplitText + Lenis from a CDN | ~70KB of JS and a third-party origin for effects CSS and 120 lines of JS do here. Smooth-scroll libraries also felt bad in the guide itself |
| Looping intro video in the hero | The guide's own mobile Lighthouse was 86-93; our LCP is text |
| Custom cursor, magnetic buttons, tilt on hover | Removed in the guide after feedback; we had tilt cards, they are gone |
| Animated grid background | "Headache" in the guide |
| Hidden H1 for keywords | The visible headline is the H1 |
| Their palette (navy, lime, cream) and fonts | "Too similar to the inspiration" is a failure; ITF keeps its own blue |
| A floating "stop motion" button | `prefers-reduced-motion` covers it |

## 2. Colour

Paper and ink, one cobalt accent, WhatsApp green for the one action.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0b1524` | Text, dark sections |
| `--ink-2` / `--ink-3` | `#13233b` / `#1d3454` | Cards and borders on ink |
| `--paper` | `#f5f2ea` | Page background |
| `--white` | `#fffdf8` | Card surface on paper |
| `--mist` | `#dce7f7` | Pale blue section or card |
| `--wave` | `#b9cdf2` | Accent text on ink |
| `--signal` | `#1f4dff` | The accent: markers, active states, form submit |
| `--signal-soft` | `#c9d6ff` | Marker on paper |
| `--go` | `#25d366` | WhatsApp CTA only |
| `--alert` / `--ok` | `#d93a3f` / `#128a4a` | Errors, success |

Components never use palette tokens for text and surfaces directly. They use the
semantic set `--bg --surface --fg --fg-2 --fg-3 --line --line-soft --mk --accent`,
and a section flips all of them by adding `theme-ink`, `theme-mist` or `theme-paper`.

Rhythm: every page opens dark. The header and the first screen (hero) are
`theme-ink`; below that, sections alternate paper, mist and ink. Light cards
inside a dark hero (forms, proof panels, chips) carry `theme-paper` so their
text tokens flip back. Reading pages without a hero (privacy, thank-you) stay on paper.

Rules:
- Too dark and too loud both fail. Big surfaces are paper, mist or ink; `--signal`
  and `--go` are for emphasis and action. No full section in signal or green.
- One primary (green) CTA per view.
- No gradients on text. No glows. Shadows are tinted and rare.
- `--fg-3` is the lightest text allowed (contrast AA on paper, mist and ink).

## 3. Type

One family, Heebo variable (self-hosted, preloaded). Frank Ruhl Libre appears
once per page at most, for an emotional quote (`.serif`).

| Class | Size (375 → 1440) | Weight | Line height |
|---|---|---|---|
| `.display` | 40 → 72 | 900 | 1.08 |
| `.h1` | 34 → 56 | 900 | 1.12 |
| `.h2` | 28 → 40 | 900 | 1.18 |
| `.h3` | 22 → 28 | 800 | 1.25 |
| `.lead` | 18 → 22 | 400 | 1.55 |
| body | 17 → 19 | 400 | 1.6 |
| `.small` | 14 → 15 | 400-700 | 1.6 |

- The editorial move: `<span class="lt">light phrase</span> black phrase` inside one heading.
- No negative letter-spacing on Hebrew. No uppercase tricks.
- Text blocks are start-aligned and capped at `--measure` (62ch). No centred paragraphs.
- Numbers that carry a sign or unit (`2,500+`, `95%+`, `₪500–3,000`) go inside `<bdi>` so RTL does not flip them.
- Prefer Hebrew spellings for runs of brand names in a sentence; mixed-direction lists reorder themselves.

## 4. Space and shape

- Section padding `--section` (72 → 120). Gutter `--gutter` (20 → 40). Container 1200, narrow 760.
- Component spacing from the 4px scale only: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Radius: `--r-lg` (24 → 32) cards, `--r-md` 20 inner cards, `--r-sm` 12 stickers, pill for buttons and tags.
- Forms max 560px wide; fields 56px tall, 16px+ text (no iOS zoom).

## 5. Components

- **Buttons** `.btn` + `.btn--go | --signal | --ink | --paper | --ghost`, optional `.btn--sm`, `.btn--block`, `.btn--plain` (no arrow). Use `<Btn>` / `<WaBtn>` from `ui.jsx`. Hover changes colour only.
- **Eyebrow** `<Eyebrow num="01">label</Eyebrow>`. **Section head** `.sec-head` (+ `--split` to put the lead beside the title).
- **Marker** `.mk` (+ `.m-in` to wipe in on scroll). One per heading, two or three words at most.
- **Sticker** `.sticker` (+ `--paper`, `--go`): rotated label with a hard shadow.
- **Tag** `.tag`, **card** `.card` (+ `--flat`, `--ink`).
- **Rows** instead of card grids for lists (press, articles, FAQ): number, title, meta, arrow disc.
- **FAQ** native `<details class="faq-item">` (styles in `FAQ.css`), exclusive via `name`.
- **Form** `.field` wrapper; the lead form is `<ContactForm>`.
- **Navbar / Footer / FloatingWhatsApp / Modal** are shared; pages do not restyle them. The navbar is light-on-dark and expects an ink hero under it.

## 6. Motion

Engine: `useMotion()` mounted once in `app/root.jsx`. Components only add classes.

| Class / attribute | Effect |
|---|---|
| `.m-reveal` | Fade and rise once, when it enters the viewport |
| `.m-stagger` | Children rise one after another |
| `.mk.m-in`, `.sticker.m-in` | Marker wipes in, sticker drops and lands |
| `[data-scrub="start end"]` | Sets `--p` 0 → 1 while crossing the viewport (rails, `<FillText>`, `.m-draw`) |
| `.m-marquee` | Constant drift, paused off screen |
| `<SlotNumber value="2,500+">` | Digits roll to their value |

Rules:
- Above the fold uses CSS keyframes, never `.m-reveal`: the LCP element must not wait for JS.
- The LCP element (the page's H1) may slide in but never starts at `opacity: 0`: Chrome does not count a transparent element, so the fade itself becomes the LCP delay.
- Hidden start states exist only under `html.js`; without JS, or with reduced motion, the final state renders.
- Animate `transform`, `opacity`, `background-size`, `stroke-dashoffset`. Nothing that lays out.
- Sticky/pinned layouts only at `(min-width: 1024px) and (min-height: 800px)`.
- No transform on hover. No `transition: all`. No `backdrop-filter`. No looping decorative animation.

## 7. Before a page ships

1. One `<h1>`, visible. `<main id="main">`.
2. 390, 768, 1024, 1440: no horizontal scroll, nothing clipped, every button reachable.
3. Every number traces to `src/data/businessFacts.js` or approved copy. Nothing invented.
4. No Font Awesome, no Google Fonts request, no new dependency for something CSS can do.
5. Focus ring visible, form fields labelled, images have real alt text and intrinsic sizes.
6. `npm test`, `npm run lint`, `npm run build` pass.
