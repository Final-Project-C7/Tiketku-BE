const router = require("express").Router();

// controller
const bookingsController = require("../controller/bookingsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, bookingsController.createBookings);
// router.get("/:id", Auth, bookingsController.getBookingsById);

module.exports = router;
