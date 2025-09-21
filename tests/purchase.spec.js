import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { CheckOutPage } from '../pages/checkout.page';

test.describe('After successful login flow check purchases', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await page.goto('/');
    await loginPage.logIn(process.env.VALID_USER, process.env.PASSWORD);
    await page.waitForURL('**/inventory.html');
    await expect(page).toHaveURL('inventory.html');
    await expect(productPage.secondaryTitle).toHaveText('Products');
    await expect(productPage.footer).toBeVisible();
    await expect(productPage.footerCopy).toContainText('Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('Purchase one ramdom product', async ({ page }) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckOutPage(page);

    const product = await productPage.pickRandomProduct();
    const selectedItem = await productPage.addProductToCart(product);
    await productPage.clickShoppingCart();

    await page.waitForURL('**/cart.html');
    await expect(page).toHaveURL('cart.html');
    await productPage.clickCheckOutButton();

    await page.waitForURL('**/checkout-step-one.html');
    await expect(page).toHaveURL('checkout-step-one.html');
    await checkoutPage.fillInCustomerDetails(process.env.CUSTOMER_NAME, process.env.CUSTOMER_LAST_NAME, process.env.CUSTOMER_POSTAL_CODE);

    await page.waitForURL('**/checkout-step-two.html');
    await expect(page).toHaveURL('checkout-step-two.html');
  
    await checkoutPage.verifyItemInTheCart(selectedItem);
    await checkoutPage.clickFinishButton();
    
    await page.waitForURL('**/checkout-complete.html');
    await expect(page).toHaveURL('checkout-complete.html');
    await expect(checkoutPage.checkoutCompleteTitle).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.checkoutThankYouMessage).toHaveText('Thank you for your order!');
  });

  test('Completed product purchase with sorting', async ({ page }) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckOutPage(page);

    await productPage.sortProductsOn('Price (low to high)');
    const firstSelectedItem = await productPage.addLastProductToCart();
    await productPage.sortProductsOn('Name (A to Z)');
    const secondSelectedItem = await productPage.addProductToCart(1);
    await productPage.clickShoppingCart();

    await page.waitForURL('**/cart.html');
    await expect(page).toHaveURL('cart.html');
    await productPage.clickCheckOutButton();

    await page.waitForURL('**/checkout-step-one.html');
    await expect(page).toHaveURL('checkout-step-one.html');
    await checkoutPage.fillInCustomerDetails(process.env.CUSTOMER_NAME, process.env.CUSTOMER_LAST_NAME, process.env.CUSTOMER_POSTAL_CODE);

    await page.waitForURL('**/checkout-step-two.html');
    await expect(page).toHaveURL('checkout-step-two.html');
  
    await checkoutPage.verifyItemsInTheCart(firstSelectedItem, secondSelectedItem);
    await checkoutPage.clickFinishButton();
    
    await page.waitForURL('**/checkout-complete.html');
    await expect(page).toHaveURL('checkout-complete.html');
    await expect(checkoutPage.checkoutCompleteTitle).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.checkoutThankYouMessage).toHaveText('Thank you for your order!');
  });
});