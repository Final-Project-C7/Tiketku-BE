const router = require('express').Router()

const airlineController = require('../controller/airlineController');
const flightController = require('../controller/flightController')

// API airline
router.post('/api/airline', airlineController.createAirlines)

// API flight
router.post('/api/flight', flightController.createFlights)
router.get('/api/getFlightById/:id', flightController.getFlightById)

module.exports = router