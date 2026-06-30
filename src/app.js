const express = require('express');

const app = express();

app.use(express.json());

/* 
* - ROUTES REQUIRED
*/

const authRouter = require("./routes/auth.routes")

/**
 * - ROUTES USE
 */

app.use("/api/auth", authRouter)

module.exports = app;