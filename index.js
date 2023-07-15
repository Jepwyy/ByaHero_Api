const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()
const port = process.env.PORT || 5000

/*Middleware*/
app.use(express.json())

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
