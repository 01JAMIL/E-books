const validator = require('validator')


module.exports = function validateAuthor (data, file) {
    let errors = {}

    if (file === undefined) {
        errors.imageError = 'Author image is required!' 
    }

    if (validator.isEmpty(data.firstName)) {
        errors.fNameError = 'First name is required!' 
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lNameError = 'Last name is required!' 
    }

    if (validator.isEmpty(data.country)) {
        errors.countryError = 'Country is required!' 
    }

    if (validator.isEmpty(data.birthday)) {
        errors.birthDayError = 'Birthday is required!' 
    }

    return {
        errors,
        valid: Object.keys(errors).length == 0 
    }
}