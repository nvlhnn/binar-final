const { Wishlist, Product, User } = require("../models");
const setResponse = require("../helper/response.helper");

class WishlistController {
  static async create(req, res, next) {
    try {
      // const { user } = req;
      const user = await User.findOne({
        where: { email: req.user.email },
      });

      const product = await Product.findOne({
        where: { id: req.params.productId },
      });

      if (!product) {
        throw {
          status: 404,
          message: "Product not found",
        };
      }

      const test = await user.addProduct(product);

      console.log(test);

      const response = setResponse(
        "success",
        null,
        "Product added to wishlist"
      );

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUserWishlists(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
        include: Product,
      });
      // res.status(200).json(user);
      const response = setResponse("success", user.Products, null);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async destroy(req, res, next) {}
}

module.exports = WishlistController;
