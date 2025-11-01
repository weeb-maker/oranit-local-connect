import { test, expect } from '@playwright/test';

// Adjust routes/selectors to your app.
const hePath = '/he/category/אוכל-ושתייה';
const enPath = '/en/category/food-drink';

test.describe('Food & Drinks i18n rendering', () => {
  test('HE → switch to EN preserves correct i18n values (no fallback)', async ({ page }) => {
    // 1) Start in HE page
    await page.goto(hePath, { waitUntil: 'networkidle' });

    // Assert the hero/title/crumbs include the HE title and NOT a raw key/fallback:
    const heTexts = await page.locator('h1, .hero .content, .breadcrumb').allInnerTexts();
    const joinedHE = heTexts.join(' • ');
    expect(joinedHE).toMatch(/אוכל.?ו?שתייה/); // robust match with/without space
    expect(joinedHE).not.toMatch(/categories\.|top\./); // no leaked keys
    expect(joinedHE).not.toMatch(/\.\.\.\s*other services/i); // no fallback

    // 2) Switch to English - look for language switcher or nav link
    const langSwitcher = page.locator('[data-lang="en"], a[href*="/en/"]').first();
    if (await langSwitcher.isVisible()) {
      await langSwitcher.click();
      await page.waitForLoadState('networkidle');

      // 3) Assert EN text is correct and not a fallback
      const enTexts = await page.locator('h1, .hero .content, .breadcrumb').allInnerTexts();
      const joinedEN = enTexts.join(' • ');
      // Accept a few variants you actually use in EN:
      const EN_OK = /(Food\s*&\s*Drinks?|Food and Drinks?)/i;
      expect(joinedEN).toMatch(EN_OK);
      expect(joinedEN).not.toMatch(/categories\.|top\./);  // no leaked keys
      expect(joinedEN).not.toMatch(/\.\.\.\s*other services/i); // no fallback
    }
  });

  test('EN direct page load shows correct strings', async ({ page }) => {
    await page.goto(enPath, { waitUntil: 'networkidle' });
    const enTexts = await page.locator('h1, .hero .content, .breadcrumb').allInnerTexts();
    const joined = enTexts.join(' • ');
    expect(joined).toMatch(/Food\s*&?\s*Drinks?/i);
    expect(joined).not.toMatch(/categories\.|top\.|\.\.\.\s*other services/i);
  });

  test('HE direct page load shows correct strings', async ({ page }) => {
    await page.goto(hePath, { waitUntil: 'networkidle' });
    const heTexts = await page.locator('h1, .hero .content, .breadcrumb').allInnerTexts();
    const joined = heTexts.join(' • ');
    expect(joined).toMatch(/אוכל.?ו?שתייה/);
    expect(joined).not.toMatch(/categories\.|top\.|\.\.\.\s*other services/i);
  });
});
