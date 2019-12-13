const config = require('config')
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {

    const token = req.header('token')
    if (!token) {
        return res.status(401).json({
            message: 'No token, Authorization denied!!!'
        })
    }
    try {
        const decoded = jwt.verify(token, config.get('jwt_secret'))
        req.user = decoded.user
    } catch (error) {
        console.error(error.message)
        res.status(401).json({
            message: 'Token is not valid'
        })
    }

    next()

}