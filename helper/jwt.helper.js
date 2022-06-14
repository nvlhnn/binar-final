const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  return token;
};

module.exports = generateJWT;
