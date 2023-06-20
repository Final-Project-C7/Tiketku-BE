const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { users, bookings, passengers, payments, seats } = require("../models");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const generateOTP = require("../services/otpGenerator");
const sendOTPByEmail = require("../services/sendEmail");

const register = catchAsync(async (req, res) => {
  const { name, password, email, phoneNumber } = req.body;

  // validasi jika email sudah kepake
  const user = await users.findOne({ where: { email: email } });
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "email already exist!");
  }

  // validasi minimum password length
  const passswordLength = password.length <= 8;
  if (passswordLength) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "minimum password length must be 8 charater or more"
    );
  }

  // enkripsi password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // generate OTP
  const otp = generateOTP();

  // Kirim OTP melalui email
  await sendOTPByEmail(email, otp);

  // register user baru
  const newUser = await users.create({
    name,
    password: hashedPassword,
    email,
    phoneNumber,
  });

  res.status(201).json({
    status: "success",
    data: {
      newUser,
      otp,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  // cari user berdasarkan email
  const user = await users.findOne({
    where: {
      email,
    },
  });

  // gagal melanjutkan karena username nya tidak ada
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  // check password user, jika success login dapat response intinya TOKEN
  if (user && bcrypt.compareSync(password, user.password)) {
    // generate token utk user yg success login
    const token = jwt.sign(
      {
        id: user.id,
        username: user.name,
        email: user.email,
      },
      "rahasia"
    );

    res.status(200).json({
      status: "Success",
      data: {
        username: user.name,
        email: user.email,
        token,
      },
    });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Password");
  }
});

const getAllUsers = catchAsync(async (req, res) => {
  // Dapatkan semua pengguna dari database
  const allUsers = await users.findAll();

  res.status(200).json({
    status: "success",
    data: {
      users: allUsers,
    },
  });
});

const getUserById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await users.findByPk(id);

  // Jika pengguna tidak ditemukan
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { name, email, phoneNumber, password } = req.body; // Dapatkan data yang akan diperbarui dari body request

  // Cari pengguna berdasarkan ID
  const user = await users.findByPk(id);

  // Jika pengguna tidak ditemukan
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  // Perbarui data pengguna
  user.name = name;
  user.email = email;
  user.phoneNumber = phoneNumber;

  // Jika password ada dalam body request, hash password baru dan perbarui
  if (password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;
  }

  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const user = await users.findByPk(id);

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Airport with this id ${id} is not found`
    );
  }

  await users.destroy({
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
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
};
