require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;


/**
 * Initializes the Passport Local-Strategy, where the username is specified
 * as the Email address. It verifies whether the email of an existing user
 * is given and compares the hash of the given password to the stored hash
 * in the database. If successful will serialize the user object by ID, hence
 * creating a session for the current authenticated user.
 * @param {Object} passport The Passport Object
 */
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });

        if (!user) {
          // Incorrect email
          return done(null, false, { message: "Email or Password Incorrect" });
        }

        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user); // Successful
          }
          // Incorrect Password
          return done(null, false, { message: "Email or Password Incorrect" });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({ 
          name: profile.displayName, 
          email: profile.emails[0].value, 
          type: "google"}, 
          function (err, user) {
            return done(err, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
