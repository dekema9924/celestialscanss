const express = require('express')
const userRouter = express.Router()


userRouter.get('/', (req, res) => {
    res.send('user router')
})


module.exports = userRouter

