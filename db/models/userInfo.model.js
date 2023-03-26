const mongoose = require("mongoose");
const schema = mongoose.Schema;
// extend the functionality of this model as it's used for authentication
const plm = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new schema(
  {
    oauthProvider: String,
    oauthId: String,
    password: String,
    fullName: String,
    email: String,
    lastLoggin: String,
    score: Number,
    questions: Array,
  },
  {
    timestamps: true,
  }
);

// convert this model from a regular model to one that inherits all the abilities of user management
userSchema.plugin(plm);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("user", userSchema);
