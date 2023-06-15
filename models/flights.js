'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      flights.belongsTo(models.airlines,
        { foreignKey: 'airline_id' });

      flights.belongsTo(models.admins,
        { foreignKey: 'id' });

      flights.belongsTo(models.airports,
        {
          as: 'departureAirport',
          foreignKey: 'departure'
        });

      flights.belongsTo(models.airports,
        {
          as: 'arrivalAirport',
          foreignKey: 'arrival'
        });

      flights.hasMany(models.bookings,
        { foreignKey: 'id' });

      flights.belongsTo(models.seats, {
        foreignKey: 'id'
      })
    }
  }
  flights.init({
    airline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'airlines',
        key: 'airline_id'
      }
    },
    flight_code: DataTypes.STRING,
    departure: DataTypes.INTEGER,
    arrival: DataTypes.INTEGER,
    seat_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER,
    economyClass_price: DataTypes.INTEGER,
    premiumEconomy_price: DataTypes.INTEGER,
    business_price: DataTypes.INTEGER,
    firstClass_price: DataTypes.INTEGER,
    departure_time: DataTypes.DATE,
    arrival_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'flights',
  });

  // flights.associate = (models) => {
  //   flights.belongsTo(models.airlines, { foreignKey: 'airline_id' });
  // };

  return flights;
};