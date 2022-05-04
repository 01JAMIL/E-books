const mongoose = require('mongoose');
const schema = mongoose.Schema

const AuthorSchema = new schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    birthday: {
        type: String,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model('author', AuthorSchema)