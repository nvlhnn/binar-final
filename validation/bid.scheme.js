const { check, body } = require("express-validator");
const { User } = require("../models");

const createRule = [
  check("bidPrice").notEmpty().withMessage("Bid price is required").bail(),
];

const updateRule = [
  check("status").notEmpty().withMessage("Status is required"),
];

module.exports = { createRule, updateRule };
