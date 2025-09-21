import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../pages/login.page';

test.describe('Login flow multiple users', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Locked out user should not be able to log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn(process.env.NOT_VALID_USER, process.env.PASSWORD); 
    await expect(loginPage.errorButton).toBeVisible();
  });

  test('Standard user should be able to log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn(process.env.VALID_USER, process.env.PASSWORD);
    await page.waitForURL('**/inventory.html');
    await expect(page).toHaveURL('/inventory.html');
  });  
});

