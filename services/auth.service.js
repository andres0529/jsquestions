/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const user = require("./../db/models/userInfo.model");

const authService = {
  register: async (params, res) => {
    const { email, password, confirmPassword, name } = params;
    const userDB = await user.findOne({ email });
    let message = "";
    if (password !== confirmPassword) {
      message = "Passwords do not match";
    } else if (userDB) {
      message = "User already Exist";
    } else {
      let newRecord = {
        username: email,
        fullName: name,
        email: email,
        lastLoggin: "",
        score: 0,
        questions: [],
      };
      const newUser = user.register(
        new user(newRecord),
        password,
        (err, user) => {
          if (err) {
            message = err;
          }
        }
      );
    }

    if (!message) {
      return 200;
    }
    return message;
  },
};

module.exports = authService;
