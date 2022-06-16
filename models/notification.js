"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      this.belongsTo(models.User, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Notification.init(
    {
      productId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      bidPrice: DataTypes.DECIMAL,
      isRead: DataTypes.BOOLEAN,
      status: DataTypes.ENUM("published", "bidIn", "bidding", "bidAccepted"),
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
