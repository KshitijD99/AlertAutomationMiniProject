import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout:60000,
  workers:2,
  retries:1,
  expect:{
    timeout:60000
  },

  reporter:[['html'],['allure-playwright']],

  projects: [
    {
      name:'Safari',
      use:{
        trace:'on',
        headless:false,
        browserName:'webkit',
      }
    }
    
  ]

});