import { expect, request, test } from '@playwright/test';
import { getVehicles } from '../../../test-data/api-requests/getVehicles';
import { get } from 'http';

test('Get Vehicle', async () => {                           
  const apiRequestContext = await request.newContext({
    ignoreHTTPSErrors: true,
  });

  const env = 'uat';
  const response = await apiRequestContext.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles`
  );

  expect(response.status()).toBe(200);
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const vehicleObject = jsonResponse.vehicles[0]; 
  const vtn = vehicleObject?.vtn;
  const profileCode = vehicleObject?.profiles[0].code;
  const shortDescription = vehicleObject?.shortDescription;

  console.log('VTN Number is :', vtn);
  console.log('Profile code is :', profileCode);
  console.log('Short Description is :', shortDescription);

  await apiRequestContext.dispose();
});

test('Get Vehicle with request', async ({ request }) => {                           

  const env = 'uat';
  const response = await request.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles`,
    {
            ignoreHTTPSErrors: true
    }
  );

  expect(response.status()).toBe(200);
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const vehicleObject = jsonResponse.vehicles[0]; 
  const vtn = vehicleObject?.vtn;
  const profileCode = vehicleObject?.profiles[0].code;
  const shortDescription = vehicleObject?.shortDescription;

  console.log('VTN Number is :', vtn);
  console.log('Profile code is :', profileCode);
  console.log('Short Description is :', shortDescription);
});


test('Get Vehicle with VTN', async () => {                           
  const apiRequestContext = await request.newContext({
    ignoreHTTPSErrors: true,
  });

  const env = 'uat';
  const response = await apiRequestContext.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles/393743`
  );

  expect(response.status()).toBe(200);
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const vtn = jsonResponse?.vtn;
  const shortDescription = jsonResponse?.shortDescription;
  
  console.log('Full response :', jsonResponse);
  console.log('VTN Number is :', vtn);
  console.log('Short Description is :', shortDescription);

  await apiRequestContext.dispose();
});


test('Get Vehicle with VTN using request', async ({request}) => {                           
  const env = 'uat';
  const response = await request.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/vehicles/393743`,
    {
            ignoreHTTPSErrors: true
    }
  );

  expect(response.status()).toBe(200);
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const vtn = jsonResponse?.vtn;
  const shortDescription = jsonResponse?.shortDescription;

  console.log('Full response :', jsonResponse);
  console.log('VTN Number is :', vtn);
  console.log('Short Description is :', shortDescription);
});



test('Get Vehicle using function', async ({}) => {
  const apiResponse = new getVehicles();
  await apiResponse.getVehicle();
});

test('Get Vehicle VTN using Request', async ({request}) => {
  const apiResponse = new getVehicles();
  await apiResponse.getVehicleUsingRequest({request});
});

test('Get Vehicle with vtn param', async ({}) => {
  const apiResponse = new getVehicles(); ;
  await apiResponse.getVehicleWithVtn('393743');
});

test('Get Vehicle with vtn param and request', async ({request}) => {
  const apiResponse = new getVehicles(); ;
  await apiResponse.getVehicleWithVtnUsingRequest('393743', { request }); 
});

