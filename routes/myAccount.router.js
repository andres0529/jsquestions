const express = require("express");
const router = express.Router();
const myaccountService = require("./../services/myaccount.service");

// global auth check to make most methods private
router.use((req, res, next) => {
  if (req.user) next();
  else res.redirect("auth/login");
});

router.get("/", async (req, res) => {
  // Reset the question number of game
  req.session.numberquestion = 1;
  let result = await myaccountService(req.user.questions);
  res.render("myaccount", { user: req.user, rightquestions: result});
});

module.exports = router;
