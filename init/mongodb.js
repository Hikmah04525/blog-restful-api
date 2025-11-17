const mongoose = require("mongoose");
const {connectionUrl} = require("../config/keys");

const connectMongodb = async () => {
    console.log("Trying to connect to MongoDB...");
    try {
        await mongoose.connect(connectionUrl);
        console.log("Database connection successful");
    } catch (error) {
        console.log("MongoDB Error:", error.message);
    }
};

module.exports = connectMongodb