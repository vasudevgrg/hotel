'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel_Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hotel_Amenity.init({
    amenity_id: DataTypes.INTEGER,
    hotel_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hotel_Amenity',
    tableName:'Hotel_Amenity'
  });
  return Hotel_Amenity;
};