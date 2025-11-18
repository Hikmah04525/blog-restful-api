/*const mongoose = require("mongoose");
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

module.exports = connectMongodb */

const mongoose = require("mongoose");
const { connectionUrl } = require("../config/keys");

const connectMongodb = async () => {
    console.log("Trying to connect to MongoDB...");

    try {
        await mongoose.connect(connectionUrl);

        console.log("Database connection successful");
    } catch (error) {
        console.log("MongoDB Error:", error.message);
    }

    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Mongoose error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnected");
    });

    // Graceful Shutdown
    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        console.log("Mongoose closed on app termination");
        process.exit(0);
    });
};

module.exports = connectMongodb;
