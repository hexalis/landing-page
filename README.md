# Hexalis · Landing page

The public site of Hexalis, a non-profit that designs and builds open source projects: Hexalis Design System, Hexalis Design Ops Toolkit and community projects. Spanish lives at `/`, English at `/en/`.

Built with Astro on top of the [abc-astro](https://github.com/RogerG03/abc-astro) starter: static output, no client framework, typed bilingual copy and automated quality gates.

## Start

Node **22.23.4+** (Node 24 recommended), npm 9.6.5+.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4321` (Spanish) or `/en/` (English). `npm run preview` serves a completed build. The 3D journey and the security policy only behave exactly as in production in a build (`npm run build && npm run preview`).

## Where things live

| Path | What it holds |
| --- | --- |
| `src/pages/` | Routes: `/`, `/en/`, `404`, `robots.txt` |
| `src/views/HomeView.astro` | Composes the landing from its sections |
| `src/layouts/SiteLayout.astro` | Document shell, SEO, navigation, footer, command palette |
| `src/components/sections/` | Journey (3D story), Works, Playground, Projects, Log, Team, Join, Faq, Finale |
| `src/components/layout/`, `ui/`, `seo/` | Navigation and drawer, footer, command palette, metadata |
| `src/scripts/app.js` | Page behaviour: theme, menu, playground, team hive, timeline, command palette, presence |
| `src/scripts/scene.js` | The 3D journey (three.js). Loaded lazily as its own chunk |
| `src/styles/tokens.css` | Fonts and Hexalis Design System variables (palettes, themes) |
| `src/styles/global.css` | Layout and components |
| `src/i18n/ui.ts` | Typed page-level copy (title, description, 404) |
| `public/assets/` | Covers and the social image |
| `docs/design/` | Design history in Spanish: audit, voice and tone, 3D refinement |

Every section takes a `locale` prop. Copy is written next to its markup as `tr('español', 'english')`, so a section cannot ship one language without the other. Team members, their links (`TEAM[].links`) and the timeline data live in `src/scripts/app.js` and the Log section.

## Before publishing

- Set **SITE_URL** to the real origin in the build environment. With the default `https://example.com` every page is `noindex` and robots disallows crawling; canonical, hreflang, `og:url` and `og:image` all derive from it.
- Fill `TEAM[].links` (GitHub user, LinkedIn and portfolio URLs) and the `LINKS` block in `src/scripts/app.js`. Empty links are hidden.
- Deploy `dist/` to a static host; serve `404.html` with HTTP 404 and disable SPA fallback.

```powershell
$env:SITE_URL = 'https://your-domain.com'
npm run build
```

## Validate

```sh
npm run verify
npx playwright install chromium
npm run test:e2e
```

`verify` runs Astro/TypeScript checks, unit tests, the production build, link/locale checks and gzip budgets (the lazy 3D chunk has its own budget). Browser tests run with reduced motion except one that boots the animated journey; they cover metadata, overflow, automated WCAG A/AA checks, theme persistence, blocked storage and no-script content.

## Security

Astro emits a Content Security Policy per page (`security.csp` in `astro.config.ts`) with hashes for its scripts and styles. Allowed connections: `api.github.com` (contributors), `avatars.githubusercontent.com` (photos) and Cloudflare Web Analytics (`static.cloudflareinsights.com` script, `cloudflareinsights.com` beacon), which the host injects. If analytics are turned off in Cloudflare, remove those two origins. Inline `style` attributes are allowed because sections set per-element custom properties. If presence over WebSocket is enabled (`LIVE.presenceUrl`), add its origin to `connect-src`.

## Learn more

- [Architecture](docs/architecture.md) · [Quality and release](docs/quality.md) · [Validation record](docs/validation.md)
