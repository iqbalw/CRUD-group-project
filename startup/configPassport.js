require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const LocalStrategy = require('passport-local').Strategy;

/**
 * Initializes the Passport Local-Strategy, where the username is specified
 * as the Email address. It verifies whether the email of an existing user
 * is given and compares the hash of the given password to the stored hash
 * in the database. If successful will serialize the user object by ID, hence
 * creating a session for the current authenticated user. 
 * @param {Object} passport The Passport Object 
 */
module.exports = (passport) => {
  passport.use(new LocalStrategy({usernameField: 'email'}, 
  async (email, password, done) =>{
    const user = await User.findOne({email: email});
    
    if (!user) { // Incorrect email
      return done(null, false, { message: 'Email or Password Incorrect' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user); // Successful
      }
      // Incorrect Password 
      return done(null, false, { message: 'Email or Password Incorrect' });
    
    } catch (err) {
      return done(err);
    }
  }));

  // Include google strategy here

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}