/* eslint-disable no-unused-vars */
const express = require("express");
const authService = require("./../services/auth.service");
const router = express.Router();
const passport = require("passport");
const user = require("./../db/models/userInfo.model");

// *****To Load the view Register
router.get("/register", (req, res) => {
  let message = req.query.message;
  res.render("auth/register", { message: message, title: "Register" });
});

// *****To create the new user into the DB
router.post("/register", async (req, res) => {
  // call the service who is in charge to manage the request
  await authService.register(req.body, res);
});

// *****To Load the view Login
router.get("/login", (req, res, next) => {
  let message = req.query.message;
  if (message === "404") {
    message = "User or password invalid";
  }
  res.render("auth/login", { message: message, title: "Login" });
  // res.render("auth/login", { message: message, title: "Login" });
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: 'login/?message=Invalid username or password',
  failureFlash: true
}), function(req, res) {
  res.redirect('/myaccount');
});


// ****To log out
router.get("/logout", async function (req, res, next) {
  // Updating the last log in date
  let lastLog = new Date().toLocaleDateString();
  await user.findByIdAndUpdate(req.user.id, {
    lastLoggin: lastLog,
  });

  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
