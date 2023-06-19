const httpStatus = require("http-status");

const { bookings, passengers, payments, seats } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createBookings = catchAsync(async (req, res) => {
  const { flight_id, order_date, amount } = req.body;

  // register user baru
  const newBookings = await bookings.create({
    user_id: req.user.id,
    flight_id,
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
      include: [
        {
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
        {
          model: payments, // Include tabel "payments"
          attributes: [
            "id",
            "payment_method",
            "payment_amount",
            "payment_date",
          ],
        },
      ],
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

const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { flight_id, order_date, amount } = req.body;

  const booking = await bookings.findByPk(id);

  if (!booking) {
    throw new ApiError(404, `Booking with id ${id} is not found`);
  }

  // Update the seat's properties
  flight_id = flight_id;
  order_date = order_date;
  amount = amount;
  await booking.save();

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

module.exports = {
  createBookings,
  getBookingsById,
  updateBooking
};
