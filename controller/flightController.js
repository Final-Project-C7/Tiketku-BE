const { flights, airlines, airports } = require("../models");

async function createFlights(req, res) {
  try {
    const {
      airline_id,
      flight_code,
      departure,
      arrival,
      seat_id,
      economyClass_price,
      premiumEconomy_price,
      business_price,
      firstClass_price,
      departure_time,
      ariival_time,
    } = req.body;
    const newFlights = await flights.create({
      airline_id,
      flight_code,
      departure,
      arrival,
      seat_id,
      economyClass_price,
      premiumEconomy_price,
      business_price,
      firstClass_price,
      departure_time,
      ariival_time,
    });
    res.status(201).json({
      status: "success",
      data: {
        product: newFlights,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getFlightById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const data = await flights.findByPk(id, {
      include: [
        {
          model: airlines,
          attributes: ["airline_name"],
        },
        {
          model: airports,
          attributes: ["airport_name", "city", "country", "imgURL"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

module.exports = {
  createFlights,
  getFlightById,
};
