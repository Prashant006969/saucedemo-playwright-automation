import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

test.describe('Saucedemo end-to-end flow', () => {

  test('Valid login', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('Invalid login shows error message', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'wrong_password');
    await page.click('[data-test="login-button"]');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Epic sadface');
  });

  test('Add products to cart and verify cart', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory.html/);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);

    const itemNames = page.locator('.inventory_item_name');
    await expect(itemNames.nth(0)).toContainText('Sauce Labs Backpack');
    await expect(itemNames.nth(1)).toContainText('Sauce Labs Bike Light');
  });

  test('Complete checkout happy path', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory.html/);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await page.click('[data-test="finish"]');

    const completeHeader = page.locator('.complete-header');
    await expect(completeHeader).toContainText('Thank you for your order!');
  });

  test('Logout after login', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory.html/);

    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL(BASE_URL);
  });

});
