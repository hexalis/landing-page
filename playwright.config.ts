import { defineConfig, devices } from "@playwright/test";

const isCi = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests/e2e",
  forbidOnly: isCi,
  retries: isCi ? 1 : 0,
  reporter: isCi ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    // `next start` no funciona con `output: "export"`; en CI se sirve `out/` como lo hará Pages.
    command: isCi ? "python3 -m http.server 3000 --directory out" : "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCi,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
