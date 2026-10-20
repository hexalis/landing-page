import { expect, test } from "@playwright/test";

test("shows the Red Lace Core landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "La Tierra nos está hablando.",
    }),
  ).toBeVisible();
});
