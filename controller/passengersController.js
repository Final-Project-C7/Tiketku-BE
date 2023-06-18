const { passengers } = require("../models");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

//CREATE
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

// UPDATE
const updatePassenger = catchAsync(async (req, res) => {
  const id = req.params.id;
  const {
    name,
    born_date,
    citizen,
    identity_number,
    publisher_country,
    valid_until,
    booking_id,
  } = req.body;

  const passenger = await passengers.findByPk(id);

  if (!passenger) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Passenger with this id ${id} is not found`
    );
  }

  // Update the passenger's properties
  passenger.name = name;
  passenger.born_date = born_date;
  passenger.citizen = citizen;
  passenger.identity_number = identity_number;
  passenger.publisher_country = publisher_country;
  passenger.valid_until = valid_until;
  passenger.booking_id = booking_id;

  await passenger.save();

  res.status(200).json({
    status: "success",
    data: {
      passenger,
    },
  });
});

//GET ALL
const findAllPassenger = catchAsync(async (req, res) => {
  const passengersData = await passengers.findAll();
  res.status(200).json({
    status: "success",
    data: {
      passengers: passengersData,
    },
  });
});

//GET BY ID
const findPassengerById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const passenger = await passengers.findByPk(id);

  if (!passenger) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `airport with this id ${id} is not found`
    );
  }

  res.status(200).json({
    status: "Success",
    data: {
      passenger,
    },
  });
});

const deletePassenger = catchAsync(async (req, res) => {
  const id = req.params.id;

  const passenger = await passengers.findByPk(id);

  if (!passenger) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airport with this id ${id} is not found`
    );
  }

  await passengers.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Passengers dengan id ${id} terhapus`,
  });
});

module.exports = {
  createPassengers,
  findAllPassenger,
  findPassengerById,
  updatePassenger,
  deletePassenger,
};
