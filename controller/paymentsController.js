const { payments } = require("../models");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

//CREATE
const createPayments = catchAsync(async (req, res) => {
  const { booking_id, payment_method, payment_amount, payment_date } = req.body;

  const newPayments = await payments.create({
    booking_id,
    payment_method,
    payment_amount,
    payment_date,
  });

  res.status(201).json({
    status: "success",
    data: {
      payments: newPayments,
    },
  });
});

// UPDATE
const updatePayment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { booking_id, payment_method, payment_amount, payment_date } = req.body;

  const payment = await payments.findByPk(id);

  if (!payment) {
    throw new ApiError(404, `Pembayaran dengan id ${id} tidak ditemukan`);
  }

  payment.booking_id = booking_id;
  payment.payment_method = payment_method;
  payment.payment_amount = payment_amount;
  payment.payment_date = payment_date;

  await payment.save();

  res.status(200).json({
    status: "success",
    data: {
      payment,
    },
  });
});

//GET ALL
const findAllPayments = catchAsync(async (req, res) => {
  const paymentsData = await payments.findAll();
  res.status(200).json({
    status: "success",
    data: {
      payments: paymentsData,
    },
  });
});

//GET BY ID
const findPaymentsById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payment = await payments.findByPk(id);

  if (!payment) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Pembayaran dengan id ${id} tidak ditemukan`
    );
  }

  res.status(200).json({
    status: "Success",
    data: {
      payment,
    },
  });
});

//DELETE
const deletePayments = catchAsync(async (req, res) => {
  const id = req.params.id;

  const payment = await payments.findByPk(id);

  if (!payment) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Pembayaran dengan id ${id} tidak ditemukan`
    );
  }

  await payments.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Pembayaran dengan id ${id} telah dihapus`,
  });
});

module.exports = {
  createPayments,
  updatePayment,
  findAllPayments,
  findPaymentsById,
  deletePayments,
};
