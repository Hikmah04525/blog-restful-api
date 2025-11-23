const {check} = require ("express-validator");

const signupValidator = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required")

];

const signinValidator = [
    check("email").isEmail().withMessage("Valid email is required").notEmpty().withMessage("Email is required"),
    check("password").notEmpty().withMessage("Password is required")
]

module.exports = { signupValidator, signinValidator };