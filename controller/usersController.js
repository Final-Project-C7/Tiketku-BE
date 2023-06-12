const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { users } = require('../models')
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
    const { name, password, email, phoneNumber } = req.body

    // validasi jika email sudah kepake
    const user = await users.findOne({ where: { email: email } })
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "email already exist!")
    }

    // validasi minimum password length
    const passswordLength = password.length <= 8
    if (passswordLength) {
        throw new ApiError(httpStatus.BAD_REQUEST, "minimum password length must be 8 charater or more")
    }

    // enkripsi password
    const hashedPassword = bcrypt.hashSync(password, 10)

    // register user baru
    const newUser = await users.create({
        name,
        password: hashedPassword,
        email,
        phoneNumber
    })


    res.status(201).json({
        status: 'success',
        data: {
            newUser
        }
    })
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    // cari user berdasarkan email
    const user = await users.findOne({
        where: {
            email
        }
    })

    // gagal melanjutkan karena username nya tidak ada 
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist")
    }

    // check password user, jika success login dapat response intinya TOKEN
    if (user && bcrypt.compareSync(password, user.password)) {

        // generate token utk user yg success login
        const token = jwt.sign({
            id: user.id,
            username: user.name,
            email: user.email
        }, 'rahasia')

        res.status(200).json({
            status: 'Success',
            data: {
                username: user.name,
                email: user.email,
                token
            }
        })
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Password");
    }
})

module.exports = {
    register,
    login
}