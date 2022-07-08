const passport = require("../config/passport");

const auth = async (req, res, next) => {
  try {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user, info) => {
        try {
          if (!user) {
            throw {
              status: 401,
              message: "Unauthorized",
            };
          } else {
            req.user = user;
            next();
          }
        } catch (error) {
          next(error);
        }
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
