const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || ""
        const token = authHeader.split(" ")[1]
        if (!token) {
            const error = new Error("Not authorized, no token")
            error.statusCode = 400
            throw error
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 400
            throw error
        }
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}
const allowRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            const error = new Error ("You do not have permission to do this")
            error.statusCode = 403
            return next(error)
        }
        next()
    }
}

module.exports = { authHandler, allowRoles }