const { Product } = require("../models");

const isSeller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const product = await Product.findByPk(productId);

    if (!product) {
      throw {
        status: 404,
        message: "Product doesnt exist",
      };
    }

    if (userId == product.sellerId) {
      return next();
    } else {
      throw {
        status: 403,
        message: "User is not the product's seller",
      };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isSeller;
