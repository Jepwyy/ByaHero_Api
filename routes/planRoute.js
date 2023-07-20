const express = require('express')
const router = express.Router()
const planController = require('../controller/planController')

router.post('/create', planController.createPlan)
router.get('/view', planController.viewPlan)
router.delete('/delete/:id', planController.deletePlan)
router.put('/update/:id', planController.updatePlan)
router.put('/status/:id', planController.updateStatus)

module.exports = router
