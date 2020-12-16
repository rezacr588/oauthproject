const router = require("express").Router();
function authCheck(req, res, next) {
  if (!req.user) {
    res.redirect("/auth/login");
  }
  next();
}
router.get("/", authCheck, (req, res) => {
  res.render("profile", { user: req.user, thumbnail: req.user.thumbnail });
});
module.exports = router;
