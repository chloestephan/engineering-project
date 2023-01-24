const express = require("express");
const router = express.Router();
const forgotPasswordCustomer = require("../../controllers/customer/forgotPasswordCustomerController");

router.post("/", forgotPasswordCustomer.handleForgotPasswordCustomer);

module.exports = router;
