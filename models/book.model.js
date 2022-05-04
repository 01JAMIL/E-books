const mongoose = require('mongoose');
const schema = mongoose.Schema

const BookSchema = new schema({
    title: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('book', BookSchema);