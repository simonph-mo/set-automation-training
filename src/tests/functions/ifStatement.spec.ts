import { test } from "@playwright/test";
import { Numbers } from "../../page-objects/Numbers";

test ('If number is negative or positive', async ({page}) =>{
const num = 0
console.log ('Number is ' + num);

if (num > 0) {
    console.log('The number is positive');
} else if (num < 0) {
    console.log('The number is negative');
} else {
    console.log('The number is zero');
}

});


test ('If number is negative or positive using page object function', async ({page}) =>{
const numberPage = new Numbers();

const sum = await numberPage.checkNumber(1010);
console.log(sum);

});