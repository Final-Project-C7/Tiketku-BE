const { seats } = require("../models");
const catchAsync = require("../utils/catchAsync");

const createSeats = catchAsync(async (req, res) => {
  const { seat_number, availability } = req.body;

  const newSeats = await seats.create({
    seat_number,
    availability,
  });

  res.status(201).json({
    status: "success",
    data: {
      seats: newSeats,
    },
  });
});

module.exports = {
  createSeats,
};
