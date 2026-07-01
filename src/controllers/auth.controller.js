const userModel  = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * - @name registerUserController
 * - @description register a new user, expects username, email and password
 * - @access Public
 */

async function registerUserController(req, res) {

    const {username, email, password} = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message : "Please provide username, email and passord"
        })
    }

    const isUserAlReadyExists = await userModel.findOne({
        $or : [{username}, {email}]
    })

    if(isUserAlReadyExists) {
        return res.status(400).json({
            message: "User already exists with this email"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password : hash
    })

    const token = jwt.sign(
        {id : user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1D"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
            
        }
    })

}

/**
 * - @name loginUserController
 * - @description login a user, expects email and password
 * - @access Public
 */

async function loginUserController(req, res) {
    const {email, password} = req.body

    const user = await userModel.findOne({email});

    if(!user) {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign(
        {id : user._id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1D"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message : "User loggedin Successfully.",
        id : user._id,
        username : user.username,
        email : user.email
    })
}

/**
 * - @name logoutUserController
 * @description logout user and clear token from user cookie and add it to blacklist
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token

    if(token) {
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message : "User logged out successfully"
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}