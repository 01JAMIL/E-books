const validator = require('validator')

export const validateStepOneForm = (data) => {

    let errors = {}

    if (validator.isEmpty(data.firstName)) {
        errors.firstNameError = 'First name is required!'
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastNameError = 'Last name is required!'
    }

    if (validator.isEmpty(data.birthday)) {
        errors.birthdayError = 'Birthday is required!'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }

}

export const validateStepTwoForm = (data) => {

    let errors = {}

    if (!validator.isEmail(data.email)) {
        errors.emailError = 'Format email is missing!'
    }

    if (validator.isEmpty(data.email)) {
        errors.emailError = 'Email is required!'
    }

    if (!validator.isMobilePhone(data.phone, ['ar-TN'], { strictMode: true })) {
        errors.phoneError = 'Phone format must be like +216 ** *** ***'
    }

    if (validator.isEmpty(data.phone)) {
        errors.phoneError = 'Phone is required!'
    }

    if (validator.isEmpty(data.country)) {
        errors.countryError = 'Country is required!'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}

export const validateStepThreeForm = (data) => {

    let errors = {}

    if (validator.isEmpty(data.login)) {
        errors.loginError = 'Login is required!'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required!'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}