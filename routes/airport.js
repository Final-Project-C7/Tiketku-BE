const router = require("express").Router();

// controller
const Airport = require("../controller/airportsController");

// middleware
const Uploader = require("../middlewares/uploaders");

// API
router.get("/", Airport.findAllAirport);
router.get("/:id", Airport.findAirportById);
router.post("/", Uploader.single("image"), Airport.createAirport);
router.put("/:id", Uploader.single("image"), Airport.updateAirport);
router.delete("/:id", Airport.deleteAirport);

module.exports = router;
