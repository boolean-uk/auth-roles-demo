const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
const morgan = require('morgan')

app.disable('x-powered-by')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRouter = require('./routers/user')
app.use('/users', userRouter)

const postRouter = require('./routers/posts')
app.use('/posts', postRouter)

app.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({ message: 'Oops! Our fault.' })
})

module.exports = app
