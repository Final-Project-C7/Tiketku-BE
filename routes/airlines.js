const router = require("express").Router();

// controller
const airlineController = require("../controller/airlineController");

// middleware
const Authentication = require("../middlewares/authenticate");

// API auth
router.post("/", airlineController.createAirlines);

module.exports = router;
