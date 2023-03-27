/* eslint-disable no-unused-vars */
const passport = require("passport");
const { Strategy } = require("passport-local");
const user = require("./../db/models/userInfo.model");
const helper = require("./../utils/helpers");

passport.serializeUser((user, done) => {
  console.log("Serializing user...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user...");
  console.log(id);
  try {
    const result = await user.findById(id);
    if (!result) throw new Error("User not found");
    console.log("result", result);
    done(null, result);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async (email, password, done) => {
      console.log("password", password);
      console.log("email", email);

      try {
        if (!email || !password)
          throw new Error("Bad Request. Missing credentials");
        const userDB = await user.findOne({ email });
        if (!userDB) throw new Error("No Found");
        const isValid = helper.comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Authenticated Succesfully");
          done(null, userDB);
        } else {
          console.log("Invalid Authentication");
          done(null, null);
        }
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);
