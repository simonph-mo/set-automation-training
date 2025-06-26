import { test, expect, request } from '@playwright/test';
import fs from 'fs';
import { diffAsXml } from 'diff-js-xml';
import chalk from 'chalk';

const testData = [
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'Subsidy' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'Profit' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'AP' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'Discount' },
  { vehicleType: 'CAR', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'PIP', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'WPMS', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'ADP', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Financial Lease', awardType: 'CDP', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'PIP', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'WPMS', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'ADP', calcType: 'Subsidy' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'Profit' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'AP' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'Discount' },
  { vehicleType: 'WAV', profileType: 'Constant Lease', awardType: 'CDP', calcType: 'Subsidy' },
];

testData.forEach(({ vehicleType, profileType, awardType, calcType }) => {
  test(`Compare XML responses for ${vehicleType}, ${profileType}, ${awardType}, ${calcType}`, async ({ playwright }) => {

    // Create a new request context with SSL verification disabled
    const context = await playwright.request.newContext({
    ignoreHTTPSErrors: true
    });

    // Read the XML request body from file
    let xmlRequestBody = fs.readFileSync('src/tests/api-tests/quotation-service/requestBodyEnv.xml', 'utf-8');

    // Modify the XML request body based on the current test data
    xmlRequestBody = xmlRequestBody.replace(
      /<Value AttributeID="ATT_VehicleType">.*?<\/Value>/,
      `<Value AttributeID="ATT_VehicleType">${vehicleType}</Value>`
    );
    xmlRequestBody = xmlRequestBody.replace(
      /<Value AttributeID="ATT_ProfileType">.*?<\/Value>/,
      `<Value AttributeID="ATT_ProfileType">${profileType}</Value>`
    );
    xmlRequestBody = xmlRequestBody.replace(
      /<Value AttributeID="ATT_PIP_ProfileType">.*?<\/Value>/,
      `<Value AttributeID="ATT_PIP_ProfileType">${profileType}</Value>`
    );
    xmlRequestBody = xmlRequestBody.replace(
      /<Value AttributeID="ATT_AwardType">.*?<\/Value>/,
      `<Value AttributeID="ATT_AwardType">${awardType}</Value>`
    );
    xmlRequestBody = xmlRequestBody.replace(
      /<Value AttributeID="ATT_CalcType">.*?<\/Value>/,
      `<Value AttributeID="ATT_CalcType">${calcType}</Value>`
    );

    // Conditionally modify ATT_LeaseLength based on vehicleType
    if (vehicleType === 'CAR') {
      xmlRequestBody = xmlRequestBody.replace(
        /<Value AttributeID="ATT_LeaseLength">.*?<\/Value>/,
        `<Value AttributeID="ATT_LeaseLength">36</Value>`
      );
    } else if (vehicleType === 'WAV') {
      xmlRequestBody = xmlRequestBody.replace(
        /<Value AttributeID="ATT_LeaseLength">.*?<\/Value>/,
        `<Value AttributeID="ATT_LeaseLength">60</Value>`
      );
    }

    //Log the modified XML request body
    console.log('Modified XML Request Body:', xmlRequestBody);

    
    // First environment
    const response1 = await context.post('https://quotation-service-pricing-uat.apps.cmp-nonprod.theosmo.com/api/v1/quote', {
      data: xmlRequestBody,
      headers: {
        'Content-Type': 'application/xml'
      }
    });
    const xmlResponse1 = await response1.text();

    // Print out xmlResponse1
    if (response1.ok()) {
      console.log('xmlResponse1:', xmlResponse1);
    } else {
      console.error('Request failed:', response1.status(), response1.statusText());
      console.error('Response body:', xmlResponse1);
    }

    // Second environment
    const response2 = await context.post('https://quotation-service-pricing-dev.apps.cmp-nonprod.theosmo.com/api/v1/quote', {
      data: xmlRequestBody,
      headers: {
        'Content-Type': 'application/xml'
      }
    });
    const xmlResponse2 = await response2.text();

    // Print out xmlResponse2
    if (response2.ok()) {
      console.log('xmlResponse2:', xmlResponse2);
    } else {
      console.error('Request failed:', response2.status(), response2.statusText());
      console.error('Response body:', xmlResponse2);
    }

    // Compare the two XML responses
    const options = { compareElementValues: true }; // Define options if needed

    diffAsXml(xmlResponse1, xmlResponse2, undefined, options, (result) => {
      const differences = result.filter(diff => diff.resultType === 'difference in element value');

      if (differences.length > 0) {
        console.log(chalk.yellow("Differences found:\n"));
        differences.forEach(diff => {
          const lhsMatch = diff.message.match(/lhs value \[(.*?)\]/s);
          const rhsMatch = diff.message.match(/rhs value \[(.*?)\]/s);
          const lhsValue = lhsMatch ? lhsMatch[1] : 'N/A';
          const rhsValue = rhsMatch ? rhsMatch[1] : 'N/A';
          const lhsArray = lhsValue.split('\n').map(item => item.trim());
          const rhsArray = rhsValue.split('\n').map(item => item.trim());
          lhsArray.forEach((lhs, index) => {
            if (lhs !== rhsArray[index]) {
              console.log(chalk.green(`Expected: ${lhs}`));
              console.log(chalk.red(`Actual: ${rhsArray[index]}`));
              console.log('\n--------------------------------\n');
            }
          });
        });
        throw new Error("Responses do not match");
      } else {
        console.log(chalk.green("Responses match 100%"));
      }

      expect(differences.length).toBe(0);
    });
  });
});