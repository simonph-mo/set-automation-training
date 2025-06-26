import { Page, Locator, expect } from '@playwright/test';

export class TextBoxPage {
    private readonly textBoxLink: string;
    private readonly fullNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly currentAddressInput: Locator;
    private readonly permanentAddressInput: Locator;
    private readonly submitButton: Locator;

    constructor(public readonly page: Page) {
        this.textBoxLink = 'https://demoqa.com/text-box';
        this.fullNameInput = page.locator('input[id="userName"]');
        this.emailInput = page.locator('input[id="userEmail"]');
        this.currentAddressInput = page.locator('textarea[id="currentAddress"]');
        this.permanentAddressInput = page.locator('textarea[id="permanentAddress"]');
        this.submitButton = page.locator('button[id="submit"]');
    }

    async submitTextBoxInformation(fullNameInput: string, emailInput: string, currentAddressInput: string, permanentAddressInput: string) {
        await this.navigateToTextBoxPage();
        await this.fillTextBox(fullNameInput, emailInput, currentAddressInput, permanentAddressInput);
        await this.clickSubmit();
    }


    private async navigateToTextBoxPage() {
        await this.page.goto(this.textBoxLink);
    }

    private async fillTextBox(fullNameInput: string, emailInput: string, currentAddressInput: string, permanentAddressInput: string) {
        await this.fullNameInput.fill(fullNameInput);
        await this.emailInput.fill(emailInput);
        await this.currentAddressInput.fill(currentAddressInput);
        await this.permanentAddressInput.fill(permanentAddressInput);
    }

    private async clickSubmit(){
        await this.submitButton.click();
    }
}