'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class passengers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      passengers.belongsTo(models.bookings, {
        foreignKey: 'id'
      })
    }
  }
  passengers.init({
    name: DataTypes.STRING,
    born_date: DataTypes.DATE,
    citizen: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    publisher_country: DataTypes.STRING,
    valid_until: DataTypes.DATE,
    booking_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'passengers',
  });
  return passengers;
};