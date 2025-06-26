import { test } from '../../fixtures';
import { expect } from '@playwright/test';


test('Register for book store and login test', async ({ bookStoreRegistrationPage, firstname, lastname, username, password }) => {

   await bookStoreRegistrationPage.registerNewBookStoreUser(firstname, lastname, username, password);

   console.log(`Username: ${username}`);
   console.log(`Password: ${password}`);
  
   const registeredUsername = username;
   const registeredPassword = password;

   await bookStoreRegistrationPage.loginToBookStoreAccount(registeredUsername, registeredPassword);
   await expect(bookStoreRegistrationPage.page.locator('#name.mb-1')).toHaveText('Invalid username or password!');
});