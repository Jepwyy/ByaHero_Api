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

  try {
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

    await newPlan.save()
    res.status(200).json({ message: 'Created successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Creation failed' })
  }
}

const viewPlan = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(400).json({ message: 'Sign in First' })
    }

    const planDetails = await Plan.find({
      userId: req.session.user._id,
    })

    if (!planDetails) {
      return res.status(400).json({ message: 'No Items Found.' })
    } else {
      res.status(200).json(planDetails)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'An error occurred while fetching data.' })
  }
}
module.exports = { createPlan, viewPlan }
