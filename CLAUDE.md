# about-me

Personal portfolio site built with React + TypeScript + Vite. Uses MUI for components, react-i18next for EN/FI translations, and react-router (hash router) for navigation.

## Instructions for Claude

**Keep this file current in the same session that changes the code**, but only with what the code doesn't show: decisions, conventions, commands, gotchas, and anything the user had to correct twice. Don't describe components or lists that reading the code reveals.

A Stop hook (`.claude/hooks/check-on-stop.sh`, wired in `.claude/settings.json`) runs `npm run check` when a turn that edited files in this repo ends, and sends you back to fix a failure.

## Commands

- `npm run check`: type check (the app, and `vite.config.ts` with `plugins/` through `tsconfig.node.json`) and lint. Run it after every change; it must pass before you call a task done.
- `npm run dev`: the site at http://localhost:5173 (the `dev` configuration in `.claude/launch.json`). Check visual changes there, in both color modes, both languages and at phone width.
- `npm run build`: production build into `dist/`.

There are no tests.

## Deployment

Every push to `main` deploys the site to GitHub Pages (`.github/workflows/main.yml`), so never push unless the user asks; `git push` is denied in `.claude/settings.json`. The hash router is required for GitHub Pages (no server-side routing).

The site is the user site at the domain root, `https://rrobben.github.io/` (repo `rrobben/rrobben.github.io`, renamed from `about-me` on 2026-11-11; the base path is `/`). A separate `rrobben/about-me` repo only redirects the old `/about-me/` links here, and the Sleep Clock privacy policy that used to be at the root now lives in `rrobben/sleep-clock-privacy`. `public/.well-known/assetlinks.json` belongs to the Sleep Clock Android app (it verifies the app's link to this domain and only works at the root), so keep it, and keep `include-hidden-files: true` in the deploy workflow or the upload drops it.

## Check docs, not memory

React 19, MUI 9, react-router 8 and i18next 27 / react-i18next 18 may be newer than your training data. Before using an API, check the installed version's types in `node_modules` and the official docs. When adding a package, use the latest stable release (`npm view <pkg> dist-tags.latest`).

## Architecture

Single-page app with a hash router (`createHashRouter`). Routes map to view components under `src/components/views/`. All views use the `<Layout>` wrapper from `src/components/layout/Layout.tsx`.

All user-visible text lives in `src/i18n/en.json` and `src/i18n/fi.json`. Finnish keys that are missing fall back to English automatically — but the goal is full coverage in both files.

## i18n conventions

- Paragraph breaks within a single translation value use `<br /><br />` (with spaces). Lists have no margins, so text or a `<strong>` subheading that follows a `</ul>` needs one `<br />` after it for the same blank line (`</ul><br />Next text`). The Accordion component renders content via `dangerouslySetInnerHTML`, so HTML is supported there. The Profile bio is split on `<br /><br />` and rendered as multiple `<Typography>` elements.
- HMR doesn't reliably refresh `en.json`/`fi.json` in the dev server; reload the page before concluding a new key is missing.
- `fi.json` only needs to contain keys that differ from `en.json`. Keys not present in Finnish fall back to English.
- The `howIWork` block exists in both files. Adding an accordion there requires a key in `howIWork.header.*` and `howIWork.content.*` in both files, plus adding the key to `howIWorkItems` in `src/content/sections.ts`.

## How I work page (formerly Technologies)

Decided 2026-11: with most code written by AI, the page leads with working practices (AI pipeline, product and UI design, agent guardrails, architecture, running production) and lists the stack as one compact "Technologies" accordion of one-line tiles after the divider, framed as the knowledge that makes reviewing generated code possible. Don't bring back one essay per technology, and don't repeat Experience's stories here: Experience holds the outcomes, this page the method. The route stays `#tech` so existing links keep working.

`howIWorkItems` in `src/content/sections.ts` is a flat list of i18n keys, split into two groups by the divider after `howIWorkDividerAfter`, the last practice item. The front-page chips (`skills.*`) are concrete nouns (stack plus Claude Code), not practices.

Positioning (decided 2026-11-10): the site targets architect and lead developer roles. The profile leads with "where architecture meets product" and with matching human review to the stakes (read the diff in payroll, data models and production; spec, tests and a browser check suffice in side projects). Side projects lead with the user problem, product decisions (briefs, Claude mockups) and what real use taught about building with agents; the stack is one closing sentence, not per-project detail.

Years of experience count from 4/2017: "almost 10 years" until spring 2027, then "10 years".

## AccordionGroup

`src/components/common/Accordion.tsx`. Accepts an `items` array of `{ header, content, subheader?, dividerAfter? }`; `subheader` (a date) renders under the title, and an empty string hides it. Single `useState` governs expanded state across all items. On desktop the first item is expanded by default; on mobile none are. Content is rendered with `dangerouslySetInnerHTML` so `<br /><br />`, `<a>`, `<strong>` and `<ul>` work; each `<li>` renders as a soft tile. The card, chevron and content styling live in the `MuiAccordion*` overrides in `theme.ts`, not in the component.

## Theme and visual style

The look is the "soft" design (direction C, "Dusk" dark / "Daylight" light): rounded cards, no borders, left-aligned text, never justified. Style through `src/theme/theme.ts` (palette and component overrides) rather than one-off `sx` colours.

- Extra tones are in `palette.soft` (module-augmented): `raised`, `control`, `tile`, `accentTint`, `body`, `nav`, `shadow`, etc. Use them by path in `sx` (`color: "soft.body"`, `bgcolor: "soft.accentTint"`).
- In dark mode, surfaces separate by tone only (`soft.shadow` is `none`); in light mode by a faint shadow. Don't add borders.
- `shape.borderRadius` is 14, and MUI multiplies a numeric `sx` `borderRadius` by it (`borderRadius: 2` is 28px). Use the `radius` constants from `theme.ts` (strings with `px`) instead.
- Drawers are restyled globally into floating rounded cards (the `MuiDrawer` override), which the mobile menus rely on.

## Layout

`Layout` renders `<main>` (max-width 820) and, when `header` is given, the page heading with its icon square. Profile omits `header` because its hero card holds the `<h1>`.

`Layout` types `children` as `JSX.Element | JSX.Element[]` (with `import type { JSX } from "react"` — JSX is module-scoped in React 19). If a child is a `.map()` call mixed with other sibling children, wrap it in a `<>...</>` Fragment — otherwise TypeScript will reject the array-within-children as a type error at build time.

## React contexts

Contexts (`I18nContext`, `ColorModeContext`) live in their own files, separate from the Provider component that consumes them. The `react-refresh/only-export-components` lint rule rejects a file that exports both a context and a component. New contexts should follow the same pattern: `XxxContext.ts` for the `createContext` call, `XxxProvider.tsx` for the component.

## Link preview and metadata

`index.html` repeats the profile summary in `<meta name="description">`, `og:description`, `twitter:description` and the JSON-LD `description`/`knowsAbout`, and `public/og-image.png` (1200×630) shows the front-page chips and a tagline. Update them whenever the profile framing or chips change. The image has no source in the repo: rebuild it as an HTML card in the dark palette with Montserrat from `node_modules/@fontsource/montserrat` and render it with headless Chrome (`--headless=new --window-size=1200,630 --screenshot=...`).

## Static copy for crawlers and AI agents

The page renders in the browser and hash routes aren't separate URLs, so bots that don't run JavaScript (most AI crawlers) would see an empty page. `plugins/staticContent.ts` builds the English copy from `en.json` into `dist/llms.txt` and a `<noscript>` block in `index.html` at build time, so it never needs a hand edit. The order of each list lives in `src/content/sections.ts`, shared with the views: add a new accordion key there, not in the view. The email address is left out of the static copy on purpose (spam scrapers); LinkedIn and GitHub are in it.

No robots.txt, so everything is allowed.

## Private notes

`easyopp-notes.local/` holds raw notes on EasyOpp work (outcomes, ownership, framing), indexed by its `README.md`. Use them as source material for site copy. The folder is gitignored by the `*.local` rule and the repo is public, so never commit it or copy internal details (costs, partner or customer names, PR numbers) into the site verbatim. Keep telematics vendors generic on the site ("tracker vendors"), never by name. Claim only what the notes support: say "built for" where a note has no usage numbers.

Security details stay off the site (decided 2026-11-11): don't say the triage MCP server is reachable as a Claude.ai connector, and don't describe how secrets are masked, past masking gaps, hosting or domains. Say staff sign in with their own work account and the server holds the credentials, never "without credentials", which reads as no authentication. Describe the review flow as staged review that prepares a human approval, with the automatic line review as one optional code-level step (facts in `easyopp-notes.local/ai_review_pipeline.md`).
