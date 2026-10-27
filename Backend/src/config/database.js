const mongoose = require("mongoose");

async function connectToDB() {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/interview-ai";
        await mongoose.connect(mongoUri);
        console.log("Databse is connected");
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = connectToDB;