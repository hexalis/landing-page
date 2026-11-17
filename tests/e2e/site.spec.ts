import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
/* Axe must run on the final colors: the entrance fades animate opacity, and scanning a
   frame mid-transition reports false contrast failures. Wait for every finite animation
   and transition (the pulsing rings loop forever and are excluded). */
const settle = async (page: Page) => {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
  await page.waitForFunction(() => {
    const running = document.getAnimations().some(a => {
      const timing = a.effect?.getComputedTiming();
      return timing?.endTime !== Infinity && a.playState === 'running';
    });
    // With reduced motion every .rise is marked .in at boot; wait until its opacity
    // transition has actually reached the final value. The playground guide is
    // intentionally transparent and is not page content.
    const fading = [...document.querySelectorAll('.rise.in > *')].some(el =>
      !el.classList.contains('guide') && getComputedStyle(el).opacity !== '1');
    return !running && !fading;
  }, null, { timeout: 5000 }).catch(() => {});
};
const axe = async (page: Page) => { await settle(page); return new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze(); };

for (const path of ['/', '/en/', '/404/']) test(`${path} has metadata, no overflow and no automated WCAG A/AA violations`, async ({ page }) => {
  await page.goto(path); await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('link[rel=canonical]')).toHaveCount(path === '/404/' ? 0 : 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await axe(page)).violations).toEqual([]);
});

test('dark theme has no automated WCAG A/AA violations', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  for (const path of ['/', '/en/']) { await page.goto(path); expect((await axe(page)).violations).toEqual([]); }
});

test('both locales boot the page script and the animated journey without errors', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  for (const path of ['/', '/en/']) {
    await page.goto(path);
    await expect.poll(() => page.evaluate(() => (window as unknown as { HX_OK?: boolean }).HX_OK)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('theme choice persists across reloads', async ({ page }) => {
  await page.goto('/');
  const before = await page.locator('html').getAttribute('data-theme');
  await page.locator('.nav .theme-btn').click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', before ?? '');
  const chosen = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', chosen ?? '');
});

test('menu links scroll to their section', async ({ page }) => {
  await page.goto('/');
  const menu = page.locator('.nav .menu-btn');
  if (await menu.isVisible()) { await menu.click(); await page.locator('#drawer a[href="#sumate"]').click(); } /* phone: links live in the drawer */
  else await page.locator('.nav a[href="#sumate"]').click();
  await expect(page).toHaveURL(/#sumate$/);
  await expect(page.locator('#sumate')).toBeInViewport();
});

test('content works with scripts disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/'); await expect(page.locator('h1')).toBeVisible();
  const faq = page.locator('#preguntas details').nth(1);
  const wasOpen = (await faq.getAttribute('open')) !== null;
  await faq.locator('summary').click();
  if (wasOpen) await expect(faq).not.toHaveAttribute('open', ''); else await expect(faq).toHaveAttribute('open', '');
  await context.close();
});

test('page boots and the theme toggle works when storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => (window as unknown as { HX_OK?: boolean }).HX_OK)).toBe(true);
  const before = await page.locator('html').getAttribute('data-theme');
  await page.locator('.nav .theme-btn').click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', before ?? '');
});
