const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const userModel = require('../models/user.model')

const protectRoute = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from header
            token = req.headers.authorization.split(' ')[1]

            // verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await userModel.findById(decodedToken.id).select('-password')

            // Call the next() method
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized')
        }


    }

    if (!token) {
        console.log('Not authorized, no token')
        res.status(401).json({ message: 'Not authorized, no token' })
    }
})

module.exports = { protectRoute }