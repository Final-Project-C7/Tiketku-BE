const httpStatus = require("http-status");

const { bookings } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createBookings = catchAsync(async (req, res) => {
  const { user_id, flight_id, seat_id, order_date, amount } = req.body;

  // register user baru
  const newBookings = await users.create({
    user_id,
    flight_id,
    seat_id,
    order_date,
    amount,
  });

  res.status(201).json({
    status: "success",
    data: {
      newBookings,
    },
  });
});

module.exports = {
  createBookings,
};
