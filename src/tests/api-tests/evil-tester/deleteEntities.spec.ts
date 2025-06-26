import { test, expect } from '@playwright/test';

test('Delete a Single Entity (only 9 is allowed)', async ({ request }) => {
    const entity = '9'

    const response = await request.delete(
        `https://apichallenges.eviltester.com/sim/entities/${entity}`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
});


test('Delete Entity that doesnt exist', async ({ request }) => {
    const entity = '5555'

    const response = await request.get(
        `https://apichallenges.eviltester.com/sim/entities/${entity}`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response.status()).toBe(404);
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});


test('Delete Entity that is not 9 - Not authorised', async ({ request }) => {
    const entity = '11'

    const response = await request.delete(
        `https://apichallenges.eviltester.com/sim/entities/`+entity,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response.status()).toBe(403);
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});


test('Delete all Entities - Not authorised', async ({ request }) => {

    const response = await request.delete(
        `https://apichallenges.eviltester.com/sim/entities`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response.status()).toBe(405);
    console.log('Status Code:', response.status());
});