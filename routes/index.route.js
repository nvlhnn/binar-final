const router = require("express").Router();

const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);

router.use("/api", router);
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
