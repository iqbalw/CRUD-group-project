const router = require("express").Router();
const controller = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../controllers/middleware/dataValidation");
const { isLoggedIn, isNotLoggedIn } = require("../controllers/middleware/verifyUser");
const passport = require('passport');

// @desc    Login Page
// @route   GET /auth/login
router.get("/login", isNotLoggedIn, controller.getLogin);

// @desc    Authenticate User with Passport local Strategy
// @route   POST /auth/login
router.post('/login', isNotLoggedIn, loginValidation, passport.authenticate('local', {
    successRedirect: '/', // back to index page
    failureRedirect: './failure',
}));

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { 
      successRedirect: '/', //back to login page,
      failureRedirect: '/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// @desc    Login failure route
// @route   GET auth/failure
router.get('/failure', isNotLoggedIn, controller.loginFail);

// @desc    Register Page
// @route   GET /auth/register
router.get("/register", isNotLoggedIn, controller.getRegister);

// @desc    Register a new user
// @route   POST /auth/register
router.post("/register",  isNotLoggedIn, registerValidation, controller.register);

// @desc    Log a user out
// @route   GET /auth/logout
// note:    should change this to a DELETE in the future
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;
