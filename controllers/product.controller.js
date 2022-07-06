const { User, Product, sequelize, Notification, Bid } = require("../models");
const setResponse = require("../helper/response.helper");
const { Op } = require("sequelize");
const generateSlug = require("../helper/slug.helper");
const cloudinary = require("../services/cloudinary.service");
const fs = require("fs");
const getPublicId = require("../helper/cloudinary.helper");

class ProductController {
  static async create(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = req.user;
        const { files } = req;

        req.body.status = "published";
        req.body.sellerId = id;
        req.body.slug = generateSlug(req.body.name);
        const images = new Array();

        // check if file uploaded
        if (!files) {
          throw {
            status: 400,
            message: ["Image is required"],
          };
        } else {
          for (let file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            fs.unlinkSync(file.path);
            images.push(result.secure_url);
          }

          req.body.images = images;
        }

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

        global.io.emit("notif", { msg: "product created" });

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

      let filter = { status: "published" };
      const arr = [];
      let sort;

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

      if (req.query.sort) {
        switch (req.query.sort) {
          case "latest":
            sort = ["createdAt", "DESC"];
            break;
          case "oldest":
            sort = ["createdAt", "ASC"];
            break;
          case "cheapest":
            sort = ["price", "ASC"];
            break;
          case "expensive":
            sort = ["price", "DESC"];
            break;
          default:
            sort = ["createdAt", "DESC"];
            break;
        }
      } else {
        sort = ["createdAt", "DESC"];
      }

      console.log(req.user == undefined);
      if (req.user != undefined) {
        filter.sellerId = { [Op.ne]: req.user.id };
        console.log(req.user, filter);
      }

      const products = await Product.findAll({
        where: filter,
        limit: limit,
        offset: offset,
        include: [
          {
            model: User,
            as: "seller",
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        order: [sort],
        attributes: { exclude: ["sellerId", "createdAt", "updatedAt"] },
      });

      const response = setResponse("success", products, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { files } = req;
        if (req.body.name) req.body.slug = generateSlug(req.body.name);
        const images = new Array();

        // check if file uploaded
        if (files) {
          for (let file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            fs.unlinkSync(file.path);
            images.push(result.secure_url);
          }
          req.body.images = images;

          // delete product picture
          const productBefore = await Product.findOne({
            where: { id: req.params.productId },
            transaction: t,
          });

          if (productBefore.images) {
            for (let image of productBefore.images) {
              const match = getPublicId(image);
              await cloudinary.uploader.destroy(match);
            }
          }
        }

        if (Object.getOwnPropertyNames(req.body).length === 0) {
          throw {
            status: 400,
            message: ["Nothing to update"],
          };
        }

        const product = await Product.update(req.body, {
          where: { id: req.params.productId },
          returning: true,
          transaction: t,
        });

        const response = setResponse("success", product[1][0], null);
        res.status(200).json(response);
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req, res, next) {
    try {
      const slug = req.params.productSlug;
      let bid;

      const product = await Product.findOne({
        where: {
          slug: slug,
        },
        include: [
          {
            model: User,
            as: "seller",
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
        attributes: { exclude: ["sellerId", "createdAt", "updatedAt"] },
      });

      if (!product) {
        throw {
          status: 404,
          message: "Product not found",
        };
      }

      if (req.user && product.sellerId != req.user.id) {
        bid = await Bid.findOne({
          where: {
            buyerId: req.user.id,
            status: "pending",
            productId: product.id,
          },
        });
      }
      product.setDataValue("bidded", bid ? true : false);

      const response = setResponse("success", product, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getSellerProdutcs(req, res, next) {
    try {
      const userId = req.user.id;

      const filter = { sellerId: userId };
      const include = new Array();

      if (req.query.type == "bidded") {
        filter["$bids.status$"] = "pending";
        const bidAssociation = {
          model: Bid,
          as: "bids",
          where: { status: "pending" },
          include: {
            model: User,
            as: "buyer",
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
          attributes: {
            exclude: [
              "productId",
              "buyerId",
              "sellerId",
              "createdAt",
              "updatedAt",
            ],
          },
        };
        include.push(bidAssociation);
      } else if (req.query.type == "sold") {
        filter.status = "sold";
      }

      const products = await Product.findAll({
        where: filter,
        include: include,
        attributes: { exclude: ["sellerId", "createdAt", "updatedAt"] },
      });

      const response = setResponse("success", products, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      await Product.destroy({
        where: {
          id: req.params.productId,
        },
      });
      const response = setResponse("success", null, "Product deleted");
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = ProductController;
