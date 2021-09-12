const router = require("express").Router();
const controller = require("../controllers/authController");
const { registerValidation } = require("../controllers/middleware/dataValidation");

// @desc    Login Page
// @route   GET /auth/login
router.get("/login", controller.getLogin);

// @desc    Authenticate User
// @route   POST /auth/login
router.post("/login", controller.login);

// @desc    Register Page
// @route   GET /auth/register
router.get("/register", controller.getRegister);

// @desc    Register a new user
// @route   POST /auth/register
router.post("/register",  registerValidation, controller.register);

module.exports = router;
