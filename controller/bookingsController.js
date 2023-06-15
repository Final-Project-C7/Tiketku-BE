const httpStatus = require("http-status");

const { bookings, passengers } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createBookings = catchAsync(async (req, res) => {
  const { flight_id, seat_id, order_date, amount } = req.body;

  // register user baru
  const newBookings = await bookings.create({
    user_id: req.user.id,
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

const getBookingsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await bookings.findByPk(id, {
      include: {
        model: passengers,
        attributes: [
          "id",
          "name",
          "born_date",
          "citizen",
          "identity_number",
          "publisher_country",
          "valid_until",
          "booking_id",
        ],
      },
    });

    if (!data) {
      throw new ApiError(httpStatus.NOT_FOUND, "Passenger not found");
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  createBookings,
  getBookingsById,
};
