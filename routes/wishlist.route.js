const Wishlish = require("../controllers/wishlist.controller");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.post("/:productId", auth, Wishlish.create);
router.get("/", auth, Wishlish.getUserWishlists);
router.delete("/:productId", auth, Wishlish.destroy);

module.exports = router;
