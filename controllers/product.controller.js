const { User, Product, sequelize, Notification, Bid } = require("../models");
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
      const product = await Product.findOne({
        where: {
          id: req.params.productId,
        },
      });
      if (!product) {
        throw {
          status: 404,
          message: "Product not found",
        };
      }
      const response = setResponse("success", product, null);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async getSellerProdutcs(req, res, next) {
    try {
      const userId = req.user.id;

      const filter = { sellerId: userId };

      if (req.query.type == "bidded") {
        filter["$bids.status$"] = "pending";
      } else if (req.query.type == "sold") {
        filter.status = "sold";
      }

      console.log(req.query, filter);

      const products = await Product.findAll({
        include: ["bids"],
        where: filter,
      });

      const response = setResponse("success", products, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getSellerProductWithBids(req, res, next) {
    // try {
    //   const { productId } = req.params;
    //   const product = await Product.findOne({
    //     where: { id: productId, sellerId: req.user.id },
    //     include: [{ model: Bid, as: "bids", include: ["buyer"], exclude:['productId', 'buyerId', 'sellerId', ] }],
    //   });
    //   const response = setResponse("success", product, null);
    //   res.status(200).json(response);
    // } catch (error) {
    //   next(error);
    // }
  }
}
module.exports = ProductController;
