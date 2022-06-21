const { User, Notification } = require("../models");
const setResponse = require("../helper/response.helper");
const { Op } = require("sequelize");

class NotificationController {
  static async getUserNotifs(req, res, next) {
    try {
      const notifs = await Notification.findAll({
        where: { userId: req.user.id, isRead: false },
        include: ["product", "bid"],
        order: [["createdAt", "ASC"]],
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

      if (!id) {
        throw {
          status: 400,
          message: "Required id in body",
        };
      }

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
          status: 400,
          message: "Invalid id. Cant update other user's notifications ",
        };
      }

      await Notification.update(
        { isRead: true },
        {
          where: { userId: { [Op.in]: id } },
        }
      );

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
