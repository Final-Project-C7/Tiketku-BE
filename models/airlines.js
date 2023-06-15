"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class airlines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      airlines.hasMany(models.flights, {
        foreignKey: "airline_id",
      });
    }
  }
  airlines.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      airline_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      baggage: DataTypes.INTEGER,
      cabin_baggage: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "airlines",
    }
  );
  return airlines;
};
