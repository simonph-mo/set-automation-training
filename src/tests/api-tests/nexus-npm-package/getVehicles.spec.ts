import { VehicleCatalogueVehiclesApi } from '@mo/qe-vehicle-catalogue-api/vehicleCatalogueApi';
import { test as base, expect, request } from '@playwright/test';

const test = base.extend<{
  vehicleCatalogueVehiclesApi: VehicleCatalogueVehiclesApi;
}>({
  vehicleCatalogueVehiclesApi: async ({}, use) => {
    const api = new VehicleCatalogueVehiclesApi();
    await use(api);
  },
});



test('Get Vehicles API', async ({vehicleCatalogueVehiclesApi}) => {
  const getVehicle = await vehicleCatalogueVehiclesApi.getVehicles(); 

  const vtn = getVehicle?.vehicles[0].vtn;
  console.log('VTN is :', vtn);
  //console.log(getVehicle);
  //console.log(getVehicle?.vehicles[0]);
});

test('Get Vehicles with VTN', async ({vehicleCatalogueVehiclesApi}) => {
  const getVehicle = await vehicleCatalogueVehiclesApi.getVehicle('393743');

  const vtn = getVehicle?.vtn;
  console.log('VTN is :', vtn);
  //console.log(getVehicle);
  //console.log(getVehicle?.capId);
});