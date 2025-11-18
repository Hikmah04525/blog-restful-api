/* const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
const connectMongodb = require("./init/mongodb")

// int app
const app = express();

//connect database
connectMongodb();

// third party middleware
app.use(express.json({ limit: "500mb"}));
app.use(bodyParser.urlencoded({ limit: "500mb", extended:true }));

module.exports = app; */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectMongodb = require("./init/mongodb");

const app = express();

// Connect DB
connectMongodb();

// Middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server Error" });
});

module.exports = app;


