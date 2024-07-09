'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment_Method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Payment_Method.belongsTo(models.User,{
      foreignKey:'user_id'
     })
    }
  }
  Payment_Method.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment_Method',
    tableName:'Payment_Method'
  });
  return Payment_Method;
};