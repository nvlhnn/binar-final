const Wishlish = require("../controllers/wishlist.controller");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/product/:productId", auth, Wishlish.create);
router.get("/", auth, Wishlish.getUserWishlists);
router.delete("/product/:productId", auth, Wishlish.destroy);

module.exports = router;
