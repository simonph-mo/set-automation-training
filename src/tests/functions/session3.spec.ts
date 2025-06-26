import { faker } from '@faker-js/faker';
import test from '@playwright/test';

const myRandomNumber = randomNumber();

function randomNumber(): number {
    return Math.floor(Math. random() * 10) + 1;
}

function addTwoNumbers(a: number, b: number): number {
    return a + b;
}

function addTwoNumbersSecondDefault(a: number, b = 10): number {
    return a + b;
}

function addTwoOrThreeNumbers(a: number, b: number, c?: number): number {
    return a + b + (c || 0);
}

test('Sample functions', async ({ page }) => {
    const myRandomNumber = randomNumber();
    console.log(`Random number: ${myRandomNumber}`);

    const sum2 = addTwoNumbers(1, 2);
    console.log(`Sum: ${sum2}`);

    const sum1 = addTwoNumbersSecondDefault(2, 2);
    console.log(`Sum: ${sum1}`);

    const sum3 = addTwoOrThreeNumbers(2, 2, 2);
    console.log(`Sum: ${sum3}`);
});