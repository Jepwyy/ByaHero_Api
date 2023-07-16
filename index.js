const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const corsOptions = require('./config/corsOptions')
require('dotenv').config()
const port = process.env.PORT || 5000

/*Middleware*/
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    key: 'userId',
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

//connection
const uri = process.env.ATLAS_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err))

//routes
app.use('/auth', require('./routes/authRoute'))

app.listen(port, () => {
  console.log('Listening on port: ', port)
})
