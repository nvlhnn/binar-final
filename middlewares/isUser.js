const isUser = (req, res, next) => {
  const { id } = req.params;

  console.log("ok");
  if (req.user.id == id) {
    return next();
  } else {
    throw {
      status: 403,
      message: "Forbidden request",
    };
  }
};

module.exports = isUser;
