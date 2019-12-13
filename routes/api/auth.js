const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../Models/User')
const config = require('config')
const {
    check,
    validationResult
} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//@route POST api/auth
//@desc Authenticate User
//@access Public
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error!!')
    }
})

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(), check('password', 'Please enter a password with 6 or more caracters').isLength({
        min: 6
    })
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        email,
        password
    } = req.body
    try {
        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            })
            // return res.json(400).json({
            //     message:'User Already exists!!'
            // })
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwt_secret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err
            res.json({
                token
            })
        })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!!! ')
    }


})

module.exports = router