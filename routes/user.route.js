const UserControllers = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth");

// const validate = require("../validation/validator");
// const UserRule = require("../validation/user.rule");
const router = require("express").Router();
router.put("/update",[auth], UserControllers .update);

module.exports = router;