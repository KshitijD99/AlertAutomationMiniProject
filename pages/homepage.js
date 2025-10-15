import { HomepageLocators } from "../Locators/homepageLocators";

export class HomePage {
  //Constructor for class HomePage
  constructor(page) {
    //We have set value of local page equals to the what we pass from miniproject.spec.js -> test()
    this.page = page;
  }

  //Function for redirecting to the specifeid URL
  async goToPage() {
    try {
      //Redirected to the URL
      await this.page.goto("https://demo.automationtesting.in/Alerts.html");
    } catch (error) {
      //Handled error message in case of unexpected behaviour
      console.log(`Error message : ${error.message}`);
    }
  }

  //Function for going to desired tab to see alerts
  async NavigationBefore() {
    try {
      //Clicked on SwitchTo link
      await this.page
        .getByRole("link", { name: HomepageLocators.switchToLink })
        .click();
      //Clicked on AlertLink link
      await this.page
        .getByRole("link", { name: HomepageLocators.alertsLink })
        .click();
    } catch (error) {
      //Printing error message if any
      console.log(`Error message : ${error.message}`);
    }
  }

  //Function for Handling simple alert
  async handleSimpleAlert() {
    try {
      //Clicked on simple alert link
      await this.page
        .getByRole("link", {
          name: HomepageLocators.alertWithOkLink,
          exact: true,
        })
        .click();

      //Handled the alert box using dialog
      this.page.once("dialog", async (dialog) => {
        await dialog.accept(); // Accept the alert
      });

      //Clicked on Display alert box which'll be handled above
      await this.page
        .getByRole("button", { name: HomepageLocators.displayAlertBoxButton1 })
        .click();

      //Returned true if alert box is handled successfully
      return true;
    } catch (error) {
      //print error and return false in case any error
      console.log(`Error message : ${error.message}`);
      return false;
    }
  }

  //Function for Handling alert with OK and CANCEL button
  async handleConfirmAlert() {
    try {
      //Clikcked on Alert with OK and CANCEL link to go there
      await this.page
        .getByRole("link", {
          name: HomepageLocators.alertWithOkAndCancelLink,
          exact: true,
        })
        .click();

      //Handled the alert box using dialog
      this.page.once("dialog", async (dialog) => {
        await dialog.dismiss(); // Accept the alert
      });

      //Clicked on Alert Cancel button
      await this.page
        .getByRole("button", { name: HomepageLocators.displayAlertBoxButton2 })
        .click();

      //Stored message came after cancelling the alert
      const respectiveMessageOfOkAndCancel = await this.page
        .locator(HomepageLocators.messageAfterAcceptingAlert1)
        .textContent();
      
      //returned the message stored 
      return respectiveMessageOfOkAndCancel;

    } catch (error) {
      //print error and return false in case any error
      console.log(`Error messaage : ${error.message}`);
    }
  }

  //Function for Handling Prompt alert
  async promptAlert(prompt) {
    try {
      //Clikcked on Alert with Prompt entering link to go there
      await this.page
        .getByRole("link", {
          name: HomepageLocators.alertWithTextboxLink,
          exact: true,
        })
        .click();

      //Handled the alert box using dialog
      this.page.once("dialog", async (dialog) => {
        await dialog.accept(`${prompt}`); // Accept the alert
      });

      //Entered prompt by JSON file and then submitted alert
      await this.page
        .getByRole("button", { name: HomepageLocators.displayAlertBoxButton3 })
        .click();

      //After submitting alert store the message in respectiveMessageOfTextBox
      const respectiveMessageOfTextBox = await this.page
        .locator(HomepageLocators.messageAfterAcceptingAlert2)
        .textContent();

      //Returned the message if test passes
      return respectiveMessageOfTextBox;
    } catch (error) {
      //print error and return false in case any error
      console.log(`Error Message : ${error.message}`);
    }
  }
}
