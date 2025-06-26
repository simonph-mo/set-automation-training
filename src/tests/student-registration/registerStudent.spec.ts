import { test } from '../../fixtures';
import { expect } from '@playwright/test';


test('Submit Student information in the Practise Form', async ({ studentRegistrationPage, firstname, lastname, email }) => {
 await studentRegistrationPage.registerStudent(firstname, lastname, email);

 expect(await studentRegistrationPage.getModalTitleText()).toBe('Thanks for submitting the form');
});
