/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let userInfoSchema = require("./../db/models/userInfo.model");

const homeService = async () => {
  let topTen = await userInfoSchema.find().sort({ score: -1 }).limit(10);
  return topTen;
};

module.exports = homeService;
