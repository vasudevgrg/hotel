'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room_Date.belongsTo(models.Room, {
        foreignKey:'room_id'
      });
    }
  }
  Room_Date.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room_Date',
    tableName:'Room_Date'
  });
  return Room_Date;
};