import { test, expect, Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

class Registration {
    private readonly thePage: Page;
    private readonly firstNameTextBox: Locator;
    private readonly lastNameTextBox: Locator;
    private readonly emailAddress: Locator;
    private readonly genderButton: Locator;
    private readonly phoneNumber: Locator;
    private readonly subjectSelect: Locator;

    constructor(pages: Page) {
        this.thePage = pages;
        this.firstNameTextBox = pages.getByPlaceholder('First Name');
        this.lastNameTextBox = pages.getByPlaceholder('Last Name');
        this.emailAddress = pages.getByPlaceholder('name@example.com');
        this.phoneNumber = pages.getByPlaceholder('Mobile Number');
    }

    async goToRegistrationPage() {
        await this.thePage.goto('https://demoqa.com/automation-practice-form');
    }

    async enterName (firstName: string, lastName: string) {
        await this.firstNameTextBox.fill(firstName);
        await this.lastNameTextBox.fill(lastName);
    }

    async enterEmail (email: string) {
        await this.emailAddress.fill(email);
    }

    async selectGender (gender: string) {
        await this.thePage.getByText(gender, { exact: true }).click();
    }

    async enterPhone (number: string) {
        await this.phoneNumber.fill('9876543210');
    }

    async enterSubject (subject1: string, subject2: string) {
        //await this.thePage.getByText(subject1, { exact: true }).click();
        await this.thePage.getByText(subject1).click();
        await this.thePage.getByText(subject2).click();
    }

    async submitPage () {
        await this.thePage.getByRole('button', { name: 'Submit' }).click();
    }
}


test('Using the page object model', async ({ page }) => {
    const firstname = faker.person.firstName();
    const surname = faker.person.lastName();
    const email = faker.internet.email();

    const register = new Registration(page);
    
    await register.goToRegistrationPage();
    await register.enterName(firstname,surname);
    await register.enterEmail(email);
    await register.enterPhone('9876543210');
    await register.enterSubject('Sports', 'Music');
    await register.selectGender('Male');
    await register.submitPage();
});