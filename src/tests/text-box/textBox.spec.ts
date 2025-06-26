import { test } from '../../fixtures';
import { expect } from '@playwright/test';

test('Enter information in Text Boxes', async ({ textBoxPage, fullName, email, currentAddress, permanentAddress }) => {
  await textBoxPage.submitTextBoxInformation(fullName, email, currentAddress, permanentAddress);

  console.log(`Full Name: ${fullName}\nEmail: ${email}\nCurrent Address: ${currentAddress}\nPermanent Address: ${permanentAddress}`);

  await expect(textBoxPage.page.locator('#name.mb-1')).toHaveText(`Name:${fullName}`);
  await expect(textBoxPage.page.locator('#email.mb-1')).toHaveText(`Email:${email}`);
  await expect(textBoxPage.page.locator('#currentAddress.mb-1')).toHaveText(`Current Address :${currentAddress}`);
  await expect(textBoxPage.page.locator('#permanentAddress.mb-1')).toHaveText(`Permananet Address :${permanentAddress}`);
});