'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('passengers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      born_date: {
        type: Sequelize.DATE
      },
      citizen: {
        type: Sequelize.STRING
      },
      identity_number: {
        type: Sequelize.STRING
      },
      publisher_country: {
        type: Sequelize.STRING
      },
      valid_until: {
        type: Sequelize.DATE
      },
      booking_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('passengers');
  }
};