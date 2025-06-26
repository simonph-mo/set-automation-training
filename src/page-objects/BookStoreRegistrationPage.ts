import { Page, Locator, expect } from '@playwright/test';

export class BookStoreRegistrationPage {
    private readonly bookStoreLoginLink: string;
    private readonly loginButton: Locator;
    private readonly newUserButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly recaptchaBox: Locator;
    private readonly registerButton: Locator;
    private readonly backToLoginButton: Locator;
    
    constructor(public readonly page: Page) {
        this.bookStoreLoginLink = 'https://demoqa.com/login';
        this.loginButton = page.locator('button[id="login"]');
        this.newUserButton = page.locator('button[id="newUser"]');
        this.firstNameInput = page.locator('input[id="firstname"]');
        this.lastNameInput = page.locator('input[id="lastname"]');
        this.usernameInput = page.locator('input[id="userName"]');
        this.passwordInput = page.locator('input[id="password"]');
        this.recaptchaBox = page.locator('span[id="recaptcha-anchor"]');
        this.registerButton = page.locator('button[id="register"]');
        this.backToLoginButton = page.locator('button[id="gotologin"]');
    }

    async loginToBookStoreAccount(username, password) {
        await this.navigateToBookStoreLoginPage();
        await this.enterLoginCredentials(username, password);
        await this.loginButton.click();
    }

    async registerNewBookStoreUser(firstname: string, lastname: string, username: string, password: string){
        await this.navigateToBookStoreLoginPage();
        await this.fillRegisterForm(firstname, lastname, username, password);
        await this.clickBackToLogin();
    }

    private async navigateToBookStoreLoginPage(){
        await this.page.goto(this.bookStoreLoginLink);
    }

    private async enterLoginCredentials(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    private async goToNewUserForm() {
        await this.newUserButton.click();
    }

    private async fillRegisterForm(firstname: string, lastname: string, userName: string, password: string){
        await this.newUserButton.click();
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.usernameInput.fill(userName);
        await this.passwordInput.fill(password);
        //await this.recaptchaBox.click();
        //await this.bypassRecaptcha();
        //await this.page.locator('iframe[name="a-qm27vbuunhpw"]').contentFrame().getByLabel('I\'m not a robot').click();
        await this.registerButton.click();
    }

    private async bypassRecaptcha(){
        await this.page.evaluate(() => {
            const recaptcha = document.querySelector('span[id="recaptcha-anchor"]');
            if (recaptcha) recaptcha.setAttribute('aria-checked', 'true');
        });
    }

    private async clickBackToLogin(){
        await this.backToLoginButton.click();
    }

}

