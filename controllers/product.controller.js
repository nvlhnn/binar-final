const {
  User,
  Product,
  sequelize,
  Notification,
  Bid,
  Wishlist,
} = require("../models");
const setResponse = require("../helper/response.helper");
const { Op, QueryTypes } = require("sequelize");
const generateSlug = require("../helper/slug.helper");
const cloudinary = require("../services/cloudinary.service");
const fs = require("fs");
const getPublicId = require("../helper/cloudinary.helper");

class ProductController {
  static async create(req, res, next) {
    console.log(req.body);
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = req.user;
        const { files } = req;

        for (const category in req.body.categories) {
          if (req.body.categories[0].includes(",")) {
            // console.log(req.body.categories[0]);
            req.body.categories = req.body.categories[0].split(",");
          }
        }
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

        global.io.to(req.user.id).emit("notif", { msg: "product created" });

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

      const count = await Product.count({ where: filter });

      const response = setResponse("success", { products, count }, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      // swagger fix
      for (const category in req.body.categories) {
        if (req.body.categories[0].includes(",")) {
          req.body.categories = req.body.categories[0].split(",");
        }
      }

      for (const imgB in req.body.imagesBefore) {
        if (req.body.imagesBefore[0].includes(",")) {
          req.body.imagesBefore = req.body.imagesBefore[0].split(",");
        }
      }
      const result = await sequelize.transaction(async (t) => {
        const { files } = req;

        const productBefore = await Product.findOne({
          where: { id: req.params.productId },
          transaction: t,
        });

        req.body.images = [...productBefore.images];

        if (req.body.name && req.body.name !== productBefore.name) {
          req.body.slug = generateSlug(req.body.name);
        }

        // check if images will be null
        if (
          req.body.imagesBefore &&
          req.body.imagesBefore[0] == "" &&
          files.length == 0
        ) {
          throw {
            status: 400,
            message: ["Product images cannot be empty"],
          };
        }

        // check if want to delete some image
        if (req.body.imagesBefore) {
          for (let image of req.body.images) {
            if (!req.body.imagesBefore.includes(image)) {
              const match = getPublicId(image);
              if (match) await cloudinary.uploader.destroy(match);
            }
          }
          req.body.images = req.body.imagesBefore;
        }

        // check if file uploaded
        if (files && files.length > 0) {
          for (let file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            fs.unlinkSync(file.path);
            req.body.images.push(result.secure_url);
          }
        }

        // check if product status is sold, delete all bid
        if (req.body.status && req.body.status == "sold") {
          const bids = await Bid.update(
            { status: "declined" },
            {
              where: { productId: req.params.productId },
            }
          );

          console.log(bids);
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
      let wished = false;

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

        await sequelize
          .query(
            `SELECT * FROM "Wishlists" WHERE "Wishlists"."userId" = ? AND "Wishlists"."productId" = ?;`,
            {
              replacements: [req.user.id, product.id],
              type: QueryTypes.SELECT,
            }
          )
          .then((res) => (wished = res));

        // wished = await User.findOne({
        //   where: {
        //     id: req.user.id,
        //   },
        //   include: [
        //     {
        //       model: Product,
        //       where: { id: product.id },
        //       through: {
        //         attributes: [],
        //       },
        //     },
        //   ],
        // });

        wished = wished;
      }
      product.setDataValue("bidded", bid ? true : false);
      product.setDataValue("wished", wished.length > 0 ? true : false);

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
