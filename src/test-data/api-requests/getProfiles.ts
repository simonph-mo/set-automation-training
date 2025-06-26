import { expect, request, APIRequestContext } from '@playwright/test';

export class getProfiles {
  
  async getProfile(): Promise<string | undefined> {
    const apiRequestContext = await request.newContext({
      ignoreHTTPSErrors: true,
    });

    const env = 'uat';
    const response = await apiRequestContext.get(
      `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles`
    );

    expect(response.ok()).toBeTruthy();
    console.log('Status code is :', response.status());

    const jsonResponse = JSON.parse(await response.text());
    const vtnObject = jsonResponse.profiles[0]?.vehicle;
    const vtnNumber = vtnObject?.vtn;
    console.log('VTN Number is :', vtnNumber);

    return vtnNumber;
  }

  
  async getProfileUsingRequest({ request }): Promise<string | undefined> {
   
    const env = 'uat';
    const response = await request.get(
      `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles`,
      {
            ignoreHTTPSErrors: true
      }
    );

    expect(response.ok()).toBeTruthy();
    console.log('Status code is :', response.status());

    const jsonResponse = JSON.parse(await response.text());
    const vtnObject = jsonResponse.profiles[0]?.vehicle;
    const vtnNumber = vtnObject?.vtn;
    console.log('VTN Number is :', vtnNumber);

    return vtnNumber;
  }


 async getProfileCode(code: string): Promise<string | undefined> {
    const apiRequestContext = await request.newContext({
    ignoreHTTPSErrors: true,
  });

  const env = 'uat';
  const response = await apiRequestContext.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles/${code}`
  );

  expect(response.ok()).toBeTruthy();
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const profileCode = jsonResponse.code;
  const vehicleObject = jsonResponse.vehicle;
  const vtnNumber = vehicleObject?.vtn;
  //console.log('Profile code is :', profileCode);
  //console.log('Vehicle is :', vehicleObject);
  console.log('VTN Number is :', vtnNumber);

  await apiRequestContext.dispose();
  return vtnNumber;
  }
  
  
  async getProfileCodeUsingRequest(code: string, { request }): Promise<string | undefined> {
   
  const env = 'uat';
  const response = await request.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles/${code}`,
    {
            ignoreHTTPSErrors: true
    }
  );

  expect(response.ok()).toBeTruthy();
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const profileCode = jsonResponse.code;
  const vehicleObject = jsonResponse.vehicle;
  const vtnNumber = vehicleObject?.vtn;
  //console.log('Profile code is :', profileCode);
  //console.log('Vehicle is :', vehicleObject);
  console.log('VTN Number is :', vtnNumber);
  return vtnNumber;
  }

}