const { Given, When, Then } = require('@wdio/cucumber-framework')
const LoginPage = require('../pages/loginpage')


Given(/^User is located on the main page of saucedemo website$/, async () => {
    await browser.url('https://www.saucedemo.com/')
})

When(/^User click “Login” button$/, async () => {
    await LoginPage.loginBtn.click()
})

Then(/^User should see “Epic sadface: Username is required” error message$/, async () => {
    await expect (LoginPage.errorMsg).toHaveText(expect.stringContaining('Epic sadface: Username is required'))
})
