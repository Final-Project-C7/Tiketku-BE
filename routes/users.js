const router = require("express").Router();

// controller
const User = require("../controller/usersController");

// middleware
const Authentication = require("../middlewares/authenticate");

// API
router.post("/register", User.register);
router.post("/login", User.login);
router.post("/verify", User.verifyOTP);
router.put("/update", User.updateUser);
router.delete("/:id", User.deleteUser);
router.get("/", User.getAllUsers);
router.get("/:id", User.getUserById);

module.exports = router;
