const express = require('express')
const router = express.Router()

const { getUsers, getUser, registerUser, loginUser, updateUserById, deleteUserById } = require('../controllers/user.controller')
const { protectRoute } = require('../middleware/auth.middleware')
router.get('/', getUsers)
router.get('/me', protectRoute, getUser)
router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/:userId', updateUserById)
router.delete('/:userId', deleteUserById)

module.exports = router 