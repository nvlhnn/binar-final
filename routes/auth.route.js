const authController = require("../controllers/auth.controller.js");
const validate = require("../validation/validator");
const { loginRule, registerRule } = require("../validation/auth.scheme");
const router = require("express").Router();

router.post("/register", validate(registerRule), authController.register);
router.post("/login", validate(loginRule), authController.login);

module.exports = router;