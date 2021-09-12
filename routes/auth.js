const router = require("express").Router();
const controller = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../controllers/middleware/dataValidation");
const passport = require('passport');

// @desc    Login Page
// @route   GET /auth/login
router.get("/login", controller.getLogin);

// @desc    Authenticate User with Passport local Strategy
// @route   POST /auth/login
router.post('/login', loginValidation, passport.authenticate('local', {
    successRedirect: '/', // back to index page
}));

// @desc    Register Page
// @route   GET /auth/register
router.get("/register", controller.getRegister);

// @desc    Register a new user
// @route   POST /auth/register
router.post("/register",  registerValidation, controller.register);

module.exports = router;
