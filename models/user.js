"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Notification, {
        foreignKey: "userId",
        as: "notifications",
      });
      this.belongsToMany(models.Product, {
        through: "Wishlists",
        foreignKey: "userId",
        otherKey: "productId",
        // as: "wishlists",
      });
      // this.hasMany(models.Product, {
      //   foreignKey: "sellerId",
      //   as: "products",
      // });
      this.hasMany(models.Bid, {
        foreignKey: "buyerId",
        as: "bids",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.TEXT,
      phone: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
