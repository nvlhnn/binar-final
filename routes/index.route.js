const router = require("express").Router();

const authRoute = require("./auth.route");
const usercontroller = require("./user.route");

router.use("/user", usercontroller);
router.use("/auth", authRoute);

router.use("/api", router);
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
