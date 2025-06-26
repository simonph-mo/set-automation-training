import { test, expect } from '@playwright/test';


test('Get All Entities', async ({ request }) => {
    const response = await request.get(
        `https://apichallenges.eviltester.com/sim/entities`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});


test('Head Entities', async ({ request }) => {
    const response = await request.head(
        `https://apichallenges.eviltester.com/sim/entities`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log('Headers:', response.headers());
});


test('Get a Single Entity', async ({ request }) => {
    const entity = '10'

    const response = await request.get(
        `https://apichallenges.eviltester.com/sim/entities/${entity}`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});


test('Get Entity that doesnt exist', async ({ request }) => {
    const entity = '5555'

    const response = await request.get(
        `https://apichallenges.eviltester.com/sim/entities/`+entity,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response.status()).toBe(404);
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});