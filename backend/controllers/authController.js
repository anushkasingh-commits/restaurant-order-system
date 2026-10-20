const jwt = require('jsonwebtoken');
const User = require('../models/User')

const generateToken = (user) => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
} 
const safeUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}
const register = async(req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await User.create({name, email, password})
        res.status(201).json({
            message: "Registration Successful",
            token: generateToken(user),
            user: safeUser(user)
        })
    } catch(error) {
        next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            const error = new Error("Email and password required");
            error.statusCode = 400;
            throw error
        }
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password")
        if (!user || !(await user.comparePassword(password))) {
            const error = new Error("Invalid email or password")
            error.statusCode = 401
            throw error
        }
        res.status(200).json({
            message: "Login Successful",
            token: generateToken(user),
            user: safeUser(user)
        })
    } catch(error) {
        next(error);
    }
}
module.exports = { register, login }