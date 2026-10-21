import { expect, test } from '@playwright/test';

test.describe('core skills: overview', () => {
  test.beforeEach(async ({ context }) => {
    await context.addCookies([{ name: 'parlance_session', value: 'e2e', url: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000' }]);
  });

  test('shows each skill against the average', async ({ page }) => {
    await page.goto('/practice/feedback');
    await expect(page.getByRole('heading', { name: 'Core skills' })).toBeVisible();
    await expect(page.getByText(/your average/i).first()).toBeVisible();
  });
});
