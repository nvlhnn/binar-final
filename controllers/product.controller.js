const { User, Product } = require("../models");
const setResponse = require("../helper/response.helper");

class UserControllers {
  static async create(req, res, next) {
    res.status(200).json({ ok });
  }

  static async getById(req, res, next) {}
}
module.exports = UserControllers;
