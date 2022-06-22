const notificationController = require("../controllers/notification.controller.js");
const auth = require("../middlewares/auth.js");
const { updateRule } = require("../validation/notification.scheme.js");
const validate = require("../validation/validator.js");
const router = require("express").Router();

router.get("/", [auth], notificationController.getUserNotifs);
router.get("/all", [auth], notificationController.getAllUserNotifs);
router.put(
  "/",
  [auth, validate(updateRule)],
  notificationController.updateNotifsRead
);

module.exports = router;
