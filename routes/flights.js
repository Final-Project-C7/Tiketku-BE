const router = require("express").Router();

// controller
const flightController = require("../controller/flightController");

// middleware

// API
router.post("/", flightController.createFlights);
router.get("/:id", flightController.getFlightById);
router.get("/", flightController.getFlight);
router.put("/:id", flightController.updateFlight);
router.delete("/:id", flightController.deleteFlight);
router.get("/search/:depart/:arrive", flightController.getFlightByAirport);
router.get("/", flightController.getFlightByQuery);

module.exports = router;
