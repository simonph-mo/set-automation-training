import { test, expect } from '@playwright/test';
import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

test('Compare XML responses from two environments', async ({ playwright }) => {
  const parser = new XMLParser();

  // Create a new request context with SSL verification disabled
  const context = await playwright.request.newContext({
    ignoreHTTPSErrors: true
  });

  // Read the XML request1 bodies from files
  const xmlRequestBody = fs.readFileSync('src/tests/api-tests/quotation-service/requestBodyEnv.xml', 'utf-8');

    // First environment
    const response1 = await context.post('https://quotation-service-pricing-uat.apps.cmp-nonprod.theosmo.com/api/v1/quote', {
      data: xmlRequestBody,
      headers: {
        'Content-Type': 'application/xml'
      }
    });
    const xmlResponse1 = await response1.text();
    const jsonResponse1 = parser.parse(xmlResponse1);

    // Print out jsonResponse1
    if (response1.ok()) {
      console.log('jsonResponse1:', JSON.stringify(jsonResponse1, null, 2));
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
  const jsonResponse2 = parser.parse(xmlResponse2);

  // Print out jsonResponse2
  if (response2.ok()) {
    console.log('jsonResponse2:', JSON.stringify(jsonResponse2, null, 2));
  } else {
    console.error('Request failed:', response2.status(), response2.statusText());
    console.error('Response body:', xmlResponse2);
  }


  // Compare the two JSON responses
  function findDifferences(expected: any, actual: any, path = ''): string[] {
    let differences: string[] = [];
    for (let key in expected) {
      const currentPath = path ? `${path}.${key}` : key;
      if (typeof expected[key] === 'object' && expected[key] !== null && actual[key] !== null) {
        differences = differences.concat(findDifferences(expected[key], actual[key], currentPath));
      } else if (expected[key] !== actual[key]) {
        differences.push(`Path: ${currentPath} - Expected: ${expected[key]}, but got: ${actual[key]}`);
      }
    }
    return differences;
  }
  
  const differences = findDifferences(jsonResponse1, jsonResponse2);
  
  if (differences.length > 0) {
    console.log("Differences found:\n" + differences.join("\n"));
    throw new Error("Responses do not match");
  } else {
    console.log("Responses match 100%");
  }
  
  expect(differences.length).toBe(0);
  
});