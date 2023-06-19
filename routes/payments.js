const router = require("express").Router();

// controller
const paymentsController = require("../controller/paymentsController");

// middleware
const Auth = require("../middlewares/authenticate");

// API
router.post("/", Auth, paymentsController.createPayments);
router.put("/:id", Auth, paymentsController.updatePayment);
router.get("/", Auth, paymentsController.findAllPayments);
router.get("/:id", Auth, paymentsController.findPaymentsById);
router.delete("/:id", Auth, paymentsController.deletePayments);

module.exports = router;
