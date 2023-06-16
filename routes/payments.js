const router = require("express").Router();

// controller
const paymentsController = require("../controller/paymentsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, paymentsController.createPayments);

module.exports = router;
