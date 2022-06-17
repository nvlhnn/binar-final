const productController = require("../controllers/product.controller.js");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const isSeller = require("../middlewares/isSeller.js");
const verified = require("../middlewares/verified");

router.get("/:productId", productController.getById);
router.get("/", productController.getAll);
router.post("/", [auth, verified], productController.create);
router.put("/:productId", [auth, isSeller, verified], productController.update);

module.exports = router;
