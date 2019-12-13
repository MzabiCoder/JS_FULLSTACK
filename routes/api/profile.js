const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../Models/Profile')
const User = require('../../Models/User')


//@route GET api/profile/me
//@desc  get current user profile
//@access Private
router.get('/me', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({
                message: 'Profile Not Found !!'
            })
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }


    // res.send('profile route')
})

module.exports = router