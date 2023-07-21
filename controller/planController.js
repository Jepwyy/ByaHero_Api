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
    res.status(200).json({ message: 'Created successfully', newPlan })
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

const viewPlanOnly = async (req, res) => {
  const planId = req.params.id
  try {
    if (!planId) {
      return res.status(400).json({ message: 'No Id Found!' })
    }

    if (!req.session.user) {
      return res.status(400).json({ message: 'Sign in First' })
    }

    const planDetails = await Plan.find({
      _id: planId,
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

const deletePlan = async (req, res) => {
  const planId = req.params.id

  try {
    if (!planId) {
      return res.status(400).json({ message: 'No Id Found!' })
    }
    const deletePlan = await Plan.findByIdAndDelete({ _id: planId })

    if (!deletePlan) {
      return res.status(400).json({ message: 'Item not found.' })
    } else {
      res
        .status(200)
        .json({ message: 'Item deleted successfully.', deletePlan })
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the item.' })
  }
}
const updatePlan = async (req, res) => {
  const {
    title,
    departureDate,
    arrivalDate,
    destination,
    distance,
    companion,
    thingsToBring,
    notes,
  } = req.body
  const planId = req.params.id

  try {
    if (!planId) {
      return res.status(400).json({ message: 'No Id Found!' })
    }

    const updatePlan = await Plan.findOneAndUpdate(
      { _id: planId },
      {
        title,
        departureDate,
        arrivalDate,
        destination,
        distance,
        companion,
        thingsToBring,
        notes,
      }
    )
    if (!updatePlan) {
      return res.status(404).json({ message: 'Item not found.' })
    } else {
      res
        .status(200)
        .json({ message: 'Item updated successfully.', updatePlan })
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the item.' })
  }
}
const updateStatus = async (req, res) => {
  const { status } = req.body
  const planId = req.params.id

  try {
    if (!planId) {
      return res.status(400).json({ message: 'No Id Found!' })
    }

    const updatePlan = await Plan.findOneAndUpdate(
      { _id: planId },
      {
        status,
      }
    )
    if (!updatePlan) {
      return res.status(404).json({ message: 'Item not found.' })
    } else {
      res.status(200).json({ message: 'Status updated successfully.' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the status.' })
  }
}
module.exports = {
  createPlan,
  viewPlan,
  deletePlan,
  updatePlan,
  updateStatus,
  viewPlanOnly,
}
