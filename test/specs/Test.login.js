const LoginPage = require('../pages/login.page')
const ProductPage = require('../pages/products.page')

describe('Login page', function () {

    this.beforeEach(async () => {
        
        browser.url('https://www.saucedemo.com/')

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')

    })

    it('Test#1 Loggin in with valid credentials', async () => {

        await LoginPage.login('standard_user','secret_sauce')

        await ProductPage.loginCheck()

    })

    it('Test#2 Logging in with invalid password', async () => {

        await LoginPage.login('standard_user', 'not_so_secret_sauce')

        await LoginPage.checkLoginError()

    })

    it('Test#3 Logging in with invalid login', async () => {

        await LoginPage.login('standard_user1337', 'secret_sauce')

        await LoginPage.checkLoginError()

    })


})