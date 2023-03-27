const express = require("express");
const router = express.Router();


router.use((req, res, next) => {
  if (req.user) next();
  else res.redirect('auth/login');
});

router.get("/", (req, res) => {
  let params = {
    title: "Game",
    // result: result,
    user: req.user,
  };
  res.render("game", params);
});

module.exports = router;
