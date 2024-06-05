const LoginPage = require('../pages/login.page')
const assert = require('assert');

class ProductsPage {

    get Products() {
        return $('span[class="title"]')
    }

    get CartBtn() {
        return $('#shopping_cart_container')
    }

    get CartAmnt() {
        return $('span[data-test="shopping-cart-badge"]')
    }

    get filterDropdown() {
        return $('.product_sort_container')
    }

    get BurgerBtn() {
        return $('#react-burger-menu-btn')
    }

    get Menu() {
        return $('#bm-menu-wrap')
    }

    get AllItemsBtn() {
        return $('#inventory_sidebar_link')
    }

    get AboutBtn() {
        return $('#about_sidebar_link')
    }

    get LogOutBtn() {
        return $('#logout_sidebar_link')
    }

    get ResetBtn() {
        return $('#reset_sidebar_link')
    }

    get addToCartBikeLght() {
        return $('#add-to-cart-sauce-labs-bike-light')
    }
    get twitter() {
        return $('a[data-test="social-twitter"]')
    }

    get facebook() {
        return $('a[data-test="social-facebook"]')
    }

    get linkedin() {
        return $('a[data-test="social-linkedin"]')
    }

    //Check to see if loged in
    async loginCheck() {
        await expect(this.Products).toExist()
        await expect(this.CartBtn).toExist()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    }

    async Twitterlink() {

        await this.twitter.scrollIntoView()
        await this.twitter.click()
        await browser.switchWindow('x.com')
        await expect(browser).toHaveUrl('https://x.com/saucelabs')

    }

    async Facebooklink() {
        await this.facebook.scrollIntoView()
        await this.facebook.click()
        await browser.switchWindow('facebook')
        await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs')
    }

    async Linkedinlink() {
        await this.linkedin.scrollIntoView()
        await this.linkedin.click()
        await browser.switchWindow('linkedin')
        await expect(browser).toHaveUrlContaining('linkedin.com')
    }

}
module.exports = new ProductsPage()