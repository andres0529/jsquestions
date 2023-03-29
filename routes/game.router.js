const express = require("express");
const router = express.Router();
const gameService = require("./../services/game.service");

router.use((req, res, next) => {
  if (req.user) next();
  else res.redirect("auth/login");
});

router.get("/", async (req, res) => {
  // this conditional is to manage the number of questions
  if (req.session.numberquestion > 20) {
    req.session.numberquestion = 1;
    res.redirect("/myaccount");
  }

  let question = await gameService.getQuestion();

  let params = {
    title: "Game",
    question: question.question,
    options: question.options,
    score: question.score,
    user: req.user,
    questionNumber: req.session.numberquestion,
  };

  // save the right answer
  req.session.questionanswer = question.answer;
  req.session.questionscore = question.score;
  req.session.questionid = question.id;

  res.render("game", params);
});

// INCREASE QUESTIONS
router.get("/increment", async (req, res) => {
  req.session.numberquestion++;

  let rightanswer = req.session.questionanswer;
  let questionscore = req.session.questionscore;
  let questionid = req.session.questionid;

  await gameService.evaluateAnswer(rightanswer, req, questionscore,questionid);
  res.redirect("/game");
});

module.exports = router;
