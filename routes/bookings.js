const router = require("express").Router();

// controller
const bookingsController = require("../controller/bookingsController");

// middleware

// API
router.post("/", bookingsController.createBookings);

module.exports = router;
