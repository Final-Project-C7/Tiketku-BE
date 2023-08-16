"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("airports", [
      {
        airport_name: "Bandara Frankfurt",
        city: "Frankfurt",
        country: "Jerman",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/IMG-1692196573335_MavseLQis.jpg?updatedAt=1692196553196",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Heathrow",
        city: "London",
        country: "Inggris",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/Things-To-Do-In-London.jpg?updatedAt=1692212042495",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Charles de Gaulle",
        city: "Paris",
        country: "Prancis",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/292151.jpg?updatedAt=1692211988657",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara JFK",
        city: "New York",
        country: "Amerika Serikat",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/IMG-1692201482180_HDVMLgF6j.jpg?updatedAt=1692201462620",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Cairo",
        city: "Kairo",
        country: "Mesir",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/cairo-1980350_1280.jpg?updatedAt=1692211676566",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Beijing",
        city: "Beijing",
        country: "Tiongkok",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/beijing_Fotor.jpg?updatedAt=1692211612026",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Sydney",
        city: "Sydney",
        country: "Australia",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/IMG-1692196755674_AnbH8rZwg.jpg?updatedAt=1692196735406",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Soekarno-Hatta",
        city: "Jakarta",
        country: "Indonesia",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/IMG-1692196360304_fNunfJMkg.jpg?updatedAt=1692196339936",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Ngurah Rai",
        city: "Bali",
        country: "Indonesia",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/IMG-1692196476128_pJOVPtnG3.jpg?updatedAt=1692196455846",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Kuala Lumpur",
        city: "Kuala Lumpur",
        country: "Malaysia",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/IMG-1692196434807_WAB89uNko.jpg?updatedAt=1692196413825",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Cape Town International",
        city: "Cape Town",
        country: "Afrika Selatan",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/capetown.jpg?updatedAt=1692211562303",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara O.R. Tambo",
        city: "Johannesburg",
        country: "Afrika Selatan",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/96a11b8a-johannesburg-4322256-image-by-gia-conte-patel-from-pixabay.jpg.optimal.jpg?updatedAt=1692211393619",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Hamad",
        city: "Doha",
        country: "Qatar",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/WhyYoushouldstopoverinDoha__HERO_shutterstock_1043867329.jpg?updatedAt=1692211394335",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Dubai International",
        city: "Dubai",
        country: "Uni Emirat Arab",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/thumb-1920-695176.jpg?updatedAt=1692211428352",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara El Dorado",
        city: "Bogotá",
        country: "Kolombia",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/jxjB5F3WBO.jpg?updatedAt=1692211293515",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_name: "Bandara Jorge Chávez",
        city: "Lima",
        country: "Peru",
        imgURL:
          "https://ik.imagekit.io/d7db3iedn/493990529-56a412bc5f9b58b7d0d559f6.jpg?updatedAt=1692209954460",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airports", null, {});
  },
};
