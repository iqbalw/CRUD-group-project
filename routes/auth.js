const router = require("express").Router();
const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
} = require("../controllers/validateController");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.redirect("/login.html");
});

router.post("/login", (req, res) => {
  res.send(req.body);
});

router.get("/register", (req, res) => {
  res.redirect("/register.html");
});

//When a post request is made from the register page, this will be triggered
router.post("/register", async (req, res) => {
 //Check if the request has valid parameters
  const { error } = registerValidation(req.body);
  //If there was an error e.g the password not meeting the min characters
  if (error) return res.status(400).send(error.details[0].message);
  //Check if the email already exists in the database, if it does, reject it
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  //Salt and Hash the password 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(req.body.test);
  //create a new user for MongoDB
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    type: req.body.test,
    password: hashedPassword,
  });
  try {
    //saving the user,  
    const savedUser = await user.save();
    //  console.log(savedUser);
    res.send({ savedUser });
    // }
  } catch (err) {
    console.log(err);
    res.status(400).send("There was error during processing");
  }
});

module.exports = router;
