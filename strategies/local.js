const passport = require("passport");
const { Strategy } = require("passport-local");
const user = require("./../db/models/userInfo.model");
const helper = require("./../utils/helpers");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await user.findById(id);
    if (!result) throw new Error("User not found");
    done(null, result);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async (email, password, done) => {
      try {
        if (!email || !password) {
          throw new Error("Bad Request. Missing credentials");
        }

        const userDB = await user.findOne({ email });
        if (!userDB) {
          throw new Error("User not found");
        }

        const isValid = helper.comparePassword(password, userDB.password);
        if (!isValid) {
          return done(null, false);
        }
        let lastLog = new Date().toLocaleDateString();
        await user.findByIdAndUpdate(userDB.id, {
          lastLoggin: lastLog,
        });

        done(null, userDB);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
