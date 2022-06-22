const { User } = require("../models");
const setResponse = require("../helper/response.helper");

class UserController {
  static async update(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!user) {
        throw {
          status: 404,
          message: "User Not Found",
        };
      } else {
        req.body.verified = true;
        const updatedUser = await User.update(req.body, {
          where: {
            id: req.user.id,
          },
          returning: true,
        });
        updatedUser[1][0].password = undefined;
        const response = setResponse("success", updatedUser[1][0], null);
        res.status(200).json(response);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getInfo(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });

      if (!user) {
        throw {
          status: 404,
          message: "User not found",
        };
      }

      const response = setResponse("success", user, null);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserController;
