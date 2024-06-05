const assert = require('assert');


class LoginPage{

    get UsernameTextbox(){
        return $('#user-name')
    }

    get PasswordTextbox(){
        return $('#password')
    }

    get LoginButton(){
        return $('#login-button')
    }

    get X(){
        return $('svg[class="svg-inline--fa fa-times-circle fa-w-16 error_icon"]')
    }
    
    get ErrorMessage(){
        return $('h3[data-test="error"]')
    }



    //enters username,password 
    //check the type of login and password fields 
    //preses button to login
    async login(username,password){

        await this.UsernameTextbox.setValue(username)
        assert.strictEqual(await this.UsernameTextbox.getAttribute('type'), 'text', 'Login input field is not of type text')

        await this.PasswordTextbox.setValue(password)
        assert.strictEqual(await this.PasswordTextbox.getAttribute('type'), 'password', 'Password input field is not of type password')

        await this.LoginButton.click()
    }
    
    
    //check for X mark and error text when entering wrong credentials 
    async checkLoginError(){
        await this.X.isExisting()
        await expect(this.ErrorMessage).toHaveTextContaining('Epic sadface: Username and password do not match any user in this service')
    }
    
}
module.exports = new LoginPage()