const router = require("express").Router();

// controller
const passengersController = require("../controller/passengersController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, passengersController.createPassengers);

module.exports = router;
