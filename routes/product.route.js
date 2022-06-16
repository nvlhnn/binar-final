const productController = require("../controllers/product.controller.js");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const verified = require("../middlewares/verified");

router.get("/:id", productController.getById);
router.get("/", productController.getAll);
router.post("/", [auth, verified], productController.create);

module.exports = router;
