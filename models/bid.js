"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      this.belongsTo(models.User, {
        foreignKey: "buyerId",
        as: "buyer",
      });
      this.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });
    }
  }
  Bid.init(
    {
      productId: DataTypes.INTEGER,
      buyerId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      bidPrice: DataTypes.DECIMAL,
      status: DataTypes.ENUM("pending", "accepted", "declined"),
    },
    {
      sequelize,
      modelName: "Bid",
    }
  );
  return Bid;
};
