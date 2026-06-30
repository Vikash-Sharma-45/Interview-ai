const userModel  = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

    const isUserAllReadyExists = await userModel.findOne({
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
        {id : user_id, username : user.username},
        process.env.JWT_SECRET,
        {expiresIn : "1D"}
    )

    res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
            
        }
    })

}

module.exports = {
    registerUserController
}