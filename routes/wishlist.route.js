const Wishlish = require("../controllers/wishlist.controller");
const auth = require("../middlewares/auth");
const verified = require("../middlewares/verified");

const router = require("express").Router();

router.post("/product/:productId", [auth, verified], Wishlish.create);
router.get("/", [auth, verified], Wishlish.getUserWishlists);
router.delete("/product/:productId", [auth, verified], Wishlish.destroy);

module.exports = router;
