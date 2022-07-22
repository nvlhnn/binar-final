const multerValidator = (uploader) => {
  return async (req, res, next) => {
    uploader(req, res, function (err) {
      try {
        if (err) {
          console.log(err);
          let msg;

          msg =
            err.code == "LIMIT_UNEXPECTED_FILE"
              ? "Invalid file input"
              : err.message;
          throw {
            status: 400,
            message: [msg ? msg : err],
          };
        } else {
          next();
        }
      } catch (error) {
        next(error);
      }
    });
  };
};

// const exampleSchema = [("foo", "The foo field is required").notEmpty()];

// router.post("/foos", multerValidator(exampleSchema), fooHandler);

module.exports = multerValidator;
