require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routerApi = require("./routes");
const user = require("./db/models/userInfo.model");
const passport = require("passport");
const session = require("express-session");
require("./strategies/local");


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

// start passport w/session support
app.use(passport.initialize());
app.use(passport.session());

// read / write session vars
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

routerApi(app);

module.exports = app;
