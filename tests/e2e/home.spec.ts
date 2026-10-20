import { expect, test } from "@playwright/test";

test("shows the Red Lace Core landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Crear juntos.*Compartir con todos/,
    }),
  ).toBeVisible();
});

test("moves the same scene with native scroll and supports pausing and resuming", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const stage = page.locator(".journey-stage");
  const scene = page.locator("[data-journey-frame]");
  await expect(stage).toHaveAttribute("data-motion", "active");
  await expect
    .poll(async () => Number(await scene.getAttribute("data-journey-frame")))
    .toBeGreaterThan(0);
  await page.getByRole("link", { name: "Propósito", exact: true }).click();
  await expect
    .poll(async () =>
      Math.abs(
        await page.locator("#mision").evaluate((element) => element.getBoundingClientRect().top),
      ),
    )
    .toBeLessThan(2);
  await expect
    .poll(async () => Number(await scene.getAttribute("data-journey-frame")))
    .toBeGreaterThan(300);
  await page.getByRole("button", { name: "Pausar movimiento de la escena" }).click();
  await expect(stage).toHaveAttribute("data-motion", "static");
  const pausedFrame = await scene.getAttribute("data-journey-frame");
  const pausedScroll = await page.evaluate(() => window.scrollY);
  await page.mouse.move(800, 450);
  await page.mouse.wheel(0, 450);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(pausedScroll + 200);
  await expect(scene).toHaveAttribute("data-journey-frame", pausedFrame!);
  await page.getByRole("button", { name: "Activar movimiento de la escena" }).press("Enter");
  await expect(stage).toHaveAttribute("data-motion", "active");
  await expect
    .poll(async () => Number(await scene.getAttribute("data-journey-frame")))
    .toBeGreaterThan(Number(pausedFrame) + 20);
  await page.getByRole("link", { name: "Las personas detrás de las ideas" }).click();
  await expect(page).toHaveURL(/#equipo$/);
  await expect(page.getByRole("heading", { name: /Ninguna idea llega lejos/ })).toBeInViewport();
});

test("keeps mobile content navigable with reduced motion and without loading the player", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Activar movimiento de la escena" })).toBeVisible();
  await expect(page.locator("[data-journey-frame]")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.getByRole("link", { name: "Conoce al equipo" }).click();
  await expect(page.getByRole("heading", { name: /Ninguna idea llega lejos/ })).toBeInViewport();
});
