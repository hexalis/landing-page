# Validation record

Checked on 2026-10-26 (America/Managua), Windows, Node 24.22.1, Astro 7.4.2, three.js 0.160.0.

| Check | Observed result |
| --- | --- |
| `npm run check` | 0 errors |
| `npm test` | Localized paths |
| `npm run build` | 3 pages: `/`, `/en/`, `404` |
| `npm run test:build` | Generated links and language alternatives resolve |
| `npm run budget` | 3D chunk 143,059 gzip bytes / 160 KiB; other JS 17,007 / 80 KiB; CSS 13,167 / 60 KiB |
| `npm run test:e2e` | 18 passed (Chromium desktop and mobile): metadata, overflow, axe A/AA in light and dark (color contrast included), script boot with the animated journey in both locales, theme persistence, menu scrolling, blocked storage, no-script content |
| `npm audit --omit=dev` | 0 reported vulnerabilities |
| CSP | No violations in captures of both locales at 1440 and 375 px |
| Visual review | Both locales captured section by section at 1440 and 375 px, dark and light, and compared with the previous static page: no visible differences |

## Color contrast fixes (2026-10-26)

axe found six light-theme contrast failures carried over from the static page. Fixed without changing the design's look:

| Element | Before | After |
| --- | --- | --- |
| `.btn-ops` with the system light theme | dark text on teal, 2.92:1 | white text (as with the manual light theme), 5.19:1 |
| `.s-btn.danger` | white on #E5484D, 3.91:1 | white on #D4363C, 4.78:1 |
| `.pill` text in light theme | the pill colour itself, 4.01–4.36:1 | 80 % pill colour + 20 % text colour, ≥5.3:1 |
| `#wordmark` (decorative) | text node, flagged at 1.09:1 | painted as generated content (`::before`), no visual change |

The `color-contrast` rule is active again in the browser tests, in both themes.
