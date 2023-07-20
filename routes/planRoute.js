const express = require('express')
const router = express.Router()
const planController = require('../controller/planController')

router.post('/create', planController.createPlan)

module.exports = router
