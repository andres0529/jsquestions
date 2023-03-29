const express = require("express");
const router = express.Router();
const homeService = require("./../services/home.service.js");

router.get("/", async (req, res) => {
  let result = await homeService.getTopTen();

  let params = {
    title: "Home",
    result: result,
    user: req.user || "",
  };

  res.render("index", params);
});

router.post("/", async (req, res) => {
  await homeService.deleteAccount(req.user.id);
  res.redirect("/index");
});

module.exports = router;
