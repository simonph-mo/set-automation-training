import { Page, Locator } from '@playwright/test';

export class RandomPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToAnyPage (url: string) {
    await this.page.goto(url);
  }
}