const router = require("express").Router();
const { registerCreation } = require("../controllers/authController");
const { registerValidation } = require("../middleware/ValidationFunctions");

router.get("/login", (req, res) => {
  res.redirect("/login.html");
});

router.post("/login", (req, res) => {
  res.send(req.body);
});

router.get("/register", (req, res) => {
  res.redirect("/register.html");
});

//When a post request is made from the register page, this will be triggered,
//to manually test use Postman, select Post with the following url: http://localhost:3000/auth/register
//and provide a JSON with the fields apart from the date ofc!

router.post("/register",  registerValidation, registerCreation)

module.exports = router;
