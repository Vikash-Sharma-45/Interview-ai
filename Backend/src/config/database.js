const mongoose = require("mongoose");

async function connectToDB(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Databse is connected");
    }
    catch (err) {
        console.log(err);
    }
    
}

module.exports = connectToDB;