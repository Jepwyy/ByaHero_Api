const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

/* Middleware */
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

// Set up MongoDB session store
const mongoDBStore = new MongoDBStore({
  uri: process.env.ATLAS_URI,
  collection: 'sessions', // The collection in MongoDB to store sessions
  expires: 1000 * 60 * 60 * 24 * 7, // Session expiration time (optional)
})

// Catch errors
mongoDBStore.on('error', (error) => {
  console.error('MongoDB session store error:', error)
})

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'None',
      secure: true,
    },
  })
)

// Connection
const uri = process.env.ATLAS_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err))

// Routes
app.use('/auth', require('./routes/authRoute'))
app.use('/plan', require('./routes/planRoute'))

app.listen(port, () => {
  console.log('Listening on port:', port)
})
