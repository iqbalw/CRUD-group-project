const User = require("../models/User");
const bcrypt = require("bcryptjs");
//Checking if the email exists and then creates the user. 
const registerCreation = async (req, res) => {
  //Check if the email already exists in the database, if it does, reject it
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  //Salt and Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //create a new user for MongoDB
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    type: req.body.type,
    password: hashedPassword,
  });
  try {
    //saving the user,
    const savedUser = await user.save();
    //will send back something less verbose in the future but for testing purposes
    //swend back what is saved
    res.send({ savedUser });
    // }
  } catch (err) {
    res.status(400).send("There was error during processing");
  }
};
module.exports.registerCreation = registerCreation;
