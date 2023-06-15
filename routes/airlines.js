const router = require("express").Router();

// controller
const airlineController = require("../controller/airlineController");

// middleware
const Authentication = require("../middlewares/authenticate");

// API auth
router.get("/", airlineController.findAllAirlines);
router.get("/:id", airlineController.findAirlineById);
router.get("/search", airlineController.searchAirline);
router.post("/", airlineController.createAirlines);
router.delete("/:id", airlineController.deleteAirline);
router.put("/:id", airlineController.updateAirline);

module.exports = router;
