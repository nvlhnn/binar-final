const productController = require("../controllers/product.controller.js");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const isSeller = require("../middlewares/isSeller.js");
const verified = require("../middlewares/verified");
const { createRule } = require("../validation/product.scheme.js");
const validate = require("../validation/validator.js");

router.get("/seller", [auth, verified], productController.getSellerProdutcs);
router.get("/:productSlug", productController.getBySlug);
router.get("/", productController.getAll);
router.post(
  "/",
  [auth, verified, validate(createRule)],
  productController.create
);
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
