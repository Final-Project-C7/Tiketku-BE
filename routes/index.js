const router = require("express").Router();

const airlineController = require("../controller/airlineController");
const flightController = require("../controller/flightController");
const usersController = require("../controller/usersController");
const bookingsController = require("../controller/bookingsController");
const adminController = require("../controller/adminController");
const airportsController = require("../controller/airportsController");
const passengersController = require("../controller/passengersController");
const seatsController = require("../controller/seatsController");
const paymentsController = require("../controller/paymentsController");

const Uploader = require("../middlewares/uploaders");

// API airline
router.post("/api/airline", airlineController.createAirlines);

// airport
router.post(
  "/api/airports",
  Uploader.single("image"),
  airportsController.createAirpots
);

// API flight
router.post("/api/flight", flightController.createFlights);
router.get("/api/getFlightById/:id", flightController.getFlightById);

// register account
router.post("/api/register", usersController.register);
router.post("/api/login", usersController.login);

// create bookings
router.post("/api/bookings", bookingsController.createBookings);

// admin
router.post("/api/admin/register", adminController.register);
router.post("/api/admin/login", adminController.login);

// passenger
router.post("/api/passengers", passengersController.createPassengers);

// seats
router.post("/api/payments", paymentsController.createPayments);

// payments

module.exports = router;
