'use strict';

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";
import testData from '../util/testData.json' assert {type:'json'};

//Used test function to write a test case
test("MiniProject", async ({ browser }) => {
  
  //Made a new context of browser by using "browser" fixture
  const context = await browser.newContext();
  //Made a new page using context which is made
  const page = await context.newPage();
  
  //Instantiated HomePage 
  const homepageobj=new HomePage(page);

  //Naviagated to URL using goto 
  await homepageobj.goToPage();
  //Completed all navigation steps before handling alerts
  await homepageobj.NavigationBefore();


  console.log("----Simple Alert----");
  //Called handleSimpleAlert() to handle alert 
  const simpleAlertMsg= await homepageobj.handleSimpleAlert();
  console.log(simpleAlertMsg);
  //If return value is true then PASS else FAIL
  expect(simpleAlertMsg).toBeTruthy();


  console.log("----Dismiss Alert----");
  //Called handleConfirmAlert() for handling alert with OK and Cancel Button 
  const dismissAlertMsg = await homepageobj.handleConfirmAlert();
  console.log(dismissAlertMsg);
  //If dismissAlertMsg contains Cancel keyword then PASS else FAIL
  expect(dismissAlertMsg).toContain("Cancel");


  console.log("----Prompt Alert----");
  //Called promptAlert() for handling alert which needs text input
  const prommptAlertMsg=await homepageobj.promptAlert(testData.userName);

  console.log(prommptAlertMsg);
  //If return value contains name then PASS else FAIL
  expect(prommptAlertMsg).toContain(testData.userName);
  

});




