/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const user = require("./../db/models/userInfo.model");
const helper = require("./../utils/helpers");

const authService = {
  register: async (params, res) => {
    const { email, password, confirmPassword, name } = params;
    const userDB = await user.findOne({ email});
    let message = "";
    if (password !== confirmPassword) {
      message = "Passwords do not match";
    } else if (userDB) {
      message = "User already Exist";
    } else {
      let newRecord = {
        password: helper.hashPassword(password),
        fullName: name,
        email: email,
        lastLoggin: "",
        score: 0,
        questions: [],
      };
      console.log(newRecord)
      const newUser = await user.create(newRecord);
    }

    if (!message) {
      return 200;
    }
    return message;
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400);
    const userDB = await user.findOne({ email });
    if (!userDB) return res.send(401);
    const isValid = helper.comparePassword(password, userDB.password);
    if (isValid) {
      req.session.user = userDB;
      console.log(userDB);
      return 200;
    } else {
      return 401;
    }
  },
};

module.exports = authService;
