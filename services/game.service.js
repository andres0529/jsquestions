/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let question = require("./../db/models/question.model");

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
};
module.exports = gameService;
