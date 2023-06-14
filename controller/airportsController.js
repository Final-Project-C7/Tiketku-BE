const httpStatus = require("http-status");
const { airports } = require("../models");
const imagekit = require("../lib/imageKits");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

// const createAirport = catchAsync(async (req, res) => {
//   const { airport_name, city, country } = req.body;
//   const file = req.file;

//   // validasi utk format file image
//   const validFormat =
//     file.mimetype == "image/png" ||
//     file.mimetype == "image/jpg" ||
//     file.mimetype == "image/jpeg" ||
//     file.mimetype == "image/gif";
//   if (!validFormat) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
//   }

//   // untuk dapat extension file nya
//   const split = file.originalname.split(".");
//   const ext = split[split.length - 1];

//   // upload file ke imagekit
//   const img = await imagekit.upload({
//     file: file.buffer, //required
//     fileName: `IMG-${Date.now()}.${ext}`, //required
//   });

//   const newAirports = await airports.create({
//     airport_name,
//     city,
//     country,
//     imgURL: img.url,
//   });

//   res.status(201).json({
//     status: "success",
//     data: {
//       newAirports,
//     },
//   });
// });

//CREATE
const createAirport = catchAsync(async (req, res) => {
  const { airport_name, city, country } = req.body;
  const file = req.file;

  // validasi utk format file image
  const validFormat =
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif";
  if (!validFormat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
  }

  // untuk dapat extension file nya
  const split = file.originalname.split(".");
  const ext = split[split.length - 1];

  // upload file ke imagekit
  const img = await imagekit.upload({
    file: file.buffer, //required
    fileName: `IMG-${Date.now()}.${ext}`, //required
  });

  const newAirports = await airports.create({
    airport_name,
    city,
    country,
    imgURL: img.url,
  });

  res.status(201).json({
    status: "success",
    data: {
      airports: newAirports,
    },
  });
});

//UPDATE
const updateAirport = catchAsync(async (req, res) => {
  const { airport_name, city, country } = req.body;
  const id = req.params.id;
  const file = req.file;

  const airport = await airports.findByPk(id);

  if (!airport) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airport with this id ${id} is not found`
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
    await airports.update(
      {
        airport_name,
        city,
        country,
        imgURL: img.url,
      },
      {
        where: {
          id,
        },
      }
    );
  } else {
    // Jika tidak ada file gambar yang diunggah, lakukan pembaruan tanpa gambar
    await airports.update(
      {
        airport_name,
        city,
        country,
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
      airport_name,
      city,
      country,
    },
  });
});

//GET ALL
const findAllAirport = catchAsync(async (req, res) => {
  const airport = await airports.findAll();
  res.status(200).json({
    status: "Success",
    data: {
      airport,
    },
  });
});

//GET BY ID
const findAirportById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const airport = await airports.findByPk(id);

  if (!airport) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `airport with this id ${id} is not found`
    );
  }

  res.status(200).json({
    status: "Success",
    data: {
      airport,
    },
  });
});

//DELETE
const deleteAirport = catchAsync(async (req, res) => {
  const id = req.params.id;

  const airport = await airports.findByPk(id);

  if (!airport) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airport with this id ${id} is not found`
    );
  }

  await airports.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Airport dengan id ${id} terhapus`,
  });
});

module.exports = {
  createAirport,
  deleteAirport,
  findAllAirport,
  findAirportById,
  updateAirport,
};
