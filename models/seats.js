'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      seats.hasMany(models.flights, {
        foreignKey: 'id'
      })

      seats.hasMany(models.bookings, {
        foreignKey: 'id'
      })
    }
  }
  seats.init({
    seat_number: DataTypes.INTEGER,
    availability: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'seats',
  });
  return seats;
};