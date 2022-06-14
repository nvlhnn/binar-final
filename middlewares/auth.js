const passport = require("../config/passport");

const auth = passport.authenticate("jwt", {
  session: false,
});

module.exports = auth;
