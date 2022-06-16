const { User } = require("../models");

const verified = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findByPk(id);

    if (user.verified) {
      return next();
    } else {
      throw {
        status: 403,
        message: "User not verified",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verified;
