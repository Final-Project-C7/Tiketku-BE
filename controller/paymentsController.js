const midtransClient = require("midtrans-client");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

// Konfigurasi kredensial Midtrans
const midtransConfig = {
  serverKey: "SB-Mid-server-DfPpRmhsVXM_ZvQ2IzcHYsz1", // Ganti dengan Server Key Midtrans Anda
  clientKey: "SB-Mid-client-ugxqLh-00hfHCHIz", // Ganti dengan Client Key Midtrans Anda
  isProduction: false, // Ganti menjadi true jika ingin menggunakan mode produksi
};

// Membuat instance dari MidtransClient
const midtrans = new midtransClient.CoreApi(midtransConfig);

// CREATE
const createPayment = catchAsync(async (req, res) => {
  const { booking_id, payment_amount, payment_method } = req.body;

  // Menyiapkan data pembayaran untuk dikirim ke Midtrans
  const transactionDetails = {
    orderId: booking_id,
    grossAmount: payment_amount,
  };

  // Menyiapkan item pembayaran (opsional, jika ada)
  const items = [];

  // Membuat objek transaksi untuk dikirim ke Midtrans
  const transaction = {
    transactionDetails,
    itemDetails: items,
    payment_type: payment_method,
  };

  try {
    // Membuat transaksi pembayaran menggunakan Midtrans
    const response = await midtrans.charge(transaction);

    res.status(200).json({
      status: "success",
      data: {
        transactionId: response.transaction_id,
        redirectUrl: response.redirect_url,
      },
    });
  } catch (error) {
    throw new ApiError(500, "Gagal membuat pembayaran menggunakan Midtrans");
  }
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
    throw new ApiError(500, "Gagal mendapatkan status transaksi dari Midtrans");
  }
});

module.exports = {
  createPayment,
  getTransactionStatus,
};
