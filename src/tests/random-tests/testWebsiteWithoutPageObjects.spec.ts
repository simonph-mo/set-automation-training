import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const username = faker.internet.email();
const password = faker.internet.password();
const fullName = faker.person.fullName();
const email = faker.internet.email();
const currentAddress = faker.location.streetAddress();
const permanentAddress = faker.location.secondaryAddress();


test('Register for book store and login', async ({ page }) => {

    const bookStoreLoginLink = 'https://demoqa.com/login';
    const loginButton = page.locator('button[id="login"]');
    const newUserButton = page.locator('button[id="newUser"]');
    const firstNameInput = page.locator('input[id="firstname"]');
    const lastNameInput = page.locator('input[id="lastname"]');
    const usernameInput = page.locator('input[id="userName"]');
    const passwordInput = page.locator('input[id="password"]');
    const recaptchaBox = page.locator('span[id="recaptcha-anchor"]');
    const registerButton = page.locator('button[id="register"]');
    const backToLoginButton = page.locator('button[id="gotologin"]');


    // Navigate to the bookstore login page
    await page.goto(bookStoreLoginLink);

    // Register a new user
    await newUserButton.click();
    await firstNameInput.fill(firstname);
    await lastNameInput.fill(lastname);
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    //await recaptchaBox.click();
    await registerButton.click();
    await backToLoginButton.click();

    // Log in with the new user credentials
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();

    // Verify login
    await expect(page.locator('#name.mb-1')).toHaveText('Invalid username or password!');

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
});


test('Submit Student information in the Practise Form', async ({ page }) => {
    const practiseFormLink = 'https://demoqa.com/automation-practice-form';
    const firstNameInput = page.locator('input[id="firstName"]');
    const lastNameInput = page.locator('input[id="lastName"]');
    const emailInput = page.locator('input[id="userEmail"]');
    const genderRadio = page.locator('label[for="gender-radio-1"]');
    const userNumberInput = page.locator('input[id="userNumber"]');
    const submitButton = page.locator('button[id="submit"]');
    const modalTitle = page.locator('div.modal-title.h4');

    // Navigate to the practise form
    await page.goto(practiseFormLink);

    // Fill the form
    await firstNameInput.fill(firstname);
    await lastNameInput.fill(lastname);
    await emailInput.fill(email);
    await genderRadio.click();
    await userNumberInput.fill("0123456789");

    // Submit the form
    await submitButton.click();

    // Verify the modal title
    expect(await modalTitle.textContent()).toBe('Thanks for submitting the form');
});


test('Enter information in Text Box page', async ({ page }) => {
    const textBoxLink = 'https://demoqa.com/text-box';
    const fullNameInput = page.locator('input[id="userName"]');
    const emailInput = page.locator('input[id="userEmail"]');
    const currentAddressInput = page.locator('textarea[id="currentAddress"]');
    const permanentAddressInput = page.locator('textarea[id="permanentAddress"]');
    const submitButton = page.locator('button[id="submit"]');

    // Navigate to the text box page
    await page.goto(textBoxLink);

    // Fill the text box form
    await fullNameInput.fill(fullName);
    await emailInput.fill(email);
    await currentAddressInput.fill(currentAddress);
    await permanentAddressInput.fill(permanentAddress);

    // Submit the form
    await submitButton.click();

    // Verify the submitted information
    await expect(page.locator('#name.mb-1')).toHaveText(`Name:${fullName}`);
    await expect(page.locator('#email.mb-1')).toHaveText(`Email:${email}`);
    await expect(page.locator('#currentAddress.mb-1')).toHaveText(`Current Address :${currentAddress}`);
    await expect(page.locator('#permanentAddress.mb-1')).toHaveText(`Permananet Address :${permanentAddress}`);

    console.log(`Full Name: ${fullName}\nEmail: ${email}\nCurrent Address: ${currentAddress}\nPermanent Address: ${permanentAddress}`);
});