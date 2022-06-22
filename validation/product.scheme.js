const { check, body } = require("express-validator");
const { User } = require("../models");

const createRule = [
  check("name").notEmpty().withMessage("Name is required"),
  check("categories").notEmpty().withMessage("Categories is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("images").notEmpty().withMessage("Images is required"),
];

module.exports = { createRule };
