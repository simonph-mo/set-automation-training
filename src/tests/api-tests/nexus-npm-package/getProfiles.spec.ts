import { test as base, expect } from '@playwright/test';
import { VehicleCatalogueProfilesApi } from '@mo/qe-vehicle-catalogue-api/vehicleCatalogueApi';



// Extend Playwright test with a fixture for vehicleCatalogueProfilesApi
const test = base.extend<{
  vehicleCatalogueProfilesApi: VehicleCatalogueProfilesApi;
}>({
  vehicleCatalogueProfilesApi: async ({}, use) => {
    await use(new VehicleCatalogueProfilesApi());
  },
});

test('Inspect NPM package', async ({}) => {
console.log(VehicleCatalogueProfilesApi);
console.log(Object.getOwnPropertyNames(VehicleCatalogueProfilesApi.prototype));
});   

test('GET Profiles from NPM package', async () => {
  const apiResponse = new VehicleCatalogueProfilesApi();

  const getProfile = await apiResponse.searchProfiles({
  active: true,
  awardType: 'PIP',
  hiddenFromOla: false
});
  const firstProfile = getProfile?.profiles[0];

  console.log('Full Response:', firstProfile);
  console.log('Vehicle Body Only:', firstProfile.vehicle);
  console.log('Vtn:', firstProfile.vehicle.vtn);
});


test('GET Profiles Codes from NPM package using fixture', async ({vehicleCatalogueProfilesApi}) => {
  //const apiResponse = new VehicleCatalogueProfilesApi(); 
  //VehicleCatalogueProfilesApi is already provided as a fixture in your test context, you do not need to instantiate it again with new VehicleCatalogueProfilesApi().

  const getProfileResponse = await vehicleCatalogueProfilesApi.getProfile('');

  const profiles = (getProfileResponse as any).profiles;

  const vehicle = profiles[0].vehicle;
  const vtn = profiles[0].vehicle.vtn;

  console.log('Vehicle:', vehicle);
  console.log('VTN :', vtn);
  
});


test('GET Profiles Codes entered from NPM package using fixture', async ({vehicleCatalogueProfilesApi}) => {
  
  const getProfileCodeResponse = await vehicleCatalogueProfilesApi.getProfile('C-02EC');

  //console.log('Profile code response:', getProfileCodeResponse);
  const vehicle = getProfileCodeResponse.vehicle;
  const vtn = getProfileCodeResponse.vehicle.vtn;

  //console.log('Vehicle:', vehicle);
  console.log('VTN :', vtn);
  
});




