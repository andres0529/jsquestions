/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const user = require("./../db/models/userInfo.model");
const helper = require("./../utils/helpers");

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
        password: helper.hashPassword(password),
        fullName: name,
        email: email,
        lastLoggin: "",
        score: 0,
        questions: [],
      };
      await user.create(newRecord);
      res.redirect("/auth/login/?message=User Created");
      return;
    }
    res.redirect("/auth/register/?message=" + message);
    return;
  },
};

module.exports = authService;
