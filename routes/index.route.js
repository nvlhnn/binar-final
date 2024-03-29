const router = require("express").Router();

const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const bidRoute = require("./bid.route");
const notificationRoute = require("./notification.route");
const wishlistRoute = require("./wishlist.route");

router.use("/wishlists", wishlistRoute);
router.use("/notifications", notificationRoute);
router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/bids", bidRoute);

router.use("/api", router);
router.get("/api", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
