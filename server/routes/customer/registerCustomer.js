const express = require("express");
const router = express.Router();
const registerCustomerController = require("../../controllers/customer/registerCustomerController");

router.post("/", registerCustomerController.handleRegisterCustomer);

module.exports = router;
