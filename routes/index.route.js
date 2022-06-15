const router = require("express").Router();

const authRoute = require("./auth.route");

router.use("/auth", authRoute);

router.use("/api", router);
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
