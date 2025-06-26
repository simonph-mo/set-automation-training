import { test, expect } from '@playwright/test';


test('Create New Entity', async ({ request }) => {

    interface rules{ 
        name: string,
        description: string
     }

     const body: rules = {
        "name": "Simon",
        "description": "Testing the builder can you fix it?"
     }

    const response = await request.post(
        `https://apichallenges.eviltester.com/sim/entities`,
        {
            data: body,
            ignoreHTTPSErrors: true
        }
    );
    expect(response).toBeOK();
    console.log('Status Code:', response.status());
    console.log(JSON.stringify(await response.json(), null, 2));
});


test('Amend existing Entity using POST', async ({ request }) => {

    interface rules{ 
        id: number,
        name: string,
        description: string
     }

     const body: rules = {
        "id": 10,
        "name": "bobby",
        "description": "Test the builders can you fix it?"
     }

     const entity = '10'

    const response1 = await request.post(
        `https://apichallenges.eviltester.com/sim/entities/`+entity,
        {
            data: body,
            ignoreHTTPSErrors: true
        }
    );
    expect(response1).toBeOK();
    console.log('Status Code:', response1.status());
    console.log(JSON.stringify(await response1.json(), null, 2));
});