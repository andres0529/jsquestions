const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.render('game',{
    title: 'Game',
    user: req.user
  })
});

module.exports = router;
