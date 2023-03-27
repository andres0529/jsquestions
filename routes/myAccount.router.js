const express = require("express");
const router = express.Router();
// global auth check to make most methods private

router.use((req, res, next) => {
  if (req.user) next();
  else res.send(401);
});

router.get("/", (req, res) => {
  res.render("myaccount", { user: req.user });
});

module.exports = router;
