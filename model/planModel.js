const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema(
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
    arrivalDate: {
      type: Date,
      required: [true, 'Please enter a Arrival Time'],
    },
    destination: {
      type: String,
      required: [true, 'Please enter a Destination'],
    },
    distance: {
      type: String,
      required: [true, 'Please enter a Distance'],
    },
    companion: {
      type: String,
      default: 'none',
    },
    thingsToBring: {
      type: String,
      default: 'none',
    },
    notes: {
      type: String,
      default: 'none',
    },
  },
  { timestamps: true }
)
const Users = mongoose.model('users', usersSchema)

module.exports = Users
