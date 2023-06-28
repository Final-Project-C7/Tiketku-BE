const { flights, airlines, airports, admins } = require("../models");

const catchAsync = require("../utils/catchAsync");

async function createFlights(req, res) {
  try {
    const {
      airline_id,
      admin_id,
      flight_code,
      departure,
      arrival,
      seat_id,
      economyClass_price,
      premiumEconomy_price,
      business_price,
      firstClass_price,
      departure_time,
      arrival_time,
    } = req.body;
    const newFlights = await flights.create({
      airline_id,
      admin_id,
      flight_code,
      departure,
      arrival,
      seat_id,
      economyClass_price,
      premiumEconomy_price,
      business_price,
      firstClass_price,
      departure_time,
      arrival_time,
    });
    res.status(201).json({
      status: "success",
      data: {
        Flight: newFlights,
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
          attributes: ["airline_name", "baggage", "cabin_baggage"],
        },
        {
          model: airports,
          as: "departureAirport",
          attributes: ["airport_name", "city", "country", "imgURL"],
        },
        {
          model: airports,
          as: "arrivalAirport",
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

async function getFlight(req, res) {
  try {
    let data;

    if (req.query.departure && req.query.arrival) {
      const { departure, arrival } = req.query;

      data = await flights.findAll({
        include: [
          {
            model: airlines,
            attributes: ["airline_name", "baggage", "cabin_baggage"],
          },
          {
            model: airports,
            as: "departureAirport",
            attributes: ["airport_name", "city", "country", "imgURL"],
            where: { city: departure },
          },
          {
            model: airports,
            as: "arrivalAirport",
            attributes: ["airport_name", "city", "country", "imgURL"],
            where: { city: arrival },
          },
        ],
      });
    } else {
      data = await flights.findAll({
        include: [
          {
            model: airlines,
            attributes: ["airline_name", "baggage", "cabin_baggage"],
          },
          {
            model: airports,
            as: "departureAirport",
            attributes: ["airport_name", "city", "country", "imgURL"],
          },
          {
            model: airports,
            as: "arrivalAirport",
            attributes: ["airport_name", "city", "country", "imgURL"],
          },
        ],
      });
    }

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

const updateFlight = catchAsync(async (req, res) => {
  const {
    airline_id,
    admin_id,
    flight_code,
    departure,
    arrival,
    seat_id,
    economyClass_price,
    premiumEconomy_price,
    business_price,
    firstClass_price,
    departure_time,
    arrival_time,
  } = req.body;
  const id = req.params.id;
  const file = req.file;

  const Flight = await flights.findByPk(id);

  if (!Flight) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Flight with id ${id} is not found`
    );
  }

  // Jika ada file gambar yang diunggah, lakukan pembaruan gambar
  if (file) {
    // Validasi format file gambar
    const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (!validFormats.includes(file.mimetype)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
    }

    // Dapatkan ekstensi file
    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    // Upload gambar ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    });

    // Update produk dengan gambar baru
    await flights.update(
      {
        airline_id,
        admin_id,
        flight_code,
        departure,
        arrival,
        seat_id,
        economyClass_price,
        premiumEconomy_price,
        business_price,
        firstClass_price,
        departure_time,
        arrival_time,
      },
      {
        where: {
          id,
        },
      }
    );
  } else {
    // Jika tidak ada file gambar yang diunggah, lakukan pembaruan tanpa gambar
    await flights.update(
      {
        airline_id,
        admin_id,
        flight_code,
        departure,
        arrival,
        seat_id,
        economyClass_price,
        premiumEconomy_price,
        business_price,
        firstClass_price,
        departure_time,
        arrival_time,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  res.status(200).json({
    status: "Success",
    data: {
      airline_id,
      admin_id,
      flight_code,
      departure,
      arrival,
      seat_id,
      economyClass_price,
      premiumEconomy_price,
      business_price,
      firstClass_price,
      departure_time,
      arrival_time,
    },
  });
});

const deleteFlight = catchAsync(async (req, res) => {
  const id = req.params.id;

  const Flight = flights.findByPk(id);

  if (!Flight) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `flights with id ${id} is not found`
    );
  }

  await flights.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `flights with id ${id} was successfully deleted`,
  });
});

async function getFlightByAirport(req, res) {
  try {
    const { depart, arrive } = req.params;

    const flight = await flights.findAll({
      include: [
        {
          model: airports,
          as: "departureAirport",
          where: { city: depart },
        },
        {
          model: airports,
          as: "arrivalAirport",
          where: { city: arrive },
        },
      ],
    });

    res.status(200).json({
      status: "success",
      flight,
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
  getFlight,
  updateFlight,
  deleteFlight,
  getFlightByAirport,
};
