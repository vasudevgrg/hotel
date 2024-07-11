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
      User.hasMany(models.Hotel, {
        foreignKey: "user_id",
      });

      User.hasMany(models.Trip, {
        foreignKey: "user_id",
      });

      User.hasMany(models.Message, {
        foreignKey: "sender_id",
        as: "SentMessages",
      });
      User.hasMany(models.Message, {
        foreignKey: "receiver_id",
        as: "ReceivedMessages",
      });

      User.hasMany(models.Rating, {
        foreignKey:'user_id'
      })
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["hotel owner", "traveller"]],
        },
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    }
  );
  return User;
};
