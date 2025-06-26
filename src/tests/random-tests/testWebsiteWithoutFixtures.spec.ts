import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BookStoreRegistrationPage } from '../../page-objects/BookStoreRegistrationPage';
import { StudentRegistrationPage } from '../../page-objects/StudentRegistrationPage';
import { TextBoxPage } from '../../page-objects/TextBoxPage';

const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const username = faker.internet.email();
const password = faker.internet.password();
const fullName = faker.person.fullName();
const email = faker.internet.email();
const currentAddress = faker.location.streetAddress();
const permanentAddress = faker.location.secondaryAddress();


test('Register for book store and login', async ({page}) => {
    const bookStoreRegistrationPage = new BookStoreRegistrationPage(page);

    await bookStoreRegistrationPage.registerNewBookStoreUser(firstname, lastname, username, password);
 
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
   
    const registeredUsername = username;
    const registeredPassword = password;
 
    await bookStoreRegistrationPage.loginToBookStoreAccount(registeredUsername, registeredPassword);
    await expect(bookStoreRegistrationPage.page.locator('#name.mb-1')).toHaveText('Invalid username or password!');
 });


 test('Submit Student information in the Practise Form', async ({page}) => {
    const studentRegistrationPage = new StudentRegistrationPage(page);

    await studentRegistrationPage.registerStudent(firstname, lastname, email);

    expect(await studentRegistrationPage.getModalTitleText()).toBe('Thanks for submitting the form');
});


test('Enter information in Text Box page', async ({page}) => {
    const textBoxPage = new TextBoxPage(page);

    await textBoxPage.submitTextBoxInformation(fullName, email, currentAddress, permanentAddress);

    console.log(`Full Name: ${fullName}\nEmail: ${email}\nCurrent Address: ${currentAddress}\nPermanent Address: ${permanentAddress}`);

    await expect(page.locator('#name.mb-1')).toHaveText(`Name:${fullName}`);
    await expect(page.locator('#email.mb-1')).toHaveText(`Email:${email}`);
    await expect(page.locator('#currentAddress.mb-1')).toHaveText(`Current Address :${currentAddress}`);
    await expect(page.locator('#permanentAddress.mb-1')).toHaveText(`Permananet Address :${permanentAddress}`);
});




  