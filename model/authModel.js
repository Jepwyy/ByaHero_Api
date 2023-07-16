const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      min: 8,
    },
  },
  { timestamps: true }
)
const Users = mongoose.model('users', usersSchema)

module.exports = Users
