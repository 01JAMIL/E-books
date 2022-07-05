const userModel = require('../models/user.model')
const verificationUserModel = require('../models/userVerification.model')
const bcrypt = require('bcrypt')
const { validateUser, validateLoginForm } = require('../validation/user.validation')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { generateUniqueCode, mailTransport } = require('../utils/sendMail')


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(201).json(users)
    } catch (err) {
        res.status(404).json(err)
    }
}

const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        res.status(201).json(user)
    } catch (err) {
        res.status(404).json(err)
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { errors, validUser } = validateUser(req.body)
    try {
        if (!validUser) {
            res.status(404).json({ errors: errors })
        } else {
            await userModel.findOne({ email: req.body.email }).then(async (exist) => {
                if (exist) {
                    res.status(404).json({ error: 'This email is already exist !' })
                } else {
                    const user = new userModel(req.body);
                    // generate cryptedPassword to hash password
                    const cryptedPassword = await bcrypt.genSalt(10);
                    // now we set user password to hashed password
                    user.password = await bcrypt.hash(user.password, cryptedPassword);
                    await userModel.create(user);

                    const verificationUser = new verificationUserModel({
                        userId: user._id,
                        uniqueKey: generateUniqueCode(),
                        expiresIn: new Date(new Date().getTime() + 3600000)
                    })

                    await verificationUserModel.create(verificationUser)

                    // Send email to the user

                    mailTransport().sendMail({
                        from: process.env.EMAIL_USER,
                        to: user.email,
                        subject: 'Verify your email',
                        html:
                            `<div style="font-family: sans-serif; min-height: 50vh; display: flex; justify-content: center; align-items: center">
                                <div style="padding : 20px; background-color: rgb(250 204 21); border-radius: 8px">
                                    <h3 style="margin-bottom: 30px"> Hello ${user.firstName + ' ' + user.lastName} to libook </h3>
                                    <div style="margin-bottom: 10px"> Welcome to our community </div>
                                    <div> Your verification code is ${verificationUser.uniqueKey}</div>
                                    <small>This code expires in <b>1 hour</b></small>
                                </div>
                            </div>`
                    }).then(() => console.log('Email sent'))
                        .catch(err => console.log(err))

                    res.status(201).json({
                        userToken: generateToken(user._id)
                    })
                }
            })
        }
    } catch (err) {
        res.status(404).json('Error !')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { errors, validUser } = validateLoginForm(req.body)

    try {
        if (!validUser) {
            res.status(404).json(errors)
        } else {
            // Get user by email
            const user = await userModel.findOne({ email: req.body.email })

            // Check password
            if (user && (await bcrypt.compare(req.body.password, user.password))) {
                res.status(201).json({
                    userToken: generateToken(user._id)
                })
            } else {
                res.status(404).json({
                    message: 'Incorrect email or password'
                })
            }
        }
    } catch (error) {
        res.status(400)
        throw new Error('Login user error')
    }
})

const updateUserById = asyncHandler(async (req, res) => {
    const { errors, validUser } = validateUser(req.body)
    try {
        if (!validUser) {
            res.status(404).json({ errors: errors })
        } else {

            /**
             * Get the user by id
             * Check if the password sent in the req.body is changed
             * If password is changed => Generate salt and hash the new password
             * Else put the old password in the req.body.password
             */

            const user = await userModel.findOne({ _id: req.params.userId })


            if (await bcrypt.compare(req.body.password, user.password) === false) {

                //generate cryptedPassword to hash password
                const cryptedPassword = await bcrypt.genSalt(10);
                // now we set user password to hashed password
                req.body.password = await bcrypt.hash(req.body.password, cryptedPassword);
            } else {
                req.body.password = user.password
            }

            const updatedUser = await userModel.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true }
            );
            res.status(201).json(updatedUser)
        }
    } catch (err) {
        res.status(404).json(err)
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    try {
        await userModel.findOneAndRemove({ _id: req.params.userId });
        res.status(201).json('User deleted')
    } catch (err) {
        res.status(404).json(err)
    }
})

const verifyEmail = asyncHandler(async (req, res) => {
    try {
        const { id, code } = req.body

        // Check if unique code exists
        if (!code) {
            res.status(400).json({ error: 'Verification code is required!' })
        } else {
            // check if the email is already verified
            const user = await userModel.findOne({ _id: id, verified: true })
            if (user) {
                res.status(200).json({ error: 'Email already verified' })
            } else {
                // Check if the unique code expired
                const verificationUser = await verificationUserModel.findOne({ userId: id })

                if (Date.now() > verificationUser.expiresIn) {
                    res.status(400).json({ expired: 'The code is expired send an other code?' })
                } else if (verificationUser.uniqueKey !== code) {
                    res.status(400).json({ error: 'This code is wrong please make sure you put the correct one.' })
                } else {
                    await userModel.findOneAndUpdate({ _id: id }, { verified: true }, { new: true })
                    await verificationUserModel.findOneAndDelete({ userId: id })

                    res.status(200).json({ message: 'Your email verified successfully.' })
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
})

const sendEmail = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id)
        const id = req.params.id
        const user = await userModel.findById(id)

        // Set the new value of the unique key
        const verificationUser = await verificationUserModel.findOneAndUpdate(
            { userId: id },
            {
                uniqueKey: generateUniqueCode(),
                expiresIn: new Date(new Date().getTime() + 3600000)
            },
            { new: true }
        )
        mailTransport().sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify your email',
            html:
                `<div style="font-family: sans-serif; min-height: 50vh; display: flex; justify-content: center; align-items: center">
                <div style="padding : 20px; background-color: rgb(250 204 21); border-radius: 8px">
                    <h3 style="margin-bottom: 30px"> Hello ${user.firstName + ' ' + user.lastName} to libook </h3>
                    <div style="margin-bottom: 10px"> Welcome to our community </div>
                    <div> Your verification code is ${verificationUser.uniqueKey}</div>
                    <small>This code expires in <b>1 hour</b></small>
                </div>
            </div>`
        }).then(() => console.log('Email sent'))
            .catch(err => console.log(err))


        res.status(200).json({ message: 'New email sent please check your email.' })
    } catch (error) {
        console.log(error)
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    })
}

module.exports = {
    getUsers,
    getUser,
    registerUser,
    loginUser,
    updateUserById,
    deleteUserById,
    verifyEmail,
    sendEmail
}