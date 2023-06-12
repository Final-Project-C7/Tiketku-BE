'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airline_id: {
        type: Sequelize.INTEGER
      },
      flight_code: {
        type: Sequelize.STRING
      },
      departure: {
        type: Sequelize.INTEGER
      },
      arrival: {
        type: Sequelize.INTEGER
      },
      seat_id: {
        type: Sequelize.INTEGER
      },
      economyClass_price: {
        type: Sequelize.INTEGER
      },
      premiumEconomy_price: {
        type: Sequelize.INTEGER
      },
      business_price: {
        type: Sequelize.INTEGER
      },
      firstClass_price: {
        type: Sequelize.INTEGER
      },
      departure_time: {
        type: Sequelize.DATE
      },
      arrival_time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};