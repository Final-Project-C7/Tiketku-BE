const router = require("express").Router();

// controller
const seatsController = require("../controller/seatsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, seatsController.createSeats);

module.exports = router;
