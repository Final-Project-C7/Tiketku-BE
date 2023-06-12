const router = require("express").Router();

// controller
const paymentsController = require("../controller/paymentsController");

// middleware

// API
router.post("/", paymentsController.createPayments);

module.exports = router;
