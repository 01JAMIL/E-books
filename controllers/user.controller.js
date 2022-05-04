const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const validateUser = require('../validation/user.validation')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const validator = require('validator')


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
                    res.status(201).json({
                        user: user,
                        userToken: generateToken(user.id)
                    })
                }
            })
        }
    } catch (err) {
        res.status(404).json('Error !')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password || !validator.isEmail(email)) {
            res.status(404).json(
                { message: 'User data not valid' }
            )
        } else {


            // Get user by email
            const user = await userModel.findOne({ email: email })

            // Check password
            if (user && (await bcrypt.compare(password, user.password))) {
                res.status(201).json({
                    _id: user.id,
                    fullName: user.firstName ,
                    lastName: user.lastName,
                    email: user.email,
                    userToken: generateToken(user.id)
                })
            } else {
                res.status(404).json({
                    message: 'Invalid email or password'
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
    deleteUserById
}