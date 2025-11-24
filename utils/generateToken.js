const jwt = require ("jsonwebtoken");

const { jwtSecret } = require ("../config/keys");

const generateToken = (user)=>{
    const token = jwt.sign({_id: user._id, email: user.email}, jwtSecret, {expiresIn: "7d"});
    return token;
}

module.exports = generateToken;