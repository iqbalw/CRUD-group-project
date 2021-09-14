const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * Renders the login page
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
 module.exports.getLogin = (req, res) => {
  res.render("login", {error: req.session.message});
}

/**
 * Renders the register page
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
module.exports.getRegister = (req, res) => {
  res.render('register');
}

/**
 * Logs out the user from the current session
 * by clearing the cookie, session object and 
 * finally redirecting back to the login page.
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
module.exports.logout = (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  req.session = null;
  res.redirect('./login');
}

/**
 * Registers a new user in the database. First will check 
 * if the specified email already exists, if not then will
 * continue to hash the password, create a new user and finally
 * save it in the database.
 * @param {Object} req The Request Object 
 * @param {Object} res The Response Object
 */
module.exports.register = async (req, res) => {
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
    type: 'local',
    password: hashedPassword,
  });

  try {
    //saving the user,
    const savedUser = await user.save();
    //will send back something less verbose in the future but for testing purposes
    //swend back what is saved
    res.send({ savedUser });
  } catch (err) {
    res.status(500).send("There was error during processing");
  }
}


