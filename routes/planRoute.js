const express = require('express')
const router = express.Router()
const planController = require('../controller/planController')

router.post('/create/:user', planController.createPlan)
router.get('/view/:user', planController.viewPlan)
router.get('/viewOne/:id/:user', planController.viewPlanOnly)
router.delete('/delete/:id', planController.deletePlan)
router.put('/update/:id', planController.updatePlan)
router.put('/status/:id', planController.updateStatus)

module.exports = router
