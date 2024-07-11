'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Trip.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      Trip.belongsToMany(models.Location, {
        through: models.Trip_Location,
        foreignKey: 'trip_id',
        otherKey: 'location_id',
      });

      Trip.belongsToMany(models.Hotel, {
        through: models.Trip_Hotel,
        foreignKey: 'trip_id',
        otherKey: 'hotel_id',
      });
    }
  }

  Trip.init(
    {
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Start date cannot be empty',
          },
          isDate: {
            msg: 'Start date must be a valid date',
          },
        },
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'End date cannot be empty',
          },
          isDate: {
            msg: 'End date must be a valid date',
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'User ID cannot be empty',
          },
          isInt: {
            msg: 'User ID must be an integer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Trip',
      tableName: 'Trip',
      validate: {
        startDateBeforeEndDate() {
          if (new Date(this.startDate) >= new Date(this.endDate)) {
            throw new Error('Start date must be before end date');
          }
        },
      },
    }
  );
  
  return Trip;
};
