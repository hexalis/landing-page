import { defineConfig, devices } from '@playwright/test';
export default defineConfig({ testDir:'tests/e2e', use:{baseURL:'http://127.0.0.1:4321',reducedMotion:'reduce'}, // the animated 3D journey renders in software here; one test opts back in
  timeout:60000,
  projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}],
  webServer:{command:'npm run preview -- --port 4321 --ignore-lock',url:'http://127.0.0.1:4321',reuseExistingServer:!process.env.CI},
});
