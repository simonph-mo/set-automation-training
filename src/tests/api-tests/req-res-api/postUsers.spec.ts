import { test, expect } from '@playwright/test';


test('Create new user', async ({ request }) => {

    const requestBody = {
        "name": "Simon",
        "job": "Software Engineer"
    }

    const response = await request.post('https://reqres.in/api/users', {
        data: requestBody
    });

    expect(response.ok());
    console.log('Status Code:', response.status());
    console.log(await response.json());
});