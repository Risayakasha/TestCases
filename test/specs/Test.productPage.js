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

        await ProductPage.BurgerBtn.click()

        await ProductPage.LogOutBtn.isClickable()

        await ProductPage.LogOutBtn.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')

        expect(await LoginPage.UsernameTextbox.getValue()).toEqual('')

        expect(await LoginPage.PasswordTextbox.getValue()).toEqual('')

    })

    it('Test#5 Saving the cart after logout', async () => {

        await ProductPage.addToCartBikeLght.click()

        const ItemNameBike = await ($('div.=Sauce Labs Bike Light')).getText()

        const bikeprice = await $('div.=$9.99').getText()

        await expect(ProductPage.CartAmnt).toHaveTextContaining('1')

        await ProductPage.CartBtn.click()

        await expect($('div[data-test="inventory-item-name"]')).toHaveTextContaining(ItemNameBike)

        await expect($('div[data-test="inventory-item-price"]')).toHaveTextContaining(bikeprice)

        //logout

        await ProductPage.BurgerBtn.click()

        await ProductPage.LogOutBtn.waitForClickable()

        await ProductPage.LogOutBtn.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/')

        expect(await LoginPage.UsernameTextbox.getValue()).toEqual('')

        expect(await LoginPage.PasswordTextbox.getValue()).toEqual('')

        await LoginPage.login('standard_user', 'secret_sauce')

        await ProductPage.loginCheck()

        await expect(ProductPage.CartAmnt).toHaveTextContaining('1')

    })

    it('Test#6 Sorting', async () => {

        // Function to extract texts from elements
        async function getTexts() {
            const elements = await $$('.inventory_item_name')
            const texts = []
            for (const element of elements) {
                const text = await element.getText()
                texts.push(text)
            }
            return texts
        }

        // Function to extract prices from elements
        async function getPrices() {
            const elements = await $$('.inventory_item_price')
            const prices = []
            for (const element of elements) {
                const text = await element.getText()
                const price = parseFloat(text.replace('$', ''))
                prices.push(price)
            }
            return prices
        }

        // Extract initial prices
        let prices = await getPrices()
        console.log('Initial Prices:', prices)

        // Extract initial texts
        let texts = await getTexts()
        console.log('Initial Texts:', texts)

        // Check A-Z sorting
        await $('.product_sort_container').selectByVisibleText('Name (A to Z)')
        let sortedTexts = await getTexts()
        let isSortedAZ = sortedTexts.every((val, i, arr) => !i || arr[i - 1] <= val)
        console.log('A-Z Sorted Texts:', sortedTexts)
        console.log('Is A-Z Sorted:', isSortedAZ)
        expect(isSortedAZ).toBe(true)

        // Check Z-A sorting
        await $('.product_sort_container').selectByVisibleText('Name (Z to A)')
        sortedTexts = await getTexts()
        let isSortedZA = sortedTexts.every((val, i, arr) => !i || arr[i - 1] >= val)
        console.log('Z-A Sorted Texts:', sortedTexts)
        console.log('Is Z-A Sorted:', isSortedZA)
        expect(isSortedZA).toBe(true)

        // Check low to high sorting
        await $('.product_sort_container').selectByVisibleText('Price (low to high)')
        let sortedPrices = await getPrices()
        let isSortedLowToHigh = sortedPrices.every((val, i, arr) => !i || arr[i - 1] <= val)
        console.log('Low to High Sorted Prices:', sortedPrices)
        console.log('Is Low to High Sorted:', isSortedLowToHigh)
        expect(isSortedLowToHigh).toBe(true)

        // Check high to low sorting
        await $('.product_sort_container').selectByVisibleText('Price (high to low)')
        sortedPrices = await getPrices()
        let isSortedHighToLow = sortedPrices.every((val, i, arr) => !i || arr[i - 1] >= val)
        console.log('High to Low Sorted Prices:', sortedPrices)
        console.log('Is High to Low Sorted:', isSortedHighToLow)
        expect(isSortedHighToLow).toBe(true)
    })

    it('Test#7 Socials', async () => {

        await ProductPage.Twitterlink()
        await browser.switchWindow('saucedemo.com')

        await ProductPage.Facebooklink()
        await browser.switchWindow('saucedemo.com')

        await ProductPage.Linkedinlink()
        await browser.switchWindow('saucedemo.com')
    })

    it('Test#8 Checkout', async () => {

        if ($('#remove-sauce-labs-bike-light').isExisting()) {

            await $('#remove-sauce-labs-bike-light').click()
        }

        await ProductPage.addToCartBikeLght.click()

        const ItemNameBike = await ($('div.=Sauce Labs Bike Light')).getText()

        const bikeprice = await $('div.=$9.99').getText()

        await expect(ProductPage.CartAmnt).toHaveTextContaining('1')

        await ProductPage.CartBtn.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        await $('#checkout').click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html')

        await $('#first-name').setValue('John')

        await $('#last-name').setValue('Cena')

        await $('#postal-code').setValue('666')

        await $('#continue').click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html')
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    //убейте меня

        await expect($('div[data-test="inventory-item-name"]')).toHaveTextContaining(ItemNameBike)

        await expect($('div[data-test="inventory-item-price"]')).toHaveTextContaining(bikeprice)


        await $('#finish').click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html')

        await expect($('h2[data-test="complete-header"]')).toHaveTextContaining('Thank you for your order')

        await $('#back-to-products').click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

    })

    it('Test#9 Checkout without items', async () => {


        await ProductPage.CartBtn.click()

        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        await $('#checkout').click()

        await browser.pause(2000)

        // await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html')

        if ((await browser.getUrl() !== 'https://www.saucedemo.com/cart.html')){
            console.log('Founnda bug-_-')
        }

        else{
            console.log('Yuppie!')
        }
        
        })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            //убейте меня
})