const Users = require('../model/authModel')
const bcrypt = require('bcryptjs')

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
      req.session.user = user
      res.status(200).json({
        message: 'Login Successfull',

        user: user,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Login failed' })
  }
}

const logout = async (req, res) => {
  if (req.session && Object.keys(req.session).length > 0) {
    req.session = null

    // Remove the session cookie from the client's browser
    res.clearCookie('session') // Make sure to replace 'session' with the name of your session cookie

    res.status(200).json({ message: 'logout successfully' })
  } else {
    res.status(400).json({ message: 'already logout' })
  }
}

const cookie = async (req, res) => {
  if (req.session && Object.keys(req.session).length > 0) {
    res.json({ loggedIn: true, user: req.session.user })
  } else {
    res.json({ loggedIn: false })
  }
}
module.exports = { register, login, logout, cookie }
