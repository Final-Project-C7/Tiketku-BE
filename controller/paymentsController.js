const midtransClient = require("midtrans-client");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { StatusCodes } = require("http-status-codes");
const { bookings, passengers, payments, users } = require("../models");

// Konfigurasi kredensial Midtrans

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-DfPpRmhsVXM_ZvQ2IzcHYsz1",
});

const createPayment = catchAsync(async (req, res) => {
  const {
    order_id,
    gross_amount,
    first_name,
    last_name,
    email,
    phone,
    payment_type,
  } = req.body;

  let parameter = {
    payment_type: payment_type,
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  const transactionToken = transaction.token;
  console.log("transactionToken:", transactionToken);

  // Return the transaction token or use it as needed
  const payment = await payments.create({
    booking_id: order_id,
    payment_amount: gross_amount,
    payment_method: null,
  });

  res
    .status(StatusCodes.OK)
    .json(`https://app.sandbox.midtrans.com/snap/v2/vtweb/${transactionToken}`);
});

const handlePaymentNotification = catchAsync(async (req, res) => {
  // Terima payload notifikasi dari Midtrans
  const notification = req.body;
  console.log(notification);

  // Lakukan verifikasi keaslian notifikasi
  // Pastikan Anda mengikuti panduan resmi Midtrans untuk melakukan verifikasi ini

  // Dapatkan payment_method dari payload notifikasi
  const paymentMethod = notification.payment_type;

  // Lakukan tindakan sesuai kebutuhan bisnis Anda
  // Misalnya, simpan payment_method ke dalam database
  await payments.create(
    { payment_method: paymentMethod },
    { where: { order_id: notification.order_id } }
  );

  // Berikan respons OK kepada Midtrans
  res.status(200).send("OK");
});

// GET TRANSACTION STATUS
const getTransactionStatus = catchAsync(async (req, res) => {
  const { transactionId } = req.params;

  try {
    // Mendapatkan status transaksi dari Midtrans
    const response = await midtrans.transaction.status(transactionId);

    res.status(200).json({
      status: "success",
      data: {
        transactionStatus: response.transaction_status,
      },
    });
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Gagal mendapatkan status transaksi dari Midtrans"
    );
  }
});

module.exports = {
  createPayment,
  getTransactionStatus,
  handlePaymentNotification,
};
