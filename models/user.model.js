const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'author',
            required: false
        } 
    ] , 
    myBooks : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book',
            required: false
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('user', UserSchema)