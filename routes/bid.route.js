const BidController = require("../controllers/bid.controller.js");
const auth = require("../middlewares/auth");
const validate = require("../validation/validator");
const { createRule, updateRule } = require("../validation/bid.scheme");
const isSeller = require("../middlewares/isSeller.js");
const router = require("express").Router();

router.put(
  "/:bidId",
  [auth, validate(updateRule)],
  BidController.updateBidStatus
);
router.post(
  "product/:productId",
  [auth, validate(createRule)],
  BidController.bidding
);
// router.get("/:productId", [auth, isSeller], BidController.getAllBidByProduct);

module.exports = router;
