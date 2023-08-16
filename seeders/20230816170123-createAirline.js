"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("airlines", [
      {
        airline_name: "Emirates",
        baggage: 30,
        cabin_baggage: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Singapore Airlines",
        baggage: 32,
        cabin_baggage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Qantas",
        baggage: 23,
        cabin_baggage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Lufthansa",
        baggage: 25,
        cabin_baggage: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Air France",
        baggage: 28,
        cabin_baggage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Garuda Indonesia",
        baggage: 30,
        cabin_baggage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Cathay Pacific",
        baggage: 28,
        cabin_baggage: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Turkish Airlines",
        baggage: 28,
        cabin_baggage: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "ANA (All Nippon Airways)",
        baggage: 23,
        cabin_baggage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Virgin Atlantic",
        baggage: 30,
        cabin_baggage: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Lion Air",
        baggage: 20,
        cabin_baggage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Batik Air",
        baggage: 23,
        cabin_baggage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_name: "Citilink",
        baggage: 15,
        cabin_baggage: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan lebih banyak data sesuai kebutuhan
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airlines", null, {});
  },
};
