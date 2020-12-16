const express = require("express");
const mongodbSetup = require("./config/mongodb-setup");
const passportSetup = require("./config/passport-setup");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const app = express();

// set up view engine
app.set("view engine", "ejs");

// setup cookie session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  }),
);

// initilize passport
app.use(passport.initialize());
app.use(passport.session());

// setup routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.listen(3001, () => {
  console.log("app now listening for requests on port 3001");
});
