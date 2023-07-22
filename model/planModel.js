const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please enter a Title'],
    },
    departureDate: {
      type: Date,
      required: [true, 'Please enter a Departure Time'],
    },
    destination: {
      type: String,
      required: [true, 'Please enter a Destination'],
    },
    distance: {
      type: Number,
      required: [true, 'Please enter a Distance'],
    },
    companion: {
      type: Array,
      default: 'none',
    },
    thingsToBring: {
      type: Array,
      default: 'none',
    },
    notes: {
      type: String,
      default: 'none',
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
)
const Plan = mongoose.model('plan', planSchema)

module.exports = Plan
