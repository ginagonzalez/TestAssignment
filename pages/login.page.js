exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('input[data-test="username"]');
    this.passwordField = page.locator('input[data-test="password"]');
    this.loginButton = page.locator('input[data-test="login-button"]');
    this.errorButton = page.locator('button[data-test="error-button"]');
  }
 
  async enterUsername(username) {
    await this.usernameField.fill(username);
  }

  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async logIn(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}