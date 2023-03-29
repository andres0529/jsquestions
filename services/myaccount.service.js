/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let question = require("./../db/models/question.model");


// Funtion to retrieve all the right answers for the current user
const myaccountService = async (idquestions) => {
  return await Promise.all(
    idquestions.map(async (id) => {
      return await question.findById(id);
    })
  );
};
module.exports = myaccountService;
