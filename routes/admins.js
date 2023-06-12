const router = require("express").Router();

// controller
const adminController = require("../controller/adminController");

// middleware

// API
router.post("/register", adminController.register);
router.post("/login", adminController.login);

module.exports = router;
