/* const bcrypt = require("bcryptjs");

const comparePassword = (password, hashPassword) =>{
    return bcrypt.compare(password, hashPassword)
};

module.exports = comparePassword */
const bcrypt = require("bcrypt");

const comparePassword = (password, hashed) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, (err, same) => {
            if (err) return reject(err);
            resolve(same);
        });
    });
};

module.exports = comparePassword;
