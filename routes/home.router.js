const express = require("express");
const router = express.Router();
const homeService = require("./../services/home.service.js")


router.get("/", async(req, res) => {
  let result = await homeService()
  res.render('index',{
    title: 'Home',
    user: req.user
  })
});

module.exports = router;

