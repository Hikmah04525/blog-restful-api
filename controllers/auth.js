/* const {User} = require("../models/User");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword")

const signup = async(req, res, next) => {
    


}

const signin= async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.code = 401;
            throw new Error ("invalid credentials")
        }
        const match = await comparePassword (password, user.password);
        if(!match)
            res.code = 401;
        throw new Error ("invalid credentials")

        res.status(200).json ({code: 200, status: true. message: "user signin seccessful"})
    } catch (error) {
        
    }
}

module.exports = { signup, signin }; */

/* const { User } = require("../models/User");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword")
const generateToken = require("../utils/generateToken");

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if user exists
        const exist = await User.findOne({ email });
        if (exist) {
            res.code = 400;
            throw new Error("User already exists");
        }

        // hash password
        const hashed = await hashPassword(password);

        // create user
        const user = await User.create({
            fullName: name,
            email,
            password: hashed
        });

        res.status(201).json({
            code: 201,
            status: true,
            message: "user signup successful",
            user
        });

    } catch (error) {
        next(error);
    }
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.code = 401;
            throw new Error("invalid credentials");
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            res.code = 401;
            throw new Error("invalid credentials");
        }

        const token = generateToken(user);
        res.status(200).json({
            code: 200,
            status: true,
            message: "user signin successful",
            data:{token}
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { signup, signin }; */

const crypto = require("crypto");
const User = require("../models/User");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// =============================
// SIGNUP
// =============================
// Handles creating a new user, hashing password,
// generating verification token, and sending email.
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // check if the email is already used

        const exists = await User.findOne({ email });
        if (exists) {
            res.code = 400;
            throw new Error("Email already exists");
        }

        // hash the user password

        const hashedPassword = await hashPassword(password);

        // generate email verification token
        const token = crypto.randomBytes(32).toString("hex");

        // create new user in DB

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken: token,
            verificationTokenExpires: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
        });

        // send verification email
        await sendEmail(
            email,
            "Verify your email",
            `
            <h1>Email Verification</h1>
            <p>Click the link below:</p>
            <a href="http://localhost:8000/api/v1/auth/verify-email/${token}">
                Verify Email
            </a>
            `
        );

        res.status(201).json({
            message: "Signup success! Please verify your email.",
            verificationLink: `http://localhost:8000/api/v1/auth/verify-email/${token}`
        });

    } catch (err) {
        next(err);
    }
};


// =============================
// VERIFY EMAIL
// =============================
const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;

        // find user with valid verification token

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() }
        });

        if (!user) {
            res.code = 400;
            throw new Error("Invalid or expired verification token");
        }

        // update user to verified

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;

        await user.save();

        res.json({
            status: true,
            message: "Email verified successfully"
        });

    } catch (err) {
        next(err);
    }
};


// =============================
// SIGNIN
// =============================
const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.code = 401;
            throw new Error("invalid credentials");
        }

        // compare password

        const match = await comparePassword(password, user.password);
        if (!match) {
            res.code = 401;
            throw new Error("invalid credentials");
        }

        // generate JWT token

        const token = generateToken(user);

        res.status(200).json({
            code: 200,
            status: true,
            message: "user signin successful",
            data: { token }
        });

    } catch (err) {
        next(err);
    }
};

module.exports = { signup, signin, verifyEmail };
