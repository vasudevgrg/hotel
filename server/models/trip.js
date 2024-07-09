'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Trip.belongsTo(models.User, {
      foreignKey:'user_id'
     });

     Trip.belongsToMany(models.Location, {
      through:models.Trip_Location,
      foreignKey:'trip_id',
      otherKey:'location_id'
     });

     Trip.belongsToMany(models.Hotel, {
      through:models.Trip_Hotel,
      foreignKey:'trip_id',
      otherKey:'hotel_id'
     })
    }
  }
  Trip.init({
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trip',
    tableName:'Trip'
  });
  return Trip;
};