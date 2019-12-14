const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../Models/Profile')
const User = require('../../Models/User')
const {
    check,
    validationResult
} = require('express-validator')


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

//@route POST api/profile
//@desc Create or update a profile
//@access Private

router.post('/', [auth, [check('status', 'Status is required!!').not().isEmpty(), check('skills', 'skills is required!!!').not().isEmpty()]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            erros: errors.array()
        })
    }

    const {
        status,
        skills,
        company,
        location,
        bio,
        githubusername,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        website
    } = req.body

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername)
        profileFields.githubusername = githubusername;
    // Skills - Spilt into array
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({
            user: req.user.id
        })
        if (profile) {
            profile = await Profile.findOneAndUpdate({
                user: req.user.id
            }, {
                $set: profileFields
            }, {
                new: true
            })

            return res.json(profile)

        }
        // create

        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }




})

//@route GET api/profile
//@desc Create or update a profile
//@access Public

router.get('/', async (req, res) => {

    try {
        const profiles = await Profile.find().populate('user', ['avatar', 'name'])
        res.json(profiles)
    } catch (error) {
        console.error(errors.message)
        res.status(500).send('Server Send!!')
    }
})

//@route GET api/profile
//@desc Get profile by user ID
//@access Public

router.get('/:user_id', async (req, res) => {

    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['avatar', 'name'])
        if (!profile) {
            return res.status(400).json({
                message: "Profile not found"
            })
        }
        res.json(profile)
    } catch (error) {
        console.error(error.message)
        if (error.kind == 'ObjectId') {
            return res.status(400).json({
                message: "Profile not found"
            })
        }
        res.status(500).send('Server Send!!')
    }
})

//@route DEL api/profile
//@desc Delete profile user &post
//@access Public


router.delete('/', auth, async (req, res) => {

    try {
        await Profile.findOneAndRemove({
            user: req.user.id
        })
        await User.findOneAndRemove({
            _id: req.user.id
        })

        res.json({
            message: 'User Removed'
        })
    } catch (error) {
        console.error(error.message)
        if (error.kind == 'ObjectId') {
            return res.status(400).json({
                message: "Profile not found"
            })
        }
        res.status(500).send('Server Send!!')
    }
})

module.exports = router