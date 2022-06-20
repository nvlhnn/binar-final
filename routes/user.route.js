const UserController = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth");

// const validate = require("../validation/validator");
// const UserRule = require("../validation/user.rule");
const router = require("express").Router();

router.get("/", [auth], UserController.getInfo);
router.put("/", [auth], UserController.update);

module.exports = router;
