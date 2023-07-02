const router = require("express").Router();

// controller
const paymentsController = require("../controller/paymentsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", paymentsController.createPayment);
router.post("/notif", paymentsController.handlePaymentNotification);
router.get("/", Auth, paymentsController.getTransactionStatus);

module.exports = router;
