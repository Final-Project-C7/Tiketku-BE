const httpStatus = require('http-status')
const { airports } = require('../models')
const imagekit = require('../lib/imageKits')
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')

createAirpots = catchAsync( async (req, res) => {
    
        const { airport_name, city, country } = req.body
        const file = req.file

         // validasi utk format file image
        const validFormat = file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif';
        if (!validFormat) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong Image Format')
        }

        // untuk dapat extension file nya
        const split = file.originalname.split('.')
        const ext = split[split.length - 1]

        // upload file ke imagekit
        const img = await imagekit.upload({
            file: file.buffer, //required
            fileName: `IMG-${Date.now()}.${ext}`, //required
        })

        const newAirports = await airports.create({
            airport_name,
            city,
            country,
            imgURL : img.url
        })

        res.status(201).json({
            status: 'success',
            data: {
                airports: newAirports
            }
        })
    
})

module.exports = {
    createAirpots
}