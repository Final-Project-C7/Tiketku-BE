const { passengers } = require("../models");
const catchAsync = require("../utils/catchAsync");

const createPassengers = catchAsync(async (req, res) => {
  const {
    name,
    born_date,
    citizen,
    identity_number,
    publisher_country,
    valid_until,
    booking_id,
  } = req.body;

  const newPassenger = await passengers.create({
    name,
    born_date,
    citizen,
    identity_number,
    publisher_country,
    valid_until,
    booking_id,
  });

  res.status(201).json({
    status: "success",
    data: {
      passengers: newPassenger,
    },
  });
});

module.exports = {
  createPassengers,
};
