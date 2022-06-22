const { check, body } = require("express-validator");
const { User } = require("../models");

const updateRule = [check("id").notEmpty().withMessage("Id is required")];

module.exports = { updateRule };
