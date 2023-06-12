const { payments } = require("../models");
const catchAsync = require("../utils/catchAsync");

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

module.exports = {
  createPayments,
};
