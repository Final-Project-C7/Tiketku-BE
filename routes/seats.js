const router = require("express").Router();

// controller
const seatsController = require("../controller/seatsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, seatsController.createSeats);
router.get("/", Auth, seatsController.findAllSeats);
router.get("/:id", Auth, seatsController.findSeatById);
router.put("/:id", Auth, seatsController.updateSeat);
router.delete("/:id", Auth, seatsController.deleteSeat);

module.exports = router;
