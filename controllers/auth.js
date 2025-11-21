const {User} = require("../models");
const signup = async(req, res, next) => {
    try{
        const {name, email, password} = req.body;

        const isEmailExist = await User.findOne({email});
        if (isEmailExist){
            res.code=400;
            throw new Error("Email already exists");
        }
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json({
            code: 201, 
            status: true, 
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    }catch(error){
        next(error);
    }
    
};

module.exports = { signup }; 
