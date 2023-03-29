const mongoose = require("mongoose");
const schema = mongoose.Schema;

const questionSchema = new schema(
  {
    question: String,
    options: Array,
    score: Number,
    answer: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", questionSchema);
