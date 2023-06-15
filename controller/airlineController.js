const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");

const { airlines } = require("../models");

// create airline
const createAirlines = catchAsync(async (req, res) => {
  const { airline_name } = req.body;
  const newAirline = await airlines.create({
    airline_name,
  });
  res.status(201).json({
    status: "success",
    data: {
      airline: newAirline,
    },
  });
});

// get all data airline
const findAllAirlines = catchAsync(async (req, res) => {
  const airlinesData = await airlines.findAll();
  res.status(200).json({
    status: "Success",
    data: {
      airlinesData,
    },
  });
});

// search airline
const searchAirline = catchAsync(async (req, res) => {
  let airlineId = req.user.airlineId !== null ? req.user.airlineId : 0;

  const { name } = req.query;

  const airlinesData = await airlines.findAll({
    where: {
      [Op.or]: [
        {
          airlineId,
        },
        {
          airline_name: {
            [Op.substring]: name,
          },
        },
      ],
    },
  });

  console.log(airlinesData);

  res.status(200).json({
    status: "Success",
    data: {
      airlinesData,
    },
  });
});

// get by id
const findAirlineById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const airline = await airlines.findByPk(id);

  if (!airline) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airline with this id ${id} is not found`
    );
  }

  res.status(200).json({
    status: "Success",
    data: {
      airline,
    },
  });
});

// delete airline
const deleteAirline = catchAsync(async (req, res) => {
  const id = req.params.id;
  const Airline = await airlines.findByPk(id);

  if (!Airline) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airline with this id ${id} is not found`
    );
  }

  await airlines.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Airline dengan id ${id} terhapus`,
  });
});

// update airline
const updateAirline = catchAsync(async (req, res) => {
  const { airline_name } = req.body;
  const id = req.params.id;

  const Airline = await airlines.findByPk(id);

  if (!Airline) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airline with this id ${id} is not found`
    );
  }

  await airlines.update(
    {
      airline_name,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    status: "Success",
    data: {
      airline_name,
    },
  });
});

module.exports = {
  createAirlines,
  findAllAirlines,
  findAirlineById,
  deleteAirline,
  updateAirline,
  searchAirline,
};
