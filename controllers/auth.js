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

const { User } = require("../models/User");
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

module.exports = { signup, signin };
