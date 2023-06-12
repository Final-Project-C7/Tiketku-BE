const { airlines } = require('../models')

async function createAirlines(req, res) {
    try {
        const { airline_name } = req.body
        const newAirline = await airlines.create({
            airline_name
        })
        res.status(201).json({
            status: 'success',
            data: {
                airline: newAirline
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

module.exports = {
    createAirlines
}