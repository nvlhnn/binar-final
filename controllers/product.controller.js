const { User, Product, sequelize, Notification } = require("../models");
const setResponse = require("../helper/response.helper");
const { Op } = require("sequelize");

class ProductController {
  static async create(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = req.user;
        req.body.status = "published";
        req.body.sellerId = id;

        const product = await Product.create(req.body, {
          include: ["seller"],
          transaction: t,
        });
        const notifBody = {
          productId: product.id,
          userId: id,
          status: "published",
        };
        await Notification.create(notifBody, { transaction: t });

        const response = setResponse("success", product, null);

        // const test = await User.findOne({
        //   where: { id: 1 },
        //   include: ["notifications"],
        // });

        res.status(201).json(response);
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      let limit = 24;
      let offset = 0;

      let filter = {};
      const arr = [];
      if (req.query.page) offset = (req.query.page - 1) * limit;
      if (req.query.search)
        filter.name = { [Op.iLike]: `%${req.query.search}%` };
      if (req.query.categories) {
        for (let cat of req.query.categories.split(",")) {
          arr.push({
            [Op.contains]: [cat],
          });
        }
        filter.categories = { [Op.or]: arr };
      }

      const products = await Product.findAll({
        where: filter,
        limit: limit,
        offset: offset,
        include: "seller",
      });

      const response = setResponse("success", products, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const product = await Product.update(req.body, {
        where: { id: req.params.productId },
        returning: true,
      });

      const response = setResponse("success", product[1][0], null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      // console.log(req.user)
      const user = await Product.findOne({
        where: {
          id: req.user.id,
        },
      });
      if (!user) {
        throw {
          status: 404,
          message: "Product Not Found",
        };
      } else {
        res.status(200).json(user);
      }
      const response = setResponse("success", products, null);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProductController;
