const LoginPage = require('../pages/login.page')
const assert = require('assert');

class ProductsPage {

    get products() { return $('span[class="title"]') }

    get cartBtn() { return $('#shopping_cart_container') }

    get cartAmnt() { return $('span[data-test="shopping-cart-badge"]') }

    get filterDropdown() { return $('.product_sort_container') }

    get burgerBtn() { return $('#react-burger-menu-btn') }

    get menu() { return $('#bm-menu-wrap') }

    get allItemsBtn() { return $('#inventory_sidebar_link') }

    get aboutBtn() { return $('#about_sidebar_link') }

    get logOutBtn() { return $('#logout_sidebar_link') }

    get resetBtn() { return $('#reset_sidebar_link') }

    get addToCartBikeLght() { return $('#add-to-cart-sauce-labs-bike-light') }

    get itemNameBike() { return $('div.=Sauce Labs Bike Light').getText() }

    get itemPriceBike() { return $('div.=$9.99').getText() }

    get firstNameInput() { return $('#first-name') }

    get lastNameInput() { return $('#last-name') }

    get postalInput() { return $('#postal-code') }

    get sortSelector() { return $('.product_sort_container') }

    get twitter() { return $('a[data-test="social-twitter"]') }

    get facebook() { return $('a[data-test="social-facebook"]') }

    get linkedin() { return $('a[data-test="social-linkedin"]') }

    //Check to see if loged in
    async loginCheck() {
        await expect(this.products).toExist()
        await expect(this.cartBtn).toExist()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    }

    async logout() {
        await this.burgerBtn.click()
        await this.logOutBtn.isClickable()
        await this.logOutBtn.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/')
        expect(await LoginPage.usernameTextbox.getValue()).toEqual('')
        expect(await LoginPage.passwordTextbox.getValue()).toEqual('')
    }

    async addToCart() {
        if (await $('#remove-sauce-labs-bike-light').isExisting()) {
            await $('#remove-sauce-labs-bike-light').click()
        }
        await this.addToCartBikeLght.click()
    }

    async cartCheck() {
        await expect(await this.cartAmnt).toHaveTextContaining('1')
        await this.cartBtn.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        await expect($('div[data-test="inventory-item-name"]')).toHaveTextContaining(await this.itemNameBike)
        await expect($('div[data-test="inventory-item-price"]')).toHaveTextContaining(await this.itemPriceBike)
    }

    async checkout() {
        await $('#checkout').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')
        await this.firstNameInput.setValue('John')
        await this.lastNameInput.setValue('Cena')
        await this.postalInput.setValue('666')
        await $('#continue').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
        await expect($('div[data-test="inventory-item-name"]')).toHaveTextContaining(await this.itemNameBike)
        await expect($('div[data-test="inventory-item-price"]')).toHaveTextContaining(await this.itemPriceBike)
        await $('#finish').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')
        await expect($('h2[data-test="complete-header"]')).toHaveTextContaining('Thank you for your order')
        await $('#back-to-products').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    }

    async checkoutNoItems() {
        await this.cartBtn.click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
        await $('#checkout').click()
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')
    }

    async getNames() {
        const elements = await $$('.inventory_item_name')
        const texts = []
        for (const element of elements) {
            const text = await element.getText()
            texts.push(text)
        }
        return texts
    }
    async getPrices() {
        const elements = await $$('.inventory_item_price')
        const prices = []
        for (const element of elements) {
            const text = await element.getText()
            const price = parseFloat(text.replace('$', ''))
            prices.push(price)
        }
        return prices
    }
    async sortingAZ() {
        await this.sortSelector.selectByVisibleText('Name (A to Z)')
        let sortedTexts = await this.getNames()
        let isSortedAZ = sortedTexts.every((val, i, arr) => !i || arr[i - 1] <= val)
        expect(isSortedAZ).toBe(true)
    }
    async sortingZA() {
        await this.sortSelector.selectByVisibleText('Name (Z to A)')
        let sortedTexts = await this.getNames()
        let isSortedZA = sortedTexts.every((val, i, arr) => !i || arr[i - 1] >= val)
        expect(isSortedZA).toBe(true)
    }
    async sortingLH() {
        await this.sortSelector.selectByVisibleText('Price (low to high)')
        let sortedPrices = await this.getPrices()
        let isSortedLowToHigh = sortedPrices.every((val, i, arr) => !i || arr[i - 1] <= val)
        expect(isSortedLowToHigh).toBe(true)
    }
    async sortingHL() {
        await this.sortSelector.selectByVisibleText('Price (high to low)')
        let sortedPrices = await this.getPrices()
        let isSortedHighToLow = sortedPrices.every((val, i, arr) => !i || arr[i - 1] >= val)
        expect(isSortedHighToLow).toBe(true)
    }
    async sortingCheck() {

        await this.sortingAZ()
        await this.sortingZA()
        await this.sortingLH()
        await this.sortingHL()

    }

    async twitterlink() {
        await this.twitter.scrollIntoView()
        await this.twitter.click()
        await browser.switchWindow('x.com')
        await expect(browser).toHaveUrl('https://x.com/saucelabs')
        await browser.switchWindow('saucedemo.com')
    }

    async facebooklink() {
        await this.facebook.scrollIntoView()
        await this.facebook.click()
        await browser.switchWindow('facebook')
        await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs')
        await browser.switchWindow('saucedemo.com')
    }

    async linkedinlink() {
        await this.linkedin.scrollIntoView()
        await this.linkedin.click()
        await browser.switchWindow('linkedin')
        await expect(browser).toHaveUrlContaining('linkedin.com')
        await browser.switchWindow('saucedemo.com')
    }

}
module.exports = new ProductsPage()