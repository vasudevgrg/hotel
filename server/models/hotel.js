'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
   
    static associate(models) {
      Hotel.belongsToMany(models.Trip,{
        through:models.Trip_Hotel,
        foreignKey:'hotel_id',
        otherKey:'trip_id'
      });

      Hotel.belongsTo(models.User,{
        foreignKey:'user_id'
      });

      Hotel.hasMany(models.Room, {
        foreignKey:'hotel_id'
      });

      Hotel.belongsTo(models.Location, {
        foreignKey:'location_id'
      })

      Hotel.belongsToMany(models.Amenity, {
        through:models.Hotel_Amenity,
        foreignKey:'hotel_id',
        otherKey:'amenity_id'
      });

      Hotel.hasMany(models.Rating,{
        foreignKey:'hotel_id'
      })
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    location_id:DataTypes.INTEGER,
    hotel_pic:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
    tableName:'Hotel'
  });
  return Hotel;
};