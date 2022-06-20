const passport = require("../config/passport");

const auth = async (req, res, next) => {
  try {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user, info) => {
        if (user) {
          req.user = user;
          next();
        } else {
          throw {
            status: 401,
            message: "Unauthorized",
          };
        }
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
