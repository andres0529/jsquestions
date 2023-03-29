const express = require("express");
const router = express.Router();
// global auth check to make most methods private

router.use((req, res, next) => {
  if (req.user) next();
  else res.redirect("auth/login");
});

router.get("/", (req, res) => {
  // Reset the question number of game
  req.session.numberquestion = 1;
  res.render("myaccount", { user: req.user });
});

module.exports = router;
