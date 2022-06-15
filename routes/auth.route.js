const authController = require("../controllers/auth.controller.js");
// const validate = require("../validation/validator");
// const UserRule = require("../validation/user.rule");
const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
