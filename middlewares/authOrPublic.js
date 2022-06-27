const passport = require("../config/passport");

const authOrPublic = async (req, res, next) => {
  try {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      (err, user, info) => {
        // if (info) {
        if (user) {
          req.user = user;
        }
        // } else {
        //   throw {
        //     status: 400,
        //     message: "Invalid token",
        //   };
        // }
        next();
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = authOrPublic;
