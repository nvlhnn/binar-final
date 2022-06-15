const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { UserGame } = require("../models");

/* Passport JWT Options */
const options = {
  // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),

  /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
    Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
    UserGame.findByPk(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err, false));
  })
);

module.exports = passport;
