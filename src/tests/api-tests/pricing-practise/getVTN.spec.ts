import { test, expect } from '@playwright/test';

test('Get All Pricing VTNs', async ({ request }, testInfo) => {
    
    const response = await request.get(
        'https://dc-testing-proxy-dc-e2e.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles/',
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(),null, 2));
});

test('Get Specific VTN', async ({ request }, testInfo) => {
    
    const vtn = '720083'

    const response = await request.get(
        'https://dc-testing-proxy-dc-e2e.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles/'+vtn,
        {
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(),null, 2));
});