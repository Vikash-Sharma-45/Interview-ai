require("dotenv").config()
const connectToDB = require("./src/config/database")
const invokeGeminiAi = require("./src/services/ai.service")
const generateInterviewReport = require("./src/services/ai.service")
const {resume, selfDescription, jobDescription} = require("./src/services/temp")

const app = require('./src/app');


connectToDB()

generateInterviewReport({resume, selfDescription, jobDescription})

// listModels()

app.listen(8000, () => {


    console.log("Server is listening to the port 8000");

})