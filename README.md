# about-me

My portfolio site, live at **[rrobben.github.io](https://rrobben.github.io/)**, in English and Finnish.

It is also a small example of how I build software now. I decide what the site says, how it looks and how it is structured; Claude Code writes most of the code, inside guardrails kept in the repo.

## How it's built

- **Instructions in the repo.** [`CLAUDE.md`](CLAUDE.md) holds what the code doesn't show: decisions, conventions, commands and gotchas. It is updated in the same session that changes the code and kept short, so every session starts from current, correct context.
- **Checks as hooks, not reminders.** A Stop hook ([`.claude/hooks/check-on-stop.sh`](.claude/hooks/check-on-stop.sh), wired in [`.claude/settings.json`](.claude/settings.json)) runs the type check and lint whenever a turn that edited files ends, and sends Claude back to fix a failure. A turn that changed nothing costs nothing.
- **Guardrails in permissions.** Every push to `main` deploys, so `git push` is denied for Claude in the project settings; deploying stays a human decision.
- **Verified in a browser.** Visual changes are checked on the dev server ([`.claude/launch.json`](.claude/launch.json)) in both color modes, both languages and at phone width.

## Design

A soft card design with a dark ("Dusk") and a light ("Daylight") theme: rounded cards separated by tone rather than borders, left-aligned text, Montserrat. All styling goes through the MUI theme ([`src/theme/theme.ts`](src/theme/theme.ts)), with extra tones in a typed `palette.soft` and radius constants, so components don't carry one-off colors. Dark is the default, and the chosen theme and language are remembered per browser.

All copy lives in [`src/i18n/en.json`](src/i18n/en.json) and [`src/i18n/fi.json`](src/i18n/fi.json); Finnish falls back to English only for values that are the same in both.

## Stack

React 19, TypeScript, Vite, MUI, react-i18next and react-router (hash router, since GitHub Pages has no server-side routing). Deployed to GitHub Pages by [GitHub Actions](.github/workflows/main.yml) on every push to `main`.

## Commands

```bash
npm install
npm run dev     # http://localhost:5173/
npm run check   # type check and lint
npm run build   # production build into dist/
```
