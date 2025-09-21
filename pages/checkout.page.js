const { expect } = require('@playwright/test');

exports.CheckOutPage = class CheckOutPage {
  constructor(page) {
    this.page = page;
    this.nameField = page.locator('input[data-test="firstName"]');
    this.lastNameField = page.locator('input[data-test="lastName"]');
    this.postalCodeField = page.locator('input[data-test="postalCode"]');
    this.continueButton = page.locator('input[data-test="continue"]');
    this.inventoryItem = page.locator('div[data-test="inventory-item"]');
    this.finishButton = page.locator('button[data-test="finish"]');
    this.checkoutCompleteTitle = page.locator('span[data-test="title"]'); 
    this.checkoutThankYouMessage = page.locator('h2[data-test="complete-header"]'); 
  }
 
  async enterName(name) {
    await this.nameField.fill(name);
  }

  async enterLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async enterPostalCode(postalCode) {
    await this.postalCodeField.fill(postalCode);
  }

  async fillInCustomerDetails(name, lastName, postalCode) {
    await this.enterName(name);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode); 
    await this.clickContinueButton();
  } 

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

  async verifyItemInTheCart(firstSelectedItem) {
    const cartItems = await this.inventoryItem;
    const cartItemsNames = await cartItems.locator('div[data-test="inventory-item-name"]').allInnerTexts();
    await expect(firstSelectedItem).toEqual(cartItemsNames[0]);
  }

  async verifyItemsInTheCart(firstSelectedItem, secondSelectedItem) {
    const cartItems = await this.inventoryItem;
    const cartItemsNames = await cartItems.locator('div[data-test="inventory-item-name"]').allInnerTexts();
    await expect(firstSelectedItem).toEqual(cartItemsNames[0]);
    await expect(secondSelectedItem).toEqual(cartItemsNames[1]);
  }
}