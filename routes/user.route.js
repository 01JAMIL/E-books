const express = require('express')
const router = express.Router()

const { getUsers, getUser, registerUser, loginUser, updateUserById, deleteUserById, verifyEmail, sendEmail } = require('../controllers/user.controller')
const { protectRoute } = require('../middleware/auth.middleware')
router.get('/', getUsers)
router.get('/me', protectRoute, getUser)
router.post('/', registerUser)
router.post('/verify-user-email', verifyEmail)
router.post('/send-verification-code/:id', sendEmail)
router.post('/login', loginUser)
router.put('/:userId', protectRoute, updateUserById)
router.delete('/:userId', protectRoute, deleteUserById)

module.exports = router 