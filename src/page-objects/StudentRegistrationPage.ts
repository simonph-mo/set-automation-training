import { Page, Locator } from '@playwright/test';

export class StudentRegistrationPage {
  private readonly practiseFormLink: string;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly genderRadio: Locator;
  private readonly userNumberInput: Locator;
  private readonly submitButton: Locator;
  private readonly modalTitle: Locator;

  constructor(private readonly page: Page) {
    this.practiseFormLink = 'https://demoqa.com/automation-practice-form';
    this.firstNameInput = page.locator('input[id="firstName"]');
    this.lastNameInput = page.locator('input[id="lastName"]');
    this.emailInput = page.locator('input[id="userEmail"]');
    this.genderRadio = page.locator('label[for="gender-radio-1"]');
    this.userNumberInput = page.locator('input[id="userNumber"]');
    this.submitButton = page.locator('button[id="submit"]');
    this.modalTitle = page.locator('div.modal-title.h4');
  }

  async registerStudent(firstname: string, lastname: string, email: string) {
    await this.navigateToPractiseForm();
    await this.fillForm(firstname, lastname, email);
    await this.submitForm();
  }

  private async navigateToPractiseForm() {
    await this.page.goto(this.practiseFormLink);
  }

  private async fillForm(firstname: string, lastname: string, email: string) {
    await this.firstNameInput.fill(firstname);
    await this.lastNameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.genderRadio.click();
    await this.userNumberInput.fill("0123456789");
  }

  private async submitForm() {
    await this.submitButton.click();
  }

  async getModalTitleText() {
    return this.modalTitle.textContent();
  }
}