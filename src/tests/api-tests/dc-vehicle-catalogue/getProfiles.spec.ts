import { expect, request, test } from '@playwright/test';
import { getProfiles } from '../../../test-data/api-requests/getProfiles';

test('Get Profile', async () => { 
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

  await apiRequestContext.dispose();
});


test('Get Profile VTN with request', async ({ request }) => {
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
});


test('Get Profile Code', async () => { 
  const apiRequestContext = await request.newContext({
    ignoreHTTPSErrors: true,
  });

  const env = 'uat';
  const response = await apiRequestContext.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles/C-02EC`
  );

  expect(response.ok()).toBeTruthy();
  console.log('Status code is :', response.status());

  const jsonResponse = JSON.parse(await response.text());
  const profileCode = jsonResponse.code;
  const vehicleObject = jsonResponse.vehicle;
  const vtnNumber = vehicleObject?.vtn;
  console.log('Profile code is :', profileCode);
  // console.log('Vehicle is :', vehicleObject);
  // console.log('VTN Number is :', vtnNumber);

  await apiRequestContext.dispose();
});


test('Get Profile Code with request', async ({request}) => { 
  const env = 'uat';
  const response = await request.get(
    `https://dc-testing-proxy-dc-${env}.apps.cmp-nonprod.theosmo.com/vehicle-catalogue/api/v1/profiles/C-02EC`,
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
});


test('Get Profiles', async ({}) => {
  const apiResponse = new getProfiles();
  await apiResponse.getProfile();
});

test('Get Profiles using Request', async ({request}) => {
  const apiResponse = new getProfiles();
  await apiResponse.getProfileUsingRequest({ request });
});

test('Get Profile Code function', async ({}) => {
  const apiResponse = new getProfiles();
  await apiResponse.getProfileCode('C-02EC');
});

test('Get Profile Code using request', async ({request}) => {
  const apiResponse = new getProfiles();
  await apiResponse.getProfileCodeUsingRequest('C-02EC',{ request });
});
