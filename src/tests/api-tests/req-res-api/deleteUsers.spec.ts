import { test, expect } from '@playwright/test';


test('Delete Users', async ({ request }) => {

    const id = 3
    const response = await request.delete(
        `https://reqres.in/api/users/${id}`
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(response);
});




test('Delete User with try catch', async ({ request }) => {
    const id = 3;
    const response = await request.delete(`https://reqres.in/api/users/${id}`);

    expect(response.ok()).toBeTruthy();
    console.log('Status Code:', response.status());

    try {
        const responseBody = await response.json();
        console.log(responseBody);
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        const responseText = await response.text();
        console.log('Response Text:', responseText);
    }
});