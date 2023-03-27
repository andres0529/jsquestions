/* eslint-disable no-unused-vars */
const express = require("express");
const authService = require("./../services/auth.service");
const router = express.Router();
const passport = require("passport");
const user = require("./../db/models/userInfo.model");

// To Load the view Register
router.get("/register", (req, res) => {
  let message = req.query.message;
  res.render("auth/register", { message: message, title: "Register" });
});

// To create the new user into the DB
router.post("/register", async (req, res) => {
  // call the service who is in charge to manage the request
  let message = await authService.register(req.body, res);
  if (message === 200) {
    res.redirect("/auth/login/?message=User Created");
  } else {
    res.redirect("/auth/register/?message=" + message);
  }
});

router.get("/login", (req, res) => {
  let message = req.query.message;
  res.render("auth/login", { message: message, title: "Login" });
});

module.exports = router;
