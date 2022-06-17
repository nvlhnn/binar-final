const { check, body } = require("express-validator");
const { User } = require("../models");

const updateRule = [
  check("city")
    .notEmpty()
    .withMessage("city is required"),
];

module.exports = { updateRule };
