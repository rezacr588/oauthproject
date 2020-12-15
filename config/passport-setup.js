const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys');
const User = require("../models/user-model");
passport.serializeUser((user, done) => {
  done(null, user._id);
})
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
})
passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect",
  },
  async (accessToken,refreshToken,profile,done) => {
    // PASSPORT callback function
    let user;
    user = await User.findOne({ googleId: profile.id });
    // Check if user is not exist
    if (!user)
      user = await User.create({
        username: profile.displayName,
        googleId: profile.id,
      });
    done(null, user);
  })
);