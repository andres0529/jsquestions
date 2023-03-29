const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.user) next();
  else res.redirect("auth/login");
});

router.get("/", (req, res) => {
  let params = {
    title: "Game",
    // result: result,
    user: req.user,
    count: req.session.score,
  };
  res.render("game", params);
});

router.get("/increment", (req, res) => {
  req.session.score ++
  res.redirect("/game");
});

module.exports = router;
