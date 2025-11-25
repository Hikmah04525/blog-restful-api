const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { signupValidator, signinValidator } = require("../validators/auth");
const validate = require("../validators/validator"); // must export a function


// SIGNUP
router.post("/signup", signupValidator, validate, authController.signup);

// EMAIL VERIFICATION
router.get("/verify-email/:token", authController.verifyEmail);

// SIGNIN
router.post("/signin", signinValidator, validate, authController.signin);

module.exports = router;