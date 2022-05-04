const validator = require('validator')
const isEmpty = require('./isEmplty')

module.exports = function validateUser(data) {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.phone = !isEmpty(data.phone) ? data.phone : ''
    data.country = !isEmpty(data.country) ? data.country : ''
    data.birthday = !isEmpty(data.birthday) ? data.birthday : ''
    data.login = !isEmpty(data.login) ? data.login : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    
    if (validator.isEmpty(data.firstName)) {
        errors.firstNameError = 'First name is required!'
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastNameError = 'Last name is required!'
    }

    if (validator.isEmpty(data.email)) {
        errors.emailError = 'Email is required!'
    }

    if (!validator.isEmail(data.email)) {
        errors.emailError = 'Format email is missing!'
    }

    if (validator.isEmpty(data.phone)) {
        errors.phoneError = 'Phone is required!'
    }

    if (!validator.isMobilePhone(data.phone, ['ar-TN'], {strictMode: true})) {
        errors.phoneError = 'Phone format must be like +216 ** *** ***'
    }

    if (validator.isEmpty(data.country)) {
        errors.countryError = 'Country is required!'
    }

    if (validator.isEmpty(data.birthday)) {
        errors.birthdayError = 'Birthday is required!'
    }

    if (validator.isEmpty(data.login)) {
        errors.loginError = 'Login is required!'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required!'
    }

    return {
        errors,
        validUser: isEmpty(errors)
    }
}