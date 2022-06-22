const { check, body } = require("express-validator");
const { User } = require("../models");

const updateRule = [
  check("city").notEmpty().withMessage("city is required"),
  check("address").notEmpty().withMessage("address is required"),
  check("phone").notEmpty().withMessage("phone is required"),
  check("profilePicture").notEmpty().withMessage("profilePicture is required"),
];

module.exports = { updateRule };
