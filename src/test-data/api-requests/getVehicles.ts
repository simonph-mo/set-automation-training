import { expect, request, APIRequestContext } from '@playwright/test';

export class getVehicles {
  
  async getVehicle(): Promise<string | undefined> {
    const apiRequestContext = await request.newContext({
      ignoreHTTPSErrors: true,
    });

    const env = 'uat';
    const response = await apiRequestContext.get(
      `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles`
    );

    expect(response.ok()).toBeTruthy();
    console.log('Status code is :', response.status());

    const jsonResponse = JSON.parse(await response.text());
    const vtn = jsonResponse.vehicles[0].vtn;
    const profileCode = jsonResponse?.vehicles[0].profiles[0].code;
    const shortDescription = jsonResponse?.vehicles[0].shortDescription;

    console.log('VTN Number is :', vtn);
    console.log('Profile code is :', profileCode);
    console.log('Short Description is :', shortDescription);

    return vtn;
  }

  
  async getVehicleUsingRequest({ request }) : Promise<string | undefined> {
   
    const env = 'uat';
    const response = await request.get(
      `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles`,
      {
            ignoreHTTPSErrors: true
      }
    );

    expect(response.ok()).toBeTruthy();
    console.log('Status code is :', response.status());

    const jsonResponse = JSON.parse(await response.text());
    const vtn = jsonResponse.vehicles[0].vtn;
    const profileCode = jsonResponse?.vehicles[0].profiles[0].code;
    const shortDescription = jsonResponse?.vehicles[0].shortDescription;

    console.log('VTN Number is :', vtn);
    console.log('Profile code is :', profileCode);
    console.log('Short Description is :', shortDescription);

    return vtn;
  }

  async getVehicleWithVtn(vtnNumber: string): Promise<string | undefined> {
    const apiRequestContext = await request.newContext({
      ignoreHTTPSErrors: true,
    });

    const env = 'uat';
    const response = await apiRequestContext.get(
      `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles/${vtnNumber}`
    );

    expect(response.ok()).toBeTruthy();
    console.log('Status code is :', response.status());

    const jsonResponse = JSON.parse(await response.text());
    const vtn = jsonResponse.vtn;
    const shortDescription = jsonResponse?.shortDescription;

    console.log('VTN Number is :', vtn);
    console.log('Short Description is :', shortDescription);

    return vtn;
  }

  
  async getVehicleWithVtnUsingRequest(vtnNumber: string, { request }): Promise<string | undefined> {
   
    const env = 'uat';
    const response = await request.get(
      `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles/${vtnNumber}`,
      {
            ignoreHTTPSErrors: true
      }
    );

    expect(response.ok()).toBeTruthy();
    console.log('Status code is :', response.status());

    const jsonResponse = JSON.parse(await response.text());
    const vtn = jsonResponse.vtn;
    const shortDescription = jsonResponse?.shortDescription;

    console.log('VTN Number is :', vtn);
    console.log('Short Description is :', shortDescription);

    return vtn;
  }
}