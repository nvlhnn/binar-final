"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });
      this.hasMany(models.Bid, {
        foreignKey: "productId",
        as: "products",
      });
      this.hasMany(models.Bid, {
        foreignKey: "productId",
        as: "bids",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      categories: DataTypes.ARRAY(DataTypes.STRING),
      description: DataTypes.TEXT,
      status: DataTypes.ENUM("published", "sold"),
      sellerId: DataTypes.INTEGER,
      images: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
