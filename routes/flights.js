const router = require("express").Router();

// controller
const flightController = require("../controller/flightController");

// middleware

// API
router.post("/", flightController.createFlights);
router.get("/:id", flightController.getFlightById);

module.exports = router;
