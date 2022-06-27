const multerValidator = (uploader) => {
  return async (req, res, next) => {
    uploader(req, res, function (err) {
      try {
        if (err) {
          console.log(err.message);
          let msg;
          msg =
            err.code == "LIMIT_UNEXPECTED_FILE"
              ? "Multiple file uploaded"
              : err.message;
          throw {
            status: 400,
            message: [msg],
          };
        } else {
          next();
        }
      } catch (error) {
        // console.log("ac");
        next(error);
      }
    });
  };
};

// const exampleSchema = [("foo", "The foo field is required").notEmpty()];

// router.post("/foos", multerValidator(exampleSchema), fooHandler);

module.exports = multerValidator;
