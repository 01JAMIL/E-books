const validator = require('validator')


module.exports = function validateBook (data, file) {
    let errors = {}

    if (file === undefined) {
        errors.imageError = 'Author image is required!' 
    }

    if (validator.isEmpty(data.title)) {
        errors.titleError = 'Book title is required!' 
    }

    if (validator.isEmpty(data.country)) {
        errors.countryError = 'Book country is required!' 
    }

    if (validator.isEmpty(data.language)) {
        errors.languageError = 'Book language is required!' 
    }

    if (validator.isEmpty(data.year)) {
        errors.yearError = 'Book year is required!' 
    }

    if (validator.isEmpty(data.author)) {
        errors.authorError = 'Book author is required!' 
    }

    return {
        errors,
        valid: Object.keys(errors).length == 0 
    }
}