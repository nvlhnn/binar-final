const { User, Bid, Product, Notification, sequelize } = require("../models");
const setResponse = require("../helper/response.helper");
const { Op } = require("sequelize");

class BidController {
  static async bidding(req, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const product = await Product.findByPk(req.params.productId);

        if (!product) {
          throw {
            status: 404,
            message: "Product not found",
          };
        }

        // check if bider is seller
        if (product.sellerId == req.user.id) {
          throw {
            status: 403,
            message: "Bidder is product's seller",
          };
        }

        // check if bidder already bidding
        const bidExist = await Bid.findOne({
          where: {
            buyerId: req.user.id,
            productId: product.id,
            status: "pending",
          },
        });

        if (bidExist) {
          throw {
            status: 403,
            message: "User already bidding this product",
          };
        }

        const bidBody = {
          productId: product.id,
          buyerId: req.user.id,
          sellerId: product.sellerId,
          bidPrice: req.body.bidPrice,
          status: "pending",
        };

        const bid = await Bid.create(bidBody, {
          raw: true,
          transaction: t,
          include: ["product"],
        });

        // const testBid = await Bid.findOne({
        //   where: { id: bid.id },
        //   transaction: t,
        //   include: ["product"],
        // });

        // console.log(bid);
        // console.log(bid.id);
        // console.log(testBid);

        // send notif bidding to buyer
        const biddingNotif = {
          productId: product.id,
          userId: req.user.id,
          bidId: bid.id,
          status: "bidding",
        };

        // send notif bidin to seller
        const bidinNotif = {
          productId: product.id,
          userId: product.sellerId,
          bidId: bid.id,
          status: "bidIn",
        };

        await Notification.create(bidinNotif, { transaction: t });
        await Notification.create(biddingNotif, { transaction: t });

        global.io.to(product.sellerId).emit("notif", { msg: "bidin product" });
        global.io.to(req.user.id).emit("notif", { msg: "bidding product" });

        console.log(req.user.id, product.sellerId);
        // console.log(bid.id);
        // const bidRes = await Bid.findByPk(27, {
        //   include: ["buyer", "seller"],
        // });

        const response = setResponse(
          "success",
          null,
          "Success bidding product"
        );

        res.status(200).json(response);
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateBidStatus(req, res, next) {
    try {
      await sequelize.transaction(async (t) => {
        const { status } = req.body;
        const bid = await Bid.findByPk(req.params.bidId, { transaction: t });

        // check bid exist
        if (!bid) {
          throw {
            status: 404,
            message: "Bid not found",
          };
        }

        // check user is not seller
        if (bid.sellerId != req.user.id) {
          throw {
            status: 403,
            message: "User is not the product's seller",
          };
        }

        // check bid status is not pending
        if (bid.status != "pending") {
          throw {
            status: 403,
            message: "Can't update this bid status",
          };
        }

        if (status == "accepted") {
          const bidAccepted = {
            productId: bid.productId,
            userId: bid.buyerId,
            bidId: bid.id,
            status: "bidAccepted",
          };
          await Bid.update(
            { status: status },
            { where: { id: bid.id }, transaction: t }
          );
          await Notification.create(bidAccepted, { transaction: t });
          global.io.to(bid.buyerId).emit("notif", { msg: "bid accepted" });
        } else if (status == "declined") {
          await Bid.update(
            { status: status },
            { where: { id: bid.id }, transaction: t }
          );
        } else {
          throw {
            status: 400,
            message: "invalid status",
          };
        }

        const response = setResponse("success", null, "success update bid");

        res.status(200).json(response);
      });
    } catch (err) {
      next(err);
    }
  }

  static async getBuyerBids(req, res, next) {
    try {
      if (req.params.buyerId == req.user.id) {
        throw {
          status: 403,
          message: "Buyer id is user id",
        };
      }

      const buyer = await User.findOne({
        where: { id: req.params.buyerId },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        // order: [[{ model: Bid, as: "bids" }, "id", "desc"]],
      });

      if (!buyer) {
        throw {
          status: 404,
          message: "Invalid buyer id",
        };
      }

      const bids = await Bid.findAll({
        where: {
          sellerId: req.user.id,
          buyerId: req.params.buyerId,

          status: { [Op.ne]: "declined" },
        },
        include: [
          {
            model: Product,
            as: "product",
            attributes: {
              exclude: ["buyerId", "sellerId", "createdAt", "updatedAt"],
            },
          },
        ],
        order: [
          ["status", "ASC"],
          ["createdAt", "DESC"],
        ],
        attributes: {
          exclude: ["productId", "buyerId", "sellerId", "updatedAt"],
        },
      });

      console.log(bids);
      const response = setResponse("success", { buyer, bids }, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = BidController;

// const bid = Bid.create(bidBody, {
//   include: ["buyer", "seller"],
//   raw: true,
//   transaction: t,
// })
//   .then((a) => {
//     console.log(a.id);
//     const bidRes = Bid.findByPk(a.id, {
//       include: ["buyer", "seller"],
//     });
//     return bidRes;
//   })
//   .then((as) => {
//     console.log(as);
//   });
