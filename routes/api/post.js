const express = require('express')
const router = express.Router()
const Post = require('../../Models/Post')
const auth = require('../../middleware/auth')
const {
    check,
    validationResult
} = require('express-validator')
const User = require('../../Models/User')
const Profile = require('../../Models/Profile')


//@route POST api/post
//@desc Create post
//@access Private
router.post('/', [auth, [check('text', 'Text is required!!').not().isEmpty()]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            erros: errors.array()
        })
    }


    try {


        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server is down !!!')
    }
})


//@route GET api/post
//@desc Get all posts
//@access Private

router.get('/', auth, async (req, res) => {

    try {

        const posts = await Post.find().sort({
            date: -1
        })
        if (!posts) {
            return res.status(400).json("message:'Posts not found")
        }
        res.json(posts)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error!!')
    }
})

//@route GET api/post/:post_id
//@desc Get post by id
//@access Private

router.get('/:post_id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.post_id)
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        res.json(post)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({
                message: "Post not found !!"
            })
        }
        res.status(500).send('Server error!!')
    }
})


//@route DELTE api/post/:post_id
//@desc delete post by its id
//@access Private

router.delete('/:post_id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.post_id)
        //console.log(post.user, req.user.id)

        if (!post) {
            return res.status(404).json({
                message: 'post not found!!'
            })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not Authorized !!'
            })
        }

        await post.remove()
        res.json({
            Message: `post has been deleted`
        })


    } catch (error) {
        // if (error.kind == 'ObjectId') {
        //     return res.status(400).json({
        //         message: "Post not found !!"
        //     })
        // }
        res.status(500).send('Server error!!')
    }
})

//@route PUT api/post/likes/:id
//@desc like a post
//@access Private

router.put('/likes/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        // check if the post is already been liked

        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({
                message: 'Post already liked'
            })
        }
        post.likes.unshift({
            user: req.user.id
        })
        await post.save()
        res.json(post.likes)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({
                message: "Post not found !!"
            })
        }
        res.status(500).send('Server error!!')
    }
})

//@route PUT api/post/unlikes/:id
//@desc unlike a post
//@access Private

router.put('/unlikes/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        // check if the post is already been liked

        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length === 0
        ) {
            return res.status(400).json({
                message: 'Post hasnt been liked yet'
            })
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({
                message: "Post not found !!"
            })
        }
        res.status(500).send('Server error!!')
    }
})

//@route POST api/post/comments/:id
//@desc Create comment
//@access Private
router.post('/comments/:id', [auth, [check('text', 'Text is required!!').not().isEmpty()]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            erros: errors.array()
        })
    }


    try {


        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)

        const newComent = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComent)
        await post.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server is down !!!')
    }
})


//@route DELTE api/comments/:post_id
//@desc delete comments by post id
//@access Private

router.delete('/comments/:comment_id/:post_id', auth, async (req, res) => {

    try {

        const post = await Post.findById(req.params.post_id)

        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not Authorized !!'
            })
        }


        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex, 1)
        await post.save()
        //res.json(post.comments)
        res.json({
            Message: `comment has been deleted`
        })


    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({
                message: "Comment not found !!"
            })
        }
        res.status(500).send('Server error!!')
    }
})



module.exports = router