'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Hotel, {
        foreignKey: 'hotel_id'
      });

      Room.hasMany(models.Room_Date,{
        foreignKey:'room_id'
      })
    }
  }

  Room.init({
    room_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vacancy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Room',
    tableName: 'Room',
    indexes:[
    {  fields:['hotel_id']}
    ]
  });

  return Room;
};
