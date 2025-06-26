import { test } from "@playwright/test";
import { Numbers } from "../../page-objects/Numbers";

test ('Sum of Array', async ({page}) =>{

const numbers: number[] = [1,2,3,4,5,6];
let sum: number = 0;

for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
}

console.log('Sum of array numbers = ' + sum);
});


test ('Sum of Array from a page object function', async ({page}) =>{
const numberPage = new Numbers();
const numbers: number[] = [22, 22];

const sum = await numberPage.calculateSumOfArray(numbers)
console.log('Sum of array elements:', sum);

});