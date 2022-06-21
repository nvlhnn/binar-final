const productController = require("../controllers/product.controller.js");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const isSeller = require("../middlewares/isSeller.js");
const verified = require("../middlewares/verified");

router.get("/seller", [auth], productController.getSellerProdutcs);
router.get("/:productId", productController.getBySlug);
router.get("/", productController.getAll);
router.post("/", [auth, verified], productController.create);
router.put("/:productId", [auth, isSeller, verified], productController.update);
router.delete(
  "/:productId",
  [auth, isSeller, verified],
  productController.deleteProduct
);
// router.get(
//   "/:productId/bid",
//   [auth, isSeller],
//   productController.getSellerProductWithBids
// );

module.exports = router;
