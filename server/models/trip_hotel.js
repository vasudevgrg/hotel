'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip_Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trip_Hotel.init({
    trip_id: DataTypes.INTEGER,
    hotel_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trip_Hotel',
    tableName:'Trip_Hotel'
  });
  return Trip_Hotel;
};