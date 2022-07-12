const UserController = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth");
const { updateRule } = require("../validation/user.scheme.js");
const validate = require("../validation/validator.js");
const multerValidator = require("../validation/multerValidator.js");
const upload = require("../helper/upload.js");

// const validate = require("../validation/validator");
// const UserRule = require("../validation/user.rule");
const router = require("express").Router();

router.get("/", [auth], UserController.getInfo);
router.put(
  "/",
  [
    multerValidator(upload.single("profilePicture")),
    auth,
    validate(updateRule),
  ],
  UserController.update
);

module.exports = router;
