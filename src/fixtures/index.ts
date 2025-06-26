import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BookStoreRegistrationPage } from '../page-objects/BookStoreRegistrationPage';
import { StudentRegistrationPage } from '../page-objects/StudentRegistrationPage';
import { TextBoxPage } from '../page-objects/TextBoxPage';


type PageFixtures = {
  bookStoreRegistrationPage: BookStoreRegistrationPage;
  studentRegistrationPage: StudentRegistrationPage;
  textBoxPage: TextBoxPage;
};

type DataFixtures = {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
};

const test = base.extend<PageFixtures & DataFixtures>({
  bookStoreRegistrationPage: async ({ page }, use) => {
    const bookStoreRegistrationPage = new BookStoreRegistrationPage(page);
    await use(bookStoreRegistrationPage);
  },
  studentRegistrationPage: async ({ page }, use) => {
    const studentRegistrationPage = new StudentRegistrationPage(page);
    await use(studentRegistrationPage);
  },
  textBoxPage: async ({ page }, use) => {
    const textBoxPage = new TextBoxPage(page);
    await use(textBoxPage);
  },
  firstname: async ({}, use) => {
    const firstname = faker.person.firstName();
    await use(firstname);
  },
  lastname: async ({}, use) => {
    const lastname = faker.person.lastName();
    await use(lastname);
  },
  username: async ({}, use) => {
    const username = faker.internet.email();
    await use(username);
  },
  password: async ({}, use) => {
    const password = faker.internet.password();
    await use(password);
  },
  fullName: async ({}, use) => {
    const fullName = faker.person.fullName();
    await use(fullName);
  },
  email: async ({}, use) => {
    const email = faker.internet.email();
    await use(email);
  },
  currentAddress: async ({}, use) => {
    const currentAddress = faker.location.streetAddress();
    await use(currentAddress);
  },
  permanentAddress: async ({}, use) => {
    const permanentAddress = faker.location.secondaryAddress();
    await use(permanentAddress);
  },
});

export { test };