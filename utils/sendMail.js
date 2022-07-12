const nodeMailer = require('nodemailer')
const nodeMailerSmtpTransport = require('nodemailer-smtp-transport')

const generateUniqueCode = () => {
    return Math.round(Math.random() * (99999 - 10000) + 10000).toString()
}

const mailTransport = () => nodeMailer.createTransport(nodeMailerSmtpTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}))



module.exports = {
    generateUniqueCode,
    mailTransport
}
