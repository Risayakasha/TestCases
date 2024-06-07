const assert = require('assert');


class LoginPage {

    get usernameTextbox() { return $('#user-name') }

    get passwordTextbox() { return $('#password') }

    get loginButton() { return $('#login-button') }

    get x() { return $('svg[class="svg-inline--fa fa-times-circle fa-w-16 error_icon"]') }

    get errorMessage() { return $('h3[data-test="error"]') }



    //enters username,password 
    //check the type of login and password fields 
    //preses button to login
    async login(username, password) {

        await this.usernameTextbox.setValue(username)
        assert.strictEqual(await this.usernameTextbox.getAttribute('type'), 'text', 'Login input field is not of type text')
        
        await this.passwordTextbox.setValue(password)
        assert.strictEqual(await this.passwordTextbox.getAttribute('type'), 'password', 'Password input field is not of type password')
        
        await this.loginButton.click()
    }


    //check for X mark and error text when entering wrong credentials 
    async checkLoginError() {
        await this.x.isExisting()
        await expect(this.errorMessage).toHaveTextContaining('Epic sadface: Username and password do not match any user in this service')
    }

}
module.exports = new LoginPage()