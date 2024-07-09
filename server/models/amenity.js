'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Amenity.belongsToMany(models.Hotel,{
      through:models.Hotel_Amenity,
      foreignKey:'amenity_id',
      otherKey:'hotel_id'
     });
    }
  }
  Amenity.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Amenity',
    tableName:'Amenity'
  });
  return Amenity;
};