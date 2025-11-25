/* const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // role:1 super admin
    // role:2 admin
    // role:3 user
    role: {
        type: Number,
        default: 3
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User; */

// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: Number,
        default: 3
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
