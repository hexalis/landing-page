import { expect, test } from "@playwright/test";

test("shows the Hexalis landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "La ciencia abierta, al alcance de toda la humanidad.",
    }),
  ).toBeVisible();
});
