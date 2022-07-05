const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserVerificationSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    uniqueKey: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    expiresIn: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('userVerification', UserVerificationSchema)