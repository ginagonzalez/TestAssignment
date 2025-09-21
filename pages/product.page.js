exports.ProductPage = class ProductPage {
  constructor(page) {
    this.page = page;
    this.secondaryTitle = page.locator('span[data-test="title"]');
    this.shoppingCart = page.locator('a[data-test="shopping-cart-link"]');
    this.sortProducts = page.locator('select[data-test="product-sort-container"]');
    this.inventoryItem = page.locator('div[data-test="inventory-item"]');
    this.inventoryItemName = page.locator('div[data-test="inventory-item-name"]');
    this.checkOutButton = page.locator('button[data-test="checkout"]');
    this.footer = page.locator('footer[data-test="footer"]');
    this.footerCopy = page.locator('div[data-test="footer-copy"]');
  }

  async clickShoppingCart() {
    await this.shoppingCart.click();
  }

  async pickRandomProduct() {
    const itemsNumber = await this.inventoryItem.count();
    const random = Math.floor(Math.random() * itemsNumber);
    return random;
  }

  async sortProductsOn(option) {
    await this.sortProducts.selectOption(option);
  }

  async addProductToCart(value) {
    const items = await this.inventoryItem; 
    const selectedItem = await items.nth(value).locator('div[data-test="inventory-item-name"]');
    const itemName = await selectedItem.innerText();
    const button = await items.nth(value).locator('//button[contains(text(), "Add to cart")]');
    await button.click();
    return itemName
  }

  async addLastProductToCart() {
    const items = await this.inventoryItem;
    const lastItem = await items.last().locator('div[data-test="inventory-item-name"]');
    const itemName = await lastItem.innerText();
    const button = await items.last().locator('//button[contains(text(), "Add to cart")]');
    await button.click();
    return itemName
  }

  async clickCheckOutButton() {
    this.checkOutButton.click();
  }
}