import test, { Page } from "@playwright/test";
import { StringDecoder } from "string_decoder";

export class WebInteraction {

private readonly url: string

constructor (private readonly page: Page){
    this.url = 'https://demoqa.com/automation-practice-form'
}

async navigateToUrl (){
    await this.page.goto(this.url)
}



}