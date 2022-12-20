const express = require('express')
const statusRouter = require('./routes/status')
const userRouter = require('./routes/user')

const app = express()

app.use(express.json())

app.use('/status', statusRouter)
app.use('/users', userRouter)

module.exports = app
