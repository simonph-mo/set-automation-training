import { test, expect } from '@playwright/test';


test('Get Profiles by VTN', async ({ request }, testInfo) => {
    const params = new URLSearchParams({ vtn: '720083' });

    const response = await request.get(
        `https://dc-testing-proxy-dc-e2e.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles?${params.toString()}`,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});
