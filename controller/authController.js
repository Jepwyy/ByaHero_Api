const Users = require('../model/authModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req, res) => {
  const { email, name, password } = req.body

  // Validate input
  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Please enter all fields' })
  }

  // Check if user already exists
  const existingUser = await Users.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' })
  }

  // Hash and salt password
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create new user document
  const newUser = new Users({
    email,
    name,
    password: hashedPassword,
  })

  // Save user to database
  try {
    await newUser.save()
    res.status(200).json({ message: 'Registration successful' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Registration failed' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' })
    }

    // Find user by email or username
    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist! " })
    }

    // Check password
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: 'Email or password is incorrect' })
    } else {
      const token = jwt.sign({ user: user }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 30 * 1000,
      })

      res.cookie('access-token', token)
      res.status(200).json({
        message: 'Login Successfull',
        auth: true,
        user: user,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Login failed' })
  }
}

const logout = async (req, res) => {
  const token = req.cookies['access-token']
  if (token) {
    res.clearCookie('access-token')
    res.status(200).json({
      message: 'Logout Successfull',
    })
  } else {
    res.status(200).json({
      message: 'Already Logout',
    })
  }
}

const cookie = async (req, res) => {
  const token = req.cookies['access-token']
  if (!token) {
    res.json({ auth: false, message: 'Invalid Token' })
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: 'Authentication Failed!' })
      } else {
        req.user = decoded.user
        const user = req.user
        res.json({
          message: 'Authenticated Successfully!',
          auth: true,
          user: user,
        })
      }
    })
  }
}
module.exports = { register, login, logout, cookie }
