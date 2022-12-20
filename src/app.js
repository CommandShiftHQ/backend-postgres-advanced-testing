const express = require('express')
const statusRouter = require('./routes/status')

const app = express()

app.use(express.json())

app.use('/status', statusRouter)

module.exports = app
