const { check, body } = require("express-validator");
const { User } = require("../models");

const registerRule = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email not valid")
    .bail()
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("Email Already Taken");
        }
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape(),
];

const loginRule = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email not valid")
    .bail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .trim()
    .escape(),
];

module.exports = { loginRule, registerRule };
