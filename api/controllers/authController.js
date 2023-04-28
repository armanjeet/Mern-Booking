const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    const { username, email } = req.body
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username, email,
            password: hash
        })
        await newUser.save()
        res.status(200).json('user has been created')
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "user not found"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "wrong credentials"))
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({ details: { ...otherDetails } })
    } catch (err) {
        next(err)
    }
}