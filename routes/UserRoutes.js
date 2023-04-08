const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/UserModel')

const secret = process.env.JWT_SECRET
const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const oldUser = await User.findOne({email})
    if (oldUser) {
        return res.json({message: "This email is already registered"})
    }
    try {
    let hashedPassword = null
    if (password) {
        hashedPassword = await bcrypt.hash(password, 12)
    }
    const newUser = await User.create({name, email, password : hashedPassword })
    res.status(200).json(newUser)
    } catch (err) {
        res.json({message: err})
    }
})

router.post('/login', async (req, res) => {
    const { name, email, password } = req.body
    if (!name) {
        return res.json({message: "Please enter your username"})
    }
    if (!password) {
        return res.json({message: "Please enter your password"})
    }
    if (!email) {
        return res.json({message: "Please enter your registered email"})
    }
    const user = await User.findOne({email})
    if (!user) {
        return res.json({message: "This email is not registered"})
    }
    const passOk = await bcrypt.compare(password, user.password)
    if (!passOk) {
        return res.json({message: "Wrong password"})
    }
    jwt.sign({name: name, id: user._id}, {}, (err, token) => {
            res.json({
                id: user._id,
                name: user.name
            })
    })
})

module.exports = router