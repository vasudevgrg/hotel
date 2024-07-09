'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey:'sender_id',
        as:'Sender'
      });
      Message.belongsTo(models.User, {
        foreignKey:'receiver_id',
        as:'Receiver'
      })
    }
  }
  Message.init({
    content: DataTypes.TEXT,
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
    tableName:'Message'
  });
  return Message;
};