import { test, expect } from '@playwright/test';


test('Amend existing Entity using PUT', async ({ request }) => {

    interface rules{ 
        id: number,
        name: string,
        description: string
     }

     const body: rules = {
        "id": 10,
        "name": "Test",
        "description": "Test the builder can you fix it?"
     }

     const entity = 10

    const response = await request.put(
        `https://apichallenges.eviltester.com/sim/entities/`+entity,
        {
            data: body,
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});