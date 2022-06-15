const { body, validationResult } = require("express-validator");
// const userGameSchema = require("./userGame");

const validate = (schemas) => {
  return async (req, res, next) => {
    try {
      await Promise.all(schemas.map((schema) => schema.run(req)));

      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      errors = result.errors.map((a) => a.msg);

      throw {
        status: 400,
        message: errors,
      };
    } catch (error) {
      next(error);
    }
  };
};

// const exampleSchema = [("foo", "The foo field is required").notEmpty()];

// router.post("/foos", validate(exampleSchema), fooHandler);

module.exports = validate;
