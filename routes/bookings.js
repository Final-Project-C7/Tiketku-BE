const router = require("express").Router();

// controller
const bookingsController = require("../controller/bookingsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, bookingsController.createBookings);
router.get("/:id", Auth, bookingsController.getBookingsById);
router.get("/booking-token", Auth, bookingsController.getBookingsByToken);
router.get("/", bookingsController.findAllBooking);
router.put("/:id", Auth, bookingsController.updateBooking);
router.delete("/:id", Auth, bookingsController.deleteBooking);

module.exports = router;
