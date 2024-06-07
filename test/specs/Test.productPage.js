
const LoginPage = require('../pages/login.page')
const ProductPage = require('../pages/products.page')
const assert = require('assert')

describe('Product Page', function () {

    this.beforeEach(async () => {
        browser.url('https://www.saucedemo.com/')
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        await LoginPage.login('standard_user', 'secret_sauce')
        await ProductPage.loginCheck()
    })

    it('Test#4 Logging Out', async () => {
        await ProductPage.logout()
    })

    it('Test#5 Saving the cart after logout', async () => {
        await ProductPage.addToCart()
        await ProductPage.cartCheck()
        await ProductPage.logout()
        await LoginPage.login('standard_user', 'secret_sauce')
        await ProductPage.loginCheck()
        await ProductPage.cartCheck()
    })

    it('Test#6 Sorting', async () => {
        await ProductPage.sortingCheck()
    })

    it('Test#7 Socials', async () => {
        await ProductPage.twitterlink()
        await ProductPage.facebooklink()
        await ProductPage.linkedinlink()
    })

    it('Test#8 Checkout', async () => {
        await ProductPage.addToCart()
        await ProductPage.cartCheck()
        await ProductPage.checkout()
    })

    it('Test#9 Checkout without items', async () => {
        await ProductPage.checkoutNoItems()
    })
                                                                                                                                                                                                                                                                                                                                                                                                                                        //убейте меня
})