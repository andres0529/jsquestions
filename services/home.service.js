/* eslint-disable no-unused-vars */
const connection = require("./../db/config.js");
let user = require("./../db/models/userInfo.model");

const homeService = {
  getTopTen: async () => {
    let topTen = await user.find().sort({ score: -1 }).limit(10);
    // Increasing in 1 all the positions into the array
    topTen.forEach((user, i) => (user.pos = i + 1));
    return topTen;
  },

  deleteAccount: async (id) => {
    try {
      await user.findByIdAndDelete({ _id: id });
      console.log("eliminado");
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = homeService;