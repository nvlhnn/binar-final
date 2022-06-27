const productController = require("../controllers/product.controller.js");
const upload = require("../helper/upload.js");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const authOrPublic = require("../middlewares/authOrPublic.js");
const isSeller = require("../middlewares/isSeller.js");
const verified = require("../middlewares/verified");
const multerValidator = require("../validation/multerValidator.js");
const { createRule } = require("../validation/product.scheme.js");
const validate = require("../validation/validator.js");

router.get("/seller", [auth, verified], productController.getSellerProdutcs);
router.get("/:productSlug", [authOrPublic], productController.getBySlug);
router.get("/", [authOrPublic], productController.getAll);
router.post(
  "/",
  [
    auth,
    verified,
    multerValidator(upload.array("images")),
    validate(createRule),
  ],
  productController.create
);
router.put(
  "/:productId",
  [auth, isSeller, verified, multerValidator(upload.array("images"))],
  productController.update
);
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
