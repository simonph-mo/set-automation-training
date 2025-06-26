import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { RandomPage } from '../../page-objects/RandomPage';

const url = "https://www.google.com";

test('Go to any website', async ({ page }) => {
    const practiceFormPage = new RandomPage(page);
    await practiceFormPage.navigateToAnyPage(url)
  });


  test('Register a new user', async ({ page }) => {
    const firstname = faker.person.firstName();
    const surname = faker.person.lastName();
    const email = faker.internet.email();
    const address = faker.address.streetAddress();
    console.log(`I have created ${firstname} ${surname}, ${email} at ${address} for you`);
    await page.goto('https://demoqa.com/automation-practice-form');
    await page.getByPlaceholder('First Name').fill(firstname);
    await page.getByPlaceholder('Last Name').fill(surname);
    await page.getByPlaceholder('name@example.com').fill(email);
    await page.getByText('Male', { exact: true }).click();
    await page.getByPlaceholder('Mobile Number').fill('9876543210');
    await page.locator('#subjectsInput').fill('Computer');
    await page.getByText('Computer Science', { exact: true }).click();
    await page.getByText('Music').click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Thanks for submitting the form')).toBeVisible();
  });