const notificationController = require("../controllers/notification.controller.js");
const auth = require("../middlewares/auth.js");
const router = require("express").Router();

router.get("/", [auth], notificationController.getUserNotifs);
router.put("/", [auth], notificationController.updateNotifsRead);

module.exports = router;
