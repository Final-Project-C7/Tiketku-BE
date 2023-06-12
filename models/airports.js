'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class airports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      airports.hasMany(models.flights, {
        foreignKey: 'departure'
      })

      airports.hasMany(models.flights, {
        foreignKey: 'arrival'
      })
    }
  }
  airports.init({
    airport_name: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    imgURL: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'airports',
  });
  return airports;
};