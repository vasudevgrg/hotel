'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip_Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip_Location.init({
    trip_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trip_Location',
    tableName:'Trip_Location'
  });
  return Trip_Location;
};