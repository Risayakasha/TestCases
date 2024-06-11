class LoginPage{
    get loginBtn(){
        return $('#login-button')
    }
    get errorMsg(){
        return $('h3[data-test="error"]')
    }
}
module.exports = new LoginPage()