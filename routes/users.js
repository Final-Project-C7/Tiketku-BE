const router = require("express").Router();

// controller
const usersController = require("../controller/usersController");

// middleware
const Authentication = require("../middlewares/authenticate");

// API
router.post("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;
