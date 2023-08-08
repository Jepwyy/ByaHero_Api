const express = require('express')
const router = express.Router()
const userController = require('../controller/authController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/cookie', userController.cookie)

module.exports = router
