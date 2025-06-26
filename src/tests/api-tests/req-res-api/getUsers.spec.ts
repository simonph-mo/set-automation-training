import { test, expect } from '@playwright/test';


test('Get All Users', async ({ request }) => {
    const response = await request.get(
        `https://reqres.in/api/users`,
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(await response.json());
});

test('Get a User', async ({ request }) => {
    const id = 3;
    const response = await request.get(
        `https://reqres.in/api/users/${id}`,
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(await response.json());
});