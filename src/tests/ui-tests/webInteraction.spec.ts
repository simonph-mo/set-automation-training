import { expect, test } from "@playwright/test";
import { WebInteraction } from "../../page-objects/WebInteraction";


test ('Basic Web Interaction', async ({page}) =>{
    const webInteration = new WebInteraction(page)

    await webInteration.navigateToUrl();
});
