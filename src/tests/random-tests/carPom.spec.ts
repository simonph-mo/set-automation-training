import { test, expect, Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

  class Car {
    manufacturer: string;
    edition: string;
    doors: number
    constructor(make: string, model: string, numberOfDoors: number) {
        this.manufacturer = make;
        this.edition = model;
        this.doors = numberOfDoors;
    }

    isMyCarCool() : boolean {
        return this.manufacturer.toLowerCase() === 'alfa romeo';
    }
}

    test('Using a class', async ({ page }) => {
    const myCar = new Car('Tesla', 'Model S', 4);
    console.log(`Is my Alfa cool? ${myCar.isMyCarCool()}`);
    
 });