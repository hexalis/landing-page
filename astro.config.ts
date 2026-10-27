import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
const site = process.env.SITE_URL || 'https://example.com';
const url = new URL(site);
if (!['https:', 'http:'].includes(url.protocol) || url.pathname !== '/' || url.search || url.hash) {
  throw new Error('SITE_URL must be an absolute HTTP(S) origin without a path, query or fragment.');
}
export default defineConfig({
  site, output: 'static', trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  i18n: { defaultLocale: 'es', locales: ['es', 'en'], routing: { prefixDefaultLocale: false } },
  security: {
    // Astro hashes its own scripts and styles; these add the rest of the policy the landing needs.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://avatars.githubusercontent.com",
        "font-src 'self'",
        // cloudflareinsights.com: Cloudflare Web Analytics, which the host injects into every page
        "connect-src 'self' https://api.github.com https://cloudflareinsights.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'", 'https://static.cloudflareinsights.com'] },
      // Sections set per-element custom properties (style="--c: …"); attribute styles cannot run code.
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
});
