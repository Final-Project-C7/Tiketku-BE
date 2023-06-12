const router = require("express").Router();

// controller
const passengersController = require("../controller/passengersController");

// middleware

// API
router.post("/", passengersController.createPassengers);

module.exports = router;
