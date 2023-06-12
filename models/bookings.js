'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bookings.init({
    user_id: DataTypes.INTEGER,
    flight_id: DataTypes.INTEGER,
    seat_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    passengers: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};