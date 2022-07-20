const { User } = require("../models");
const setResponse = require("../helper/response.helper");
const cloudinary = require("../services/cloudinary.service");
const fs = require("fs");
const getPublicId = require("../helper/cloudinary.helper");

class UserController {
  static async update(req, res, next) {
    try {
      const { file } = req;

      // check if file uploaded
      if (!req.user.verified && !file) {
        throw {
          status: 400,
          message: ["Profile picture is required"],
        };
      } else if (file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        req.body.profilePicture = result.secure_url;
      }

      // delete user profile picture
      if (file && req.user.profilePicture) {
        const match = getPublicId(req.user.profilePicture);
        await cloudinary.uploader.destroy(match);
      }

      req.body.verified = true;
      const updatedUser = await User.update(req.body, {
        where: {
          id: req.user.id,
        },
        returning: true,
      });
      updatedUser[1][0].password = undefined;
      updatedUser[1][0].createdAt = undefined;
      updatedUser[1][0].updatedAt = undefined;

      const response = setResponse("success", updatedUser[1][0], null);
      res.status(200).json(response);
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
