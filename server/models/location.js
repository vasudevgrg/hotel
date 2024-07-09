'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Location.hasMany(models.Hotel,{
      foreignKey:'location_id'
     });

     Location.belongsToMany(models.Trip,{
      through:models.Trip_Location,
      foreignKey:'location_id',
      otherKey:'trip_id'
     })
    }
  }
  Location.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
    tableName:'Location'
  });
  return Location;
};