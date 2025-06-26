import { test, expect } from '@playwright/test';


test ('Edit Users', async ({request}) =>{

    const requestBody = {
        "name": "Simon",
        "job": "Software Engineer"
    }

    const id = 3 ;

    const response = await request.put (
        `https://reqres.in/api/users/${id}`,

        {
            data: requestBody
        }
    )

    expect(response.ok());
    console.log('Status Code:', response.status());
    console.log(await response.json());

});