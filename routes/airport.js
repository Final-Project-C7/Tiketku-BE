const router = require("express").Router();

// controller
const airportsController = require("../controller/airportsController");

// middleware
const Uploader = require("../middlewares/uploaders");

// API
router.post("/", Uploader.single("image"), airportsController.createAirpots);

module.exports = router;
