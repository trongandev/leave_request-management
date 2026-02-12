const express = require('express')
const { registerUser, loginUser, forgetPassword, changePassword, logoutUser, refreshToken } = require('../controllers/auth.controller.js')
const { authenticateToken } = require('../middlewares/auth.middleware.js')
const { validateForgetPassword, validateRefreshToken } = require('../middlewares/auth.validation.js')

const router = express.Router()

router.post('/login', loginUser)

module.exports = router
