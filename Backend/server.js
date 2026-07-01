require("dotenv").config()
const connectToDB = require("./src/config/database")

const app = require('./src/app');


    connectToDB()

app.listen(8000, () => {


    console.log("Server is listening to the port 8000");

})