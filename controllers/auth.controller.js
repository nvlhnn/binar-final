const { User } = require("../models");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const generateJWT = require("../helper/jwt.helper");
const setResponse = require("../helper/response.helper");

class AuthController {
  static async login(req, res, next) {
    try {
      if (req.body.email && req.body.password) {
        const user = await User.findOne({
          where: {
            email: req.body.email,
          },
          attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if (!user) {
          throw {
            status: 400,
            message: "Invalid email or password",
          };
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const token = generateJWT(user);
          user.password = undefined;

          const response = setResponse("success", { user, token }, null);
          res.status(200).json(response);
        } else {
          throw {
            status: 400,
            message: "Invalid email or password",
          };
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        throw {
          status: 400,
          message: ["Email already in use"],
        };
      }

      const createdUser = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, salt),
      });
      createdUser.password = undefined;
      createdUser.createdAt = undefined;
      createdUser.updatedAt = undefined;

      const response = setResponse("success", null, "Register user success");
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
