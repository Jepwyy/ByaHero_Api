const Plan = require('../model/planModel')

const createPlan = async (req, res) => {
  const {
    title,
    departureDate,
    arrivalDate,
    destination,
    distance,
    companion,
    thingsToBring,
    notes,
    status,
  } = req.body

  if (!title || !departureDate || !arrivalDate || !destination || !distance) {
    return res
      .status(400)
      .json({ message: 'Please Enter All Required Fields!' })
  }

  if (!req.session.user) {
    return res.status(400).json({ message: 'Sign in First' })
  }

  const existingPlan = await Plan.findOne({ title: title, status: 'pending' })
  if (existingPlan) {
    return res.status(400).json({ message: 'You Already Made This Plan' })
  }

  const newPlan = new Plan({
    userId: req.session.user._id,
    title,
    departureDate,
    arrivalDate,
    destination,
    distance,
    companion,
    thingsToBring,
    notes,
    status,
  })

  // Save user to database
  try {
    await newPlan.save()
    res.json({ message: 'Created successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Creation failed' })
  }
}
module.exports = { createPlan }
