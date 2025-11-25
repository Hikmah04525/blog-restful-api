/* const jwt = require ("jsonwebtoken");

const { jwtSecret } = require ("../config/keys");

const generateToken = (user)=>{
    const token = jwt.sign({_id: user._id, email: user.email}, jwtSecret, {expiresIn: "7d"});
    return token;
}

module.exports = generateToken; */
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = generateToken;
