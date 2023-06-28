const midtransClient = require("midtrans-client");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { StatusCodes } = require("http-status-codes");

// Konfigurasi kredensial Midtrans

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: "SB-Mid-server-DfPpRmhsVXM_ZvQ2IzcHYsz1",
});

const createPayment = catchAsync(async (req, res) => {
  let parameter = {
    transaction_details: {
      order_id: "YOUR-ORDERID-123456",
      gross_amount: 200000,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "ferdy.yukiri@gmail.com",
      phone: "08111222333",
    },
  };

  const transaction = await snap.createTransaction(parameter);
  const transactionToken = transaction.token;
  console.log("transactionToken:", transactionToken);

  // Return the transaction token or use it as needed
  res.status(StatusCodes.OK).json({ transactionToken });
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
};
