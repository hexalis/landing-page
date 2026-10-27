# Architecture

```text
src/
  pages/                 /, /en/, 404 and robots.txt
  views/HomeView.astro   Composes the landing from its sections
  layouts/               Document shell: SEO, navigation, footer, command palette, page script
  components/
    sections/            Journey, Works, Playground, Projects, Log, Team, Join, Faq, Finale
    layout/              SiteChrome (skip link, nav, drawer, chapter rail, icon sprite), SiteFooter
    ui/                  CommandPalette
    seo/                 Metadata, alternates, social image and JSON-LD
  scripts/
    app.js               Page behaviour (classic DOM wiring, one module)
    scene.js             3D journey; dynamically imported, bundled with three.js into its own chunk
  i18n/                  Typed page-level copy
  lib/                   Pure routing helpers
  styles/                tokens.css (fonts, palettes, themes) and global.css
public/assets/           Covers and social image
tests/                   unit, build output and Playwright e2e
scripts/budget.mjs       gzip budgets (core JS/CSS and the 3D chunk)
docs/                    Architecture, quality, validation; docs/design holds the design history (Spanish)
```

Dependencies point downward: pages pick a locale and render the view; the view composes sections; sections are static markup. The layout owns document-level SEO, language, navigation and the page script.

## Bilingual copy

Each section receives `locale` and declares `const tr = (es, en) => locale === 'en' ? en : es`. Every visible string and translated attribute is written as `tr('…', '…')` next to its markup, so both languages always ship together and the DOM (ids, classes, data attributes) stays identical across locales. Scripts read `document.documentElement.lang` and use the same `tr` helper for strings they render.

## Behaviour

`app.js` keeps the original page logic: it wires the DOM by id and class, so markup changes in a section must keep those hooks. It loads `scene.js` with `import('./scene.js')`: immediately on fine pointers, on idle after `load` on touch devices. If the import or WebGL fails, `#stage3d` gets `no-gl` and an SVG fallback is shown. Reduced motion shows each chapter's final state.

`app.js` exposes `window.HX` (`LANG`, `tr`, `TEAM`, `still`, `journey`) for the scene and sets `window.HX_OK` once booted; an inline pre-paint script marks `no-motion-js` if that never happens.

## Next steps

`app.js` is still one module (~950 lines). The planned split follows the sections: theme and menu, command palette, playground, team hive, timeline, presence. Move each block into `src/scripts/` and import it from the section that owns its markup. Team, projects and timeline data can move to typed content files when they start changing often.
