const {Router} = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = Router()


/**
 * - @routes POST /api/auth/register
 * - @description Register a new user
 * - @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * - @routes POST /api/auth/login
 * - @description Login a user with email and password
 * - @access Public
 */

authRouter.post("/login", authController.loginUserController)

/**
 * - @routes POST /api/auth/logout
 * - @description clear token from user cookie and add it to blacklist
 * - @access Public
 */

authRouter.get("/logout", authController.logoutUserController)


module.exports = authRouter