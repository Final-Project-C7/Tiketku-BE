const router = require("express").Router();

// controller
const passengersController = require("../controller/passengersController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, passengersController.createPassengers);
router.get("/", Auth, passengersController.findAllPassenger);
router.get("/:id", Auth, passengersController.findPassengerById);
router.put("/:id", Auth, passengersController.updatePassenger);
router.delete("/:id", Auth, passengersController.deletePassenger);

module.exports = router;
