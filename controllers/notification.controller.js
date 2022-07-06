const { User, Notification, Product, Bid } = require("../models");
const setResponse = require("../helper/response.helper");
const { Op } = require("sequelize");

class NotificationController {
  static async getUserNotifs(req, res, next) {
    try {
      const notifs = await Notification.findAll({
        where: { userId: req.user.id, isRead: false },
        include: [
          {
            model: Product,
            as: "product",
            attributes: {
              exclude: ["sellerId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: User,
                as: "seller",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Bid,
            as: "bid",
            attributes: {
              exclude: [
                "sellerId",
                "buyerId",
                "productId",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: User,
                as: "seller",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
              {
                model: User,
                as: "buyer",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        order: [["createdAt", "ASC"]],
        attributes: {
          exclude: ["bidId", "productId", "createdAt", "updatedAt", "userId"],
        },
      });

      const response = setResponse("success", notifs, null);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getAllUserNotifs(req, res, next) {
    try {
      const notifs = await Notification.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Product,
            as: "product",
            attributes: {
              exclude: ["sellerId", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: User,
                as: "seller",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
            ],
          },
          {
            model: Bid,
            as: "bid",
            attributes: {
              exclude: [
                "sellerId",
                "buyerId",
                "productId",
                "createdAt",
                "updatedAt",
              ],
            },
            include: [
              {
                model: User,
                as: "seller",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
              {
                model: User,
                as: "buyer",
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        order: [
          ["isRead", "ASC"],
          ["createdAt", "DESC"],
        ],
        attributes: {
          exclude: ["bidId", "productId", "createdAt", "updatedAt", "userId"],
        },
      });

      const response = setResponse("success", notifs, null);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async updateNotifsRead(req, res, next) {
    try {
      const { id } = req.body;

      // if (!id) {
      //   throw {
      //     status: 400,
      //     message: "Required id in body",
      //   };
      // }

      const notifs = await Notification.findAll({
        where: {
          id: { [Op.in]: id },
        },
      });

      const invalidId = notifs
        .map((el) => el.userId)
        .filter((el) => el != req.user.id);

      if (invalidId.length > 0) {
        throw {
          status: 403,
          message: "Invalid id. Cant update other user's notifications ",
        };
      }

      const test = await Notification.update(
        { isRead: true },
        {
          where: { id: { [Op.in]: id } },
        }
      );

      global.io.emit("notif", { msg: "notif update" });

      const response = setResponse(
        "success",
        null,
        "success update notifications"
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = NotificationController;
