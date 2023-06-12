const router = require("express").Router();

// import package swagger
const swaggerUi = require("swagger-ui-express");
// import file json
const swaggerDocument = require("../docs/swagger.json");

// api docs
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

const Flights = require("./flights");
const Airlines = require("./airlines");
const Airports = require("./airport");
const Users = require("./users");
const Bookings = require("./bookings");
const Admins = require("./admins");
const Passengers = require("./passengers");
const Seats = require("./seats");
const Payments = require("./payments");

// API
router.use("/api/v1/airline", Airlines);
router.use("/api/v1/airports", Airports);
router.use("/api/v1/flight", Flights);
router.use("/api/v1/user", Users);
router.use("/api/v1/bookings", Bookings);
router.use("/api/v1/admin", Admins);
router.use("/api/v1/passengers", Passengers);
router.use("/api/v1/seats", Seats);
router.use("/api/v1/payments", Payments);

module.exports = router;
