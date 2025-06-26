import { test, expect } from '@playwright/test';
import fs from 'fs';
import { diffAsXml } from 'diff-js-xml';

test('Compare XML responses from two environments', async ({ playwright }) => {

  // Create a new request context with SSL verification disabled
  const context = await playwright.request.newContext({
    ignoreHTTPSErrors: true
  });

  // Read the XML request bodies from files
  const xmlRequestBody = fs.readFileSync('src/tests/api-tests/quotation-service/requestBodyEnv.xml', 'utf-8');

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
      console.log("Differences found:\n");
      differences.forEach(diff => {
        const lhsMatch = diff.message.match(/lhs value \[(.*?)\]/s);
        const rhsMatch = diff.message.match(/rhs value \[(.*?)\]/s);
        const lhsValue = lhsMatch ? lhsMatch[1] : 'N/A';
        const rhsValue = rhsMatch ? rhsMatch[1] : 'N/A';
        const lhsArray = lhsValue.split('\n').map(item => item.trim());
        const rhsArray = rhsValue.split('\n').map(item => item.trim());
        lhsArray.forEach((lhs, index) => {
          if (lhs !== rhsArray[index]) {
            console.log(`Expected: ${lhs}`);
            console.log(`Actual: ${rhsArray[index]}`);
            console.log('\n--------------------------------\n');
          }
        });
      });
      throw new Error("Responses do not match");
    } else {
      console.log("Responses match 100%");
    }

    expect(differences.length).toBe(0);
  });
});