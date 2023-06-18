const { seats } = require("../models");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

//CREATE
const createSeats = catchAsync(async (req, res) => {
  const { seat_number, flight_id, booking_id } = req.body;

  const newSeats = await seats.create({
    seat_number,
    flight_id,
    booking_id,
  });

  res.status(201).json({
    status: "success",
    data: {
      seats: newSeats,
    },
  });
});

// UPDATE
const updateSeat = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { seat_number, flight_id, booking_id } = req.body;

  const seat = await seats.findByPk(id);

  if (!seat) {
    throw new ApiError(404, `Seat with this id ${id} is not found`);
  }

  // Update the seat's properties
  seat.seat_number = seat_number;
  seat.flight_id = flight_id;
  seat.booking_id = booking_id;

  await seat.save();

  res.status(200).json({
    status: "success",
    data: {
      seat,
    },
  });
});

//GET ALL
const findAllSeats = catchAsync(async (req, res) => {
  const seatsData = await seats.findAll();
  res.status(200).json({
    status: "success",
    data: {
      seats: seatsData,
    },
  });
});

// GET BY ID
const findSeatById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const seat = await seats.findByPk(id);

  if (!seat) {
    throw new ApiError(404, `Seat with this id ${id} is not found`);
  }

  res.status(200).json({
    status: "success",
    data: {
      seat,
    },
  });
});

// DELETE
const deleteSeat = catchAsync(async (req, res) => {
  const id = req.params.id;

  const seat = await seats.findByPk(id);

  if (!seat) {
    throw new ApiError(404, `Seat with this id ${id} is not found`);
  }

  await seats.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({
    status: "success",
    message: `Seats dengan id ${id} terhapus`,
  });
});

module.exports = {
  createSeats,
  updateSeat,
  findAllSeats,
  findSeatById,
  deleteSeat,
};
