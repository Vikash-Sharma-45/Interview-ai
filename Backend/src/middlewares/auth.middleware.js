const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model")

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/**
 * 
 * @name authUser 
 * @description Validate user based on the token assigned  
 * @returns  
 */

async function authUser(req, res, next) {
    try {
    const token = req.cookies?.token

    if(!token) {
        return res.status(401).json({
            message : "Token not provided"
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    }) 

    if(isTokenBlacklisted) {
        return res.status(401).json({
            message : "Token is invalid"
        })
    }

    
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded

        next()
    }
    // catch(err) {
    //     return res.status(401).json({
    //         message : "Invalid token"
    //     })
    // }
    catch (err) {
        console.error("JWT verification error:", err.name, err.message);

        return res.status(401).json({
            message: "Invalid token",
        });
    }
    
}

module.exports = {authUser}