/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let question = require("./../db/models/question.model");
let user = require("./../db/models/userInfo.model");

const gameService = {
  getQuestion: async () => {
    try {
      let questionslist = await question.find();
      // grabbing a random question of the list that I got
      let randomNumber = Math.floor(Math.random() * questionslist.length);
      return questionslist[randomNumber];
    } catch (error) {
      return error;
    }
  },

  evaluateAnswer: async (rightanswer, req, scorequestion, questionid) => {
    let selected = parseInt(req.query.option);
    try {
      // if the answer is right
      if (rightanswer === selected) {
        await user.findByIdAndUpdate(
          req.user.id,
          { $inc: { score: scorequestion } },
          { new: true }
        );
        await user.findByIdAndUpdate(
          req.user.id,
          { $push: { questions: questionid } },
          { new: true }
        );
      }
    } catch (error) {
      return error;
    }
  },
};
module.exports = gameService;
