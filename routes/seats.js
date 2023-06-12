const router = require("express").Router();

// controller
const seatsController = require("../controller/seatsController");

// middleware

// API
router.post("/", seatsController.createSeats);

module.exports = router;
