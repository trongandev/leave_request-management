const express = require('express')

const { authenticateToken } = require('../middlewares/auth.middleware.js')
const profileController = require('../controllers/profile.controller.js')
const upload = require('../middlewares/upload.middleware.js')
const logRequestSize = require('../middlewares/logRequestSize.js')
const handleMulterError = require('../middlewares/handleMulterError.js')

const router = express.Router()

module.exports = router
